import StarsBurst from "@/components/effects/StarsBurst";
import { TOKENS } from "@/utils/constants";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { formatUnits } from "viem";
import { useBalance } from "wagmi";

const USDC_ADDRESS = TOKENS.mUSDC.address as `0x${string}`;

const HeroSection = () => {
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
    token: USDC_ADDRESS,
  });

  const formattedBalance = balance
    ? formatUnits(balance.value, balance.decimals)
    : "0";

  const handleConnectWallet = () => {
    if (!isConnected) {
      open();
    }
  };

  return (
    <section className="container mx-auto py-12 md:py-16 animate-children">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-block marketing2-hero-badge px-4 py-1.5 rounded-full mb-8">
          <span className="text-sm font-medium marketing2-secondary-accent">
            Base Network
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 marketing2-headline">
          Ødds Genesis Raffle
        </h1>
        <p className="text-lg marketing2-body mb-4 leading-relaxed">
          Play every day with $1 tickets in USDC. Buy more to increase your odds
          and opt in for automatic daily entries!
        </p>
        <div className="flex justify-center mb-2">
          <span className="text-[4rem] animate-float">💰</span>
        </div>

        {/* Dynamic USDC balance section */}
        <div className="relative z-10 mb-4">
          <div className="counter-backdrop absolute inset-0 bg-black/40 blur-sm rounded-xl -z-10"></div>
          <div 
            className={`counter-container marketing2-card marketing2-glow-blue px-6 py-4 inline-block rounded-lg relative z-10 ${!isConnected ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''}`}
            onClick={handleConnectWallet}
          >
            <div className="counter-inner relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-0 marketing2-headline">
                {isConnected
                  ? `USDC $ ${Number(formattedBalance).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}`
                  : "Connect Wallet"}
              </h2>
            </div>
          </div>

          <div className="absolute inset-0 -top-10 -bottom-6 overflow-hidden pointer-events-none">
            <StarsBurst className="z-0" />
          </div>
        </div>

        <p className="marketing2-body mb-4 animate-fade-in">
          {isConnected
            ? "Your USDC Balance"
            : "Connect your wallet to view balance"}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
