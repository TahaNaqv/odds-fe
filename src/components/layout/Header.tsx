import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ticket, Clock, History, Trophy, Megaphone } from "lucide-react";
const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Update scrolled state based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if a nav item is active
  const isActive = (path: string) => {
    return location.pathname === path || path === "/activity-calendar" && (location.pathname === "/activity-preview" || location.pathname === "/activity");
  };
  return <header className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md ${scrolled ? "bg-background/80 shadow-subtle dark:bg-background/80" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Logo with doubled size */}
          <Link to="/" className="flex items-center mb-3 md:mb-0">
            <img alt="Ødds Logo" className="h-16 md:h-20" style={{
            background: "transparent"
          }} src="/lovable-uploads/f9378bd3-3347-43e0-b52d-9c409b502733.png" />
          </Link>

          {/* Navigation - Centered on mobile and right-adjusted on desktop */}
          <div className="pl-20 flex items-center justify-center space-x-1 mb-3 md:mb-0">
            <Link to="/">
              <Button variant={isActive("/") ? "secondary" : "ghost"} size="sm" className={`rounded-lg ${isActive("/") ? "bg-raffle-light-blue text-raffle-blue dark:bg-secondary dark:text-high-contrast font-medium" : ""}`}>
                <Ticket className="mr-2 h-4 w-4" /> Raffle
              </Button>
            </Link>

            <Link to="/marketing">
              <Button variant={isActive("/marketing") ? "secondary" : "ghost"} size="sm" className={`rounded-lg ${isActive("/marketing") ? "bg-raffle-light-blue text-raffle-blue dark:bg-secondary dark:text-high-contrast font-medium" : ""}`}>
                <Megaphone className="mr-2 h-4 w-4" /> About
              </Button>
            </Link>

            <Link to="/activity-calendar">
              <Button variant={isActive("/activity-calendar") ? "secondary" : "ghost"} size="sm" className={`rounded-lg ${isActive("/activity-calendar") ? "bg-raffle-light-blue text-raffle-blue dark:bg-secondary dark:text-high-contrast font-medium" : ""}`}>
                <Clock className="mr-2 h-4 w-4" /> My Activity
              </Button>
            </Link>

            <Link to="/history">
              <Button variant={isActive("/history") ? "secondary" : "ghost"} size="sm" className={`rounded-lg ${isActive("/history") ? "bg-raffle-light-blue text-raffle-blue dark:bg-secondary dark:text-high-contrast font-medium" : ""}`}>
                <History className="mr-2 h-4 w-4" /> Raffle History
              </Button>
            </Link>

            <Link to="/referrals">
              <Button variant={isActive("/referrals") ? "secondary" : "ghost"} size="sm" className={`rounded-lg ${isActive("/referrals") ? "bg-raffle-light-blue text-raffle-blue dark:bg-secondary dark:text-high-contrast font-medium" : ""}`}>
                <Trophy className="mr-2 h-4 w-4" /> Referrals
              </Button>
            </Link>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center gap-2">
            <appkit-button />
          </div>
        </div>
      </div>
    </header>;
};
export default Header;