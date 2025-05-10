const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For form data


app.get('/products', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM product WHERE amount_available > 0 ORDER BY name');
        
        const products = result.rows.map(product => ({
            id: product.id,
            name: product.name,
            cost: product.cost,
            image: product.image.toString('base64'), // Convert bytea to base64
            imageUrl: `data:image/jpeg;base64,${product.image.toString('base64')}`, // Ready-to-use URL
            description: product.description,
            amountAvailable: product.amount_available,
            inStock: product.amount_available > 0 // Computed field
        }));

        res.json({
            success: true,
            count: products.length,
            products: products
        });

    } catch (err) {
        console.error('Product fetch error:', err);
        res.status(500).json({ 
            success: false,
            error: 'Database error',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

app.get('/reviews', async (req, res) => {
    try {
        const result = await db.query('SELECT * from review');

        if (result.rows.length === 0) {
            return res.json([]);
        }

        // Note: You'll need to handle mimeType - either get it from DB or set a default
        const mimeType = 'image/jpeg'; // or get from row.mime_type if stored in DB

        const reviews = result.rows.map(row => ({
            id: row.id, // Changed from full_name to id (assuming this is your PK)
            name: row.full_name, // Fixed property name
            age: row.age,
            photo: row.photo.toString('base64'),
            photoUrl: `data:image/jpeg;base64,${row.photo.toString('base64')}`, // Ready-to-use URL
            text: row.text
        }));

        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/events', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM event WHERE date_time > NOW() ORDER BY date_time ASC');

        const events = result.rows.map(event => ({
            id: event.id,
            name: event.name,
            dateTime: event.date_time.toISOString(), // Convert to ISO string
            formattedDateTime: new Date(event.date_time).toLocaleString(), // Human-readable format
            cost: event.cost,
            description: event.description,
            image: event.image.toString('base64'),
            imageUrl: `data:image/jpeg;base64,${event.image.toString('base64')}`,
            freeSlots: event.free_slots_count,
            isFree: event.cost === 0 // Additional computed field
        }));

        res.json({
            success: true,
            count: events.length,
            data: events.length ? events : [] // Ensure array even if empty
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Database error',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

const { v4: uuidv4 } = require('uuid');
app.post('/booking', async (req, res) => {
    const client = await db.query('BEGIN');

    try {

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is empty' });
        }

        const { fullName, email, phoneNumber, eventId, slots } = req.body;

        // Validate all required fields exist
        if (!fullName || !email || !phoneNumber || !eventId || !slots) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['fullName', 'email', 'phoneNumber', 'eventId', 'slots']
            });
        }

        // 1. Check event exists and has slots
        const event = await db.query(
            'SELECT free_slots_count FROM event WHERE id = $1 FOR UPDATE',
            [eventId]
        );
        if (!event.rows.length) {
            await db.query('ROLLBACK');
            return res.status(404).json({ error: 'Event not found' });
        }

        // 2. Handle client (with new conflict resolution)
        let clientId;
        const existingClient = await db.query(
            'SELECT id FROM client WHERE email = $1',
            [email]
        );

        if (existingClient.rows.length) {
            clientId = existingClient.rows[0].id;
            await db.query(
                'UPDATE client SET phone_number = $1, full_name = $2 WHERE id = $3',
                [phoneNumber, fullName, clientId]
            );
        } else {
            clientId = uuidv4();
            await db.query(
                'INSERT INTO client (id, phone_number, email, full_name) VALUES ($1, $2, $3, $4)',
                [clientId, phoneNumber, email, fullName]
            );
        }

        // 3. Create booking and update slots
        await db.query(
            'INSERT INTO booking (client_id, event_id, slots) VALUES ($1, $2, $3)',
            [clientId, eventId, slots]
        );

        await db.query(
            'UPDATE event SET free_slots_count = free_slots_count - $1 WHERE id = $2',
            [slots, eventId]
        );

        await db.query('COMMIT');
        res.status(201).json({ success: true, clientId, eventId });

    } catch (err) {
        await db.query('ROLLBACK');
        console.error('Booking error:', err);
        res.status(500).json({ error: 'Booking failed', details: err.message });
    }
});

// Test endpoint
app.get('/hello', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW() as current_time');
        res.json({
            message: 'Hello world',
            databaseTime: result.rows[0].current_time
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});