
import { HelpCircle, Coins, DollarSign, Calendar, Clock, Ticket, Wallet, ShieldCheck } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const faqItems = [
    {
      question: "How are winners selected?",
      answer: "Winners are selected through a transparent, verifiable random process on the blockchain. Each ticket has an equal chance of winning, and the selection happens automatically at the end of the 24-hour raffle period.",
      icon: <HelpCircle size={20} className="text-app-purple mr-2 flex-shrink-0" />
    },
    {
      question: "What cryptocurrencies can I use to purchase tickets?",
      answer: "Currently, you can purchase tickets using USDC on the Base Network. Each ticket costs $1 USDC.",
      icon: <Coins size={20} className="text-app-purple mr-2 flex-shrink-0" />
    },
    {
      question: "How do I claim my winnings?",
      answer: "Winnings are automatically sent to the wallet address that purchased the winning ticket. There's no need to manually claim them - they'll appear in your wallet shortly after the raffle ends.",
      icon: <DollarSign size={20} className="text-app-purple mr-2 flex-shrink-0" />
    },
    {
      question: "What is auto-enrollment?",
      answer: "Auto-enrollment allows you to automatically enter future raffles without having to manually purchase tickets each day. You can set up auto-enrollment with a specific number of tickets and for a chosen duration.",
      icon: <Calendar size={20} className="text-app-purple mr-2 flex-shrink-0" />
    },
    {
      question: "Can I cancel my auto-enrollment?",
      answer: "Yes, you can cancel your auto-enrollment at any time from the My Activity section. Any unused balance will be refunded to your wallet.",
      icon: <Clock size={20} className="text-app-purple mr-2 flex-shrink-0" />
    },
    {
      question: "Is there a maximum number of tickets I can buy?",
      answer: "There is no set maximum for ticket purchases. You can buy as many tickets as you'd like to increase your chances of winning.",
      icon: <Ticket size={20} className="text-app-purple mr-2 flex-shrink-0" />
    },
    {
      question: "How is the prize pool calculated?",
      answer: "The prize pool consists of 90% of all ticket sales for that day's raffle. The remaining 10% goes toward platform maintenance and future development.",
      icon: <Wallet size={20} className="text-app-purple mr-2 flex-shrink-0" />
    },
    {
      question: "Are the raffles secure and fair?",
      answer: "Yes, our raffles operate on smart contracts with verifiable randomness. The code is open-source and has been audited for security and fairness. The winner selection process is fully transparent and cannot be manipulated.",
      icon: <ShieldCheck size={20} className="text-app-purple mr-2 flex-shrink-0" />
    },
    {
      question: "What happens if no tickets are sold for a raffle?",
      answer: "If no tickets are sold for a particular raffle, the raffle is canceled and a new one begins for the next day. Since there's no prize pool (as no tickets were sold), there's no winner to select.",
      icon: <HelpCircle size={20} className="text-app-purple mr-2 flex-shrink-0" />
    },
    {
      question: "Can I see my past entries and results?",
      answer: "Yes, you can view all your past entries and results in the My Activity section. This includes information about which raffles you've entered, how many tickets you purchased, and whether you won.",
      icon: <Clock size={20} className="text-app-purple mr-2 flex-shrink-0" />
    }
  ];

  return (
    <section className="container mx-auto py-16 bg-app-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-4">FAQs</h2>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i+1}`} className="border-b border-gray-700 py-1">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center text-left text-white">
                    {item.icon}
                    <span>{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 pl-8">
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
