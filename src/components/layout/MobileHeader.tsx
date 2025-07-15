import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Ticket,
  Clock,
  History,
  Trophy,
  Megaphone,
  Menu,
  X,
} from "lucide-react";

const MobileHeader = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    return (
      location.pathname === path ||
      (path === "/activity-calendar" &&
        (location.pathname === "/activity-preview" ||
          location.pathname === "/activity"))
    );
  };

  // Close mobile menu when navigating
  const handleNavClick = () => {
    setIsOpen(false);
  };

  const navigationItems = [
    { path: "/home", label: "Raffle", icon: Ticket },
    { path: "/marketing", label: "About", icon: Megaphone },
    { path: "/activity-calendar", label: "My Activity", icon: Clock },
    { path: "/history", label: "Raffle History", icon: History },
    { path: "/referrals", label: "Referrals", icon: Trophy },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? "bg-background/80 shadow-subtle dark:bg-background/80"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              alt="Ødds Logo"
              className="h-12 md:h-16"
              style={{ background: "transparent" }}
              src="/lovable-uploads/f9378bd3-3347-43e0-b52d-9c409b502733.png"
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button
                  variant={isActive(path) ? "secondary" : "ghost"}
                  size="sm"
                  className={`rounded-lg ${
                    isActive(path)
                      ? "bg-[#7C3AED] text-white dark:bg-[#7C3AED] dark:text-white font-medium"
                      : ""
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" /> {label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right side: Wallet + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Wallet Connection */}
            <appkit-button />

            {/* Mobile Menu Trigger - Hidden on desktop */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden p-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[280px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <h2 className="text-lg font-semibold">Navigation</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="p-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Navigation Items */}
                  <nav className="flex flex-col gap-2 pt-6">
                    {navigationItems.map(({ path, label, icon: Icon }) => (
                      <Link key={path} to={path} onClick={handleNavClick}>
                        <Button
                          variant={isActive(path) ? "secondary" : "ghost"}
                          className={`w-full justify-start rounded-lg ${
                            isActive(path)
                              ? "bg-[#7C3AED] text-white dark:bg-[#7C3AED] dark:text-white font-medium"
                              : ""
                          }`}
                        >
                          <Icon className="mr-3 h-5 w-5" />
                          {label}
                        </Button>
                      </Link>
                    ))}
                  </nav>

                  {/* Footer section if needed */}
                  <div className="mt-auto pt-6 border-t">
                    <p className="text-sm text-muted-foreground text-center">
                      Ødds Raffle Platform
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
