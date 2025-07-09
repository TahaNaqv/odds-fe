
import { HelpCircle, Coins, DollarSign, Calendar, Clock, Ticket, Wallet, ShieldCheck, RefreshCcw } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const faqItems = [
    {
      question: "How are winners selected?",
      answer: "Winners are selected through a transparent, verifiable random process on the blockchain. Each ticket is randomly assigned to one of three groups. Group one winners receive double their ticket value, group two winners receive the same as their ticket value, and group three receives nothing. 95% of the prize pool is distributed to winners this way.",
      icon: <HelpCircle size={20} className="marketing2-accent mr-2 flex-shrink-0" />
    },
    {
      question: "What cryptocurrencies can I use to purchase tickets?",
      answer: "Currently, you can purchase tickets using USDC on the Base Network. Each ticket costs $1 USDC and is uniquely identified.",
      icon: <Coins size={20} className="marketing2-accent mr-2 flex-shrink-0" />
    },
    {
      question: "Do I need a referral code to purchase tickets?",
      answer: "Yes, you need a valid referral code to purchase tickets. This helps grow our community through word-of-mouth. After your first purchase, you'll receive your own referral code that you can share with others.",
      icon: <RefreshCcw size={20} className="marketing2-accent mr-2 flex-shrink-0" />
    },
    {
      question: "How do I claim my winnings?",
      answer: "Winnings are automatically sent to the wallet address that purchased the winning ticket. There's no need to manually claim them - they'll appear in your wallet shortly after the raffle ends.",
      icon: <DollarSign size={20} className="marketing2-accent mr-2 flex-shrink-0" />
    },
    {
      question: "What is auto-entry?",
      answer: "Auto-entry allows you to automatically enter future raffles without having to manually purchase tickets each time. You can set up auto-entry with a specific number of tickets and for a chosen number of entries.",
      icon: <Calendar size={20} className="marketing2-accent mr-2 flex-shrink-0" />
    },
    {
      question: "Is there a maximum number of tickets I can buy?",
      answer: "Yes, you can only purchase as many tickets as are available in the current raffle pool. The maximum target for each raffle is typically 1,000 tickets.",
      icon: <Ticket size={20} className="marketing2-accent mr-2 flex-shrink-0" />
    },
    {
      question: "How is the prize pool calculated?",
      answer: "The prize pool is distributed as follows: 95% goes to winners, 3% goes to a buy back and burn wallet, 1% goes toward platform operations, and 1% goes to the pool creator.",
      icon: <Wallet size={20} className="marketing2-accent mr-2 flex-shrink-0" />
    },
    {
      question: "Are the raffles secure and fair?",
      answer: "Yes, our raffles operate on smart contracts with verifiable randomness. The code is open-source and has been audited for security and fairness. The winner selection process is fully transparent and cannot be manipulated.",
      icon: <ShieldCheck size={20} className="marketing2-accent mr-2 flex-shrink-0" />
    },
    {
      question: "What happens when a raffle reaches its target amount?",
      answer: "When a raffle reaches its target amount (typically 1,000 tickets sold), it automatically closes and a winner is selected. A new raffle then begins immediately for the next cycle.",
      icon: <HelpCircle size={20} className="marketing2-accent mr-2 flex-shrink-0" />
    },
    {
      question: "Can I see my past entries and results?",
      answer: "Yes, you can view all your past entries and results in the My Activity section. This includes information about which raffles you've entered, how many tickets you purchased, and whether you won.",
      icon: <Clock size={20} className="marketing2-accent mr-2 flex-shrink-0" />
    }
  ];

  return (
    <section className="container mx-auto py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold marketing2-headline mb-4">FAQs</h2>
        </div>
        
        <div className="marketing2-card p-6 rounded-xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i+1}`} className="border-b border-white/30 py-1">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center text-left marketing2-headline">
                    {item.icon}
                    <span>{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="marketing2-body pb-4 pl-8">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
