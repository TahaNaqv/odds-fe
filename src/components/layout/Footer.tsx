import { GithubIcon, Globe, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 mt-auto">
      <Separator className="mb-6" />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>© 2025 Ødds</span>
        </div>
        
        <div className="flex items-center gap-3">
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
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center">
            Built with <Heart className="h-3 w-3 mx-1 text-red-500" /> on Base
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
