
const HowItWorksSection = () => {
  return (
    <section className="container mx-auto py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gradient">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: 1,
              title: "Buy Tickets",
              description: "Purchase $1 raffle tickets using USDC or USDT. Buy multiple tickets to increase your chances."
            },
            {
              step: 2,
              title: "Wait for Draw",
              description: "Each raffle lasts for 24 hours. The smart contract randomly selects a winning ticket."
            },
            {
              step: 3,
              title: "Collect Winnings",
              description: "If your ticket wins, the prize pool is automatically transferred to your wallet."
            }
          ].map((item) => (
            <div key={item.step} className="glass-card p-6 rounded-xl">
              <div className="h-12 w-12 rounded-full bg-app-purple/10 flex items-center justify-center mb-4">
                <span className="text-app-purple font-bold">{item.step}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
