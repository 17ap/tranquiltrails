// Component for Why Join Section
export default function WhyJoinSection() {
    const reasons = [
      "Создавай полезные знакомства и расширяй круг общения с женщинами разных профессий и интересов. Взаимная поддержка и обмен опытом — это ключ к успеху!",
      "Погружайся в мир творчества на наших мастер-классах и лекциях. Мы предлагаем новые горизонты для самовыражения и открытия своих талантов",
      "Стань частью вдохновляющего женского колыбели, где царит поддержка, доверие и открытость. Здесь ты найдешь подруг, которые помогут тебе расти и развиваться!"
    ];
  
    return (
      <section className="why-join">
        <div className="container">
          <h2 className="section-title">ПОЧЕМУ СТОИТ ПРИСОЕДИНИТЬСЯ К НАМ?</h2>
          
          <div className="reasons-grid">
            {reasons.map((reason, index) => (
              <div className="reason-card" key={index}>
                <img src="/images/Звезда.png" alt="" className="star-decoration" loading="lazy" />
                <div className="reason-content">
                  <p>{reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }