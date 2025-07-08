
const HowItWorksSection = () => {
  return (
    <section className="container mx-auto py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 marketing2-headline">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: 1,
              title: "Buy Tickets",
              description: "Purchase $1 unique raffle tickets using USDC. Each ticket has its own identifier and buying multiple tickets increases your chances."
            },
            {
              step: 2,
              title: "Wait for Draw",
              description: "Each raffle lasts until the Current Raffle is sold out. The smart contract randomly assigns tickets to three groups with different prize allocations."
            },
            {
              step: 3,
              title: "Collect Winnings",
              description: "If your ticket wins, your prize is automatically transferred to your wallet. Group one winners get double, group two get equal value, group three gets nothing."
            }
          ].map((item) => (
            <div key={item.step} className="marketing2-card p-6 rounded-xl">
              <div className="h-12 w-12 rounded-full marketing2-card flex items-center justify-center mb-4">
                <span className="marketing2-accent font-bold">{item.step}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 marketing2-headline">{item.title}</h3>
              <p className="marketing2-body leading-relaxed">
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
