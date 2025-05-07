
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { Copy, Twitter, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { copyToClipboard, shareOnTwitter, shareOnTelegram } from '@/utils/helpers';
import { useTheme } from '@/components/ThemeProvider';

interface ReferralShareProps {
  raffleId: string;
  ticketCount: number;
  referralLink: string;
  message: string;
}

const ReferralShareToast = ({ raffleId, ticketCount, referralLink, message }: ReferralShareProps) => {
  const [copying, setCopying] = useState(false);
  const { theme } = useTheme();
  
  const handleCopyLink = async () => {
    setCopying(true);
    const success = await copyToClipboard(referralLink);
    
    if (success) {
      toast({
        title: "Link copied!",
        description: "Referral link copied to clipboard",
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Could not copy the referral link",
        variant: "destructive",
      });
    }
    
    setCopying(false);
  };
  
  const handleTwitterShare = () => {
    shareOnTwitter(message);
  };
  
  const handleTelegramShare = () => {
    shareOnTelegram(message);
  };

  // Determine button styles based on theme
  const twitterBgClass = theme === 'neon' ? 'bg-[#1DA1F2] hover:bg-[#1a94e0]' : 'bg-[#1DA1F2] hover:bg-[#1a94e0]';
  const telegramBgClass = theme === 'neon' ? 'bg-[#0088cc] hover:bg-[#007ab8]' : 'bg-[#0088cc] hover:bg-[#007ab8]';
  
  return (
    <div className="flex flex-col space-y-3">
      <p className="font-medium mb-1">Your referral link is ready to share:</p>
      
      <div className={`flex items-center justify-between rounded-lg bg-muted p-2 text-xs ${theme === 'neon' ? 'neon-border' : ''}`}>
        <span className="flex-1 truncate mr-2">{referralLink}</span>
        <Button 
          onClick={handleCopyLink} 
          size="sm" 
          variant="ghost" 
          className={`h-7 w-7 p-0 ${theme === 'neon' ? 'hover:bg-[#C3073F]/20' : ''}`}
          disabled={copying}
        >
          <Copy className={`h-3.5 w-3.5 ${theme === 'neon' ? 'text-[#C3073F]' : ''}`} />
          <span className="sr-only">Copy link</span>
        </Button>
      </div>
      
      <div className="flex space-x-2 justify-end">
        <Button 
          onClick={handleTwitterShare}
          size="sm" 
          className={`${twitterBgClass} text-white`}
        >
          <Twitter className="mr-1 h-4 w-4" />
          Twitter
        </Button>
        
        <Button 
          onClick={handleTelegramShare}
          size="sm" 
          className={`${telegramBgClass} text-white`}
        >
          <Send className="mr-1 h-4 w-4" />
          Telegram
        </Button>
      </div>
    </div>
  );
};

export const showReferralToast = (
  raffleId: string, 
  ticketCount: number, 
  referralLink: string
) => {
  const message = `I'm in Raffle #${raffleId} with ${ticketCount} ticket(s) on Ødds 🎲\nOne ticket. One shot. One win. 💸\n👉 ${referralLink}`;
  
  toast({
    title: "Tickets purchased!",
    description: "Bravo! May the Ødds be in your favor",
    action: (
      <ToastAction altText="Share referral link">
        <ReferralShareToast 
          raffleId={raffleId}
          ticketCount={ticketCount}
          referralLink={referralLink}
          message={message}
        />
      </ToastAction>
    ),
  });
};
