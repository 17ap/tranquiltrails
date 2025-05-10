-- Adminer 5.2.1 PostgreSQL 17.5 dump


DROP TABLE IF EXISTS "booking";
CREATE TABLE "public"."booking" (
    "client_id" uuid NOT NULL,
    "event_id" uuid NOT NULL,
    "slots" integer NOT NULL
) WITH (oids = false);

TRUNCATE "booking";
INSERT INTO "booking" ("client_id", "event_id", "slots") VALUES
('1f4c0131-5e51-4d5c-825a-29f93b933d04',	'123e4567-e89b-12d3-a456-426614174000',	2);

DROP TABLE IF EXISTS "client";
CREATE TABLE "public"."client" (
    "id" uuid NOT NULL,
    "phone_number" text NOT NULL,
    "email" text NOT NULL,
    "full_name" text NOT NULL
) WITH (oids = false);

TRUNCATE "client";
INSERT INTO "client" ("id", "phone_number", "email", "full_name") VALUES
('1f4c0131-5e51-4d5c-825a-29f93b933d04',	'+79161234567',	'ivan@example.com',	'Иван Петров');

DROP TABLE IF EXISTS "event";
CREATE TABLE "public"."event" (
    "id" uuid NOT NULL,
    "name" text NOT NULL,
    "date_time" timestamp NOT NULL,
    "cost" integer NOT NULL,
    "free_slots_count" integer NOT NULL,
    "description" text NOT NULL,
    "image" bytea NOT NULL
) WITH (oids = false);

TRUNCATE "event";
INSERT INTO "event" ("id", "name", "date_time", "cost", "free_slots_count", "description", "image") VALUES
('123e4567-e89b-12d3-a456-426614174000',	'Мастер класс по лепке',	'2025-12-25 19:30:45.123456',	3000,	8,	'desc',	'� � � � '),
('cd1f3132-63ab-420c-a8e3-a3f7a0b73b37',	'Ретрит в Великий Новгород',	'2025-07-12 08:30:45.123456',	13000,	5,	'desc2',	'� � � � '),
('c0f5d342-5f98-42fe-953a-4e7c14b76f5a',	'Мастер-класс по свечеварению',	'2025-06-25 13:30:45.123456',	3000,	3,	'deesc3',	'� � � � ');

DROP TABLE IF EXISTS "product";
CREATE TABLE "public"."product" (
    "id" uuid NOT NULL,
    "name" text NOT NULL,
    "cost" integer NOT NULL,
    "image" bytea NOT NULL,
    "description" text NOT NULL,
    "amount_available" integer NOT NULL
) WITH (oids = false);

TRUNCATE "product";
INSERT INTO "product" ("id", "name", "cost", "image", "description", "amount_available") VALUES
('843baa55-614f-46c7-b98b-7538d9f14dfa',	'Пало-санто',	400,	'� � � � ',	'Деревяшка',	3),
('7efe0f11-596c-43e1-92c0-5d80e10f9607',	'Керамическая подставка',	1200,	'� � � � ',	'Глиняная подставка',	6);

DROP TABLE IF EXISTS "review";
CREATE TABLE "public"."review" (
    "full_name" text NOT NULL,
    "age" integer NOT NULL,
    "photo" bytea NOT NULL,
    "text" text NOT NULL
) WITH (oids = false);

TRUNCATE "review";
INSERT INTO "review" ("full_name", "age", "photo", "text") VALUES
('Мария',	31,	'� � � � ',	'Отличное место для творчества и общения, обязательно приду ещё!'),
('Светлана',	45,	'� � � � ',	'Девочки-умнички! Отдохнула душой на мастер-классе по живлписи!'),
('Ольга',	36,	'� � � � ',	'Я недавно переехала в Санкт-Петербург, и мне очень не хватало общения, но в клубе я нашла себе подругу!'),
('Анна',	23,	'� � � � ',	'Очень понравился мастер-класс по свечеварению!Прекрасная атмосфера и профессиональный подход.');

-- 2025-05-09 23:07:26 UTC
