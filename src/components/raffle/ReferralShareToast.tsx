import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { Copy, Twitter, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";

// Generate referral link with auto-filled referral code
const generateReferralLink = (referralCode: string) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/?ref=${referralCode}`;
};

// Copy referral link to clipboard
const copyReferralLink = async (referralLink: string) => {
  try {
    await navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copied!",
      description: "Referral link copied to clipboard",
      duration: 3000,
    });
  } catch (error) {
    console.error("Failed to copy link:", error);
    toast({
      title: "Copy failed",
      description: "Failed to copy link to clipboard",
      variant: "destructive",
    });
  }
};

// Share on Twitter
const shareOnTwitter = (
  referralLink: string,
  raffleId: number,
  ticketCount: number
) => {
  const text = `Just purchased ${ticketCount} tickets for Raffle #${raffleId} on Ødds! 🎲\n\nJoin me and get your own referral code:\n${referralLink}\n\n#Web3 #Base #DeFi #Raffle`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}`;
  window.open(url, "_blank");
};

// Share on Telegram
const shareOnTelegram = (
  referralLink: string,
  raffleId: number,
  ticketCount: number
) => {
  const text = `Just purchased ${ticketCount} tickets for Raffle #${raffleId} on Ødds! 🎲\n\nJoin me and get your own referral code:\n${referralLink}`;
  const url = `https://t.me/share/url?url=${encodeURIComponent(
    referralLink
  )}&text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
};

interface ReferralShareActionProps {
  raffleId: number;
  ticketCount: number;
  referralCode: string;
}

const ReferralShareAction = ({
  raffleId,
  ticketCount,
  referralCode,
}: ReferralShareActionProps) => {
  const { theme } = useTheme();
  const referralLink = generateReferralLink(referralCode);

  // Theme classes
  const twitterBgClass =
    theme === "neon"
      ? "bg-[#1DA1F2] hover:bg-[#1a94e0]"
      : theme === "gold"
      ? "bg-[#1DA1F2] hover:bg-[#1a94e0]"
      : theme === "cyber"
      ? "bg-[#1DA1F2] hover:bg-[#1a94e0]"
      : "bg-[#1DA1F2] hover:bg-[#1a94e0]";

  const telegramBgClass =
    theme === "neon"
      ? "bg-[#0088cc] hover:bg-[#007ab8]"
      : theme === "gold"
      ? "bg-[#0088cc] hover:bg-[#007ab8]"
      : theme === "cyber"
      ? "bg-[#0088cc] hover:bg-[#007ab8]"
      : "bg-[#0088cc] hover:bg-[#007ab8]";

  return (
    <div className="flex flex-wrap gap-1.5 justify-end mt-1">
      <Button
        onClick={() => shareOnTwitter(referralLink, raffleId, ticketCount)}
        size="icon"
        className={`${twitterBgClass} text-white rounded-full h-8 w-8 flex items-center justify-center p-0`}
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => shareOnTelegram(referralLink, raffleId, ticketCount)}
        size="icon"
        className={`${telegramBgClass} text-white rounded-full h-8 w-8 flex items-center justify-center p-0`}
        aria-label="Share on Telegram"
      >
        <MessageCircle className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Referral link with copy button (for use in description)
export const ReferralLinkBox = ({ referralCode }: { referralCode: string }) => {
  const [copying, setCopying] = useState(false);
  const { theme } = useTheme();
  const referralLink = generateReferralLink(referralCode);
  const borderClass =
    theme === "neon"
      ? "neon-border"
      : theme === "gold"
      ? "gold-border"
      : theme === "cyber"
      ? "cyber-border"
      : "";
  const hoverBgClass =
    theme === "neon"
      ? "hover:bg-[#C3073F]/20"
      : theme === "gold"
      ? "hover:bg-[#FFD700]/20"
      : theme === "cyber"
      ? "hover:bg-[#00FFFF]/20"
      : "";
  const textColorClass =
    theme === "neon"
      ? "text-[#C3073F]"
      : theme === "gold"
      ? "text-[#FFD700]"
      : theme === "cyber"
      ? "text-[#00FFFF]"
      : "";

  const handleCopyLink = async () => {
    setCopying(true);
    await copyReferralLink(referralLink);
    setCopying(false);
  };

  return (
    <div
      className={`flex items-center rounded-md bg-muted p-1.5 text-xs ${borderClass} overflow-x-auto max-w-full mt-2`}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <span
        className="flex-1 font-mono text-xs whitespace-nowrap overflow-x-auto max-w-[140px] md:max-w-[220px]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {referralLink}
      </span>
      <Button
        onClick={handleCopyLink}
        size="sm"
        variant="ghost"
        className={`h-5 w-5 p-0 flex-shrink-0 ml-1 ${hoverBgClass}`}
        disabled={copying}
      >
        <Copy className={`h-2.5 w-2.5 ${textColorClass}`} />
        <span className="sr-only">Copy link</span>
      </Button>
    </div>
  );
};

export const showReferralToast = (
  raffleId: number,
  ticketCount: number,
  referralCode: string
) => {
  toast({
    title: "Tickets purchased! 🎉",
    description: (
      <div>
        <div>{`You've purchased ${ticketCount} tickets for Raffle #${raffleId}. Share your referral link to earn rewards!`}</div>
        <ReferralLinkBox referralCode={referralCode} />
      </div>
    ),
    action: (
      <ToastAction altText="Share referral link">
        <ReferralShareAction
          raffleId={raffleId}
          ticketCount={ticketCount}
          referralCode={referralCode}
        />
      </ToastAction>
    ),
    duration: 15000,
  });
};
