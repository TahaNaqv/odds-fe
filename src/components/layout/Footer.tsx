
import { Twitter, Globe, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 mt-auto bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Copyright and links section */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms and Conditions
              </Link>
            </div>
            <div className="text-sm text-gray-400 flex items-center">
              Built with <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" /> on Base
            </div>
          </div>
          
          {/* Disclaimer section */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">
              Disclaimer
            </h4>
            <p className="text-xs text-gray-400">
              This game may be habit forming or financially risky. Play responsibly.
            </p>
          </div>
          
          {/* Social links and Terms */}
          <div className="space-y-4 flex flex-col items-end">
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Website"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/odds_dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div className="text-sm text-gray-400 font-medium">
              © 2025 copyright Ødds
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
