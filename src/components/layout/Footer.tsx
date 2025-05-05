
import { Twitter, Globe, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-4 px-4 mt-auto bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between">
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © 2025 Odds
          </div>
          
          {/* Social links */}
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
          
          {/* Built with love */}
          <div className="text-sm text-gray-400 flex items-center">
            Built with <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" /> on Base
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
