
import { Twitter, Globe } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 mt-auto bg-secondary/20">
      <Separator className="mb-6" />
      <div className="container mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Top section with links and copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms and Conditions
              </Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/legality" className="hover:text-foreground transition-colors">
                Legality
              </Link>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © copyright 2025 by Probo Media Technologies Pvt. Ltd.
            </div>
          </div>
          
          {/* Bottom section with disclaimer */}
          <div className="pt-4">
            <h4 className="font-semibold mb-2">Disclaimer</h4>
            <p className="text-sm text-muted-foreground">
              This game may be habit forming or financially risky. Play responsibly. 18+ only.
            </p>
          </div>
          
          {/* Social links */}
          <div className="flex items-center justify-center md:justify-end gap-3 pt-2">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Website"
            >
              <Globe className="h-4 w-4" />
            </a>
            <a 
              href="https://x.com/odds_dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
