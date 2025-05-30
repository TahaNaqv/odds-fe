
import { Heart, MessageCircle, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketingFooter = () => {
  return (
    <footer className="marketing2-footer w-full py-6 px-4 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Copyright and links section */}
          <div className="space-y-4">
            <div className="text-sm marketing2-emphasized font-medium">
              © 2025 copyright Ødds
            </div>
            <div className="text-sm marketing2-body flex items-center">
              Built with <Heart className="h-4 w-4 mx-1 marketing2-accent fill-current" /> on Base
            </div>
          </div>
          
          {/* Social links and Terms */}
          <div className="space-y-4 flex flex-col items-end">
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="marketing2-headline hover:marketing2-secondary-accent transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/odds_dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="marketing2-headline hover:marketing2-secondary-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div className="flex flex-col space-y-2">
              <Link 
                to="/terms" 
                className="marketing2-body hover:marketing2-headline transition-colors text-sm"
              >
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;
