import { Link, useLocation } from 'wouter';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import logoUrl from '@assets/e6a7b1df-8f39-4d71-be94-25c86eed6781_removalai_preview_1761119121046.png';

export default function Header() {
  const { t, lang, setLang, dir } = useI18n();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('nav.jobs'), href: '/jobs' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.faq'), href: '/faq' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const toggleLanguage = () => {
    const languages: Array<'en' | 'ar' | 'fr'> = ['en', 'fr', 'ar'];
    const currentIndex = languages.indexOf(lang);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLang(languages[nextIndex]);
  };
  
  const getLanguageLabel = () => {
    switch (lang) {
      case 'ar': return 'AR';
      case 'fr': return 'FR';
      default: return 'EN';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" data-testid="link-home">
            <img src={logoUrl} alt="BENO Consulting" className="h-14 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
                data-testid={`link-${item.href.slice(1)}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="hidden md:inline-block">
              <Button variant="default" size="sm" className="gap-2" data-testid="button-submit-cv">
                <MessageCircle className="h-4 w-4" />
                {t('nav.submitCV')}
              </Button>
            </Link>
            
            <ThemeToggle />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              data-testid="button-language-toggle"
              className="gap-1"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-semibold">{getLanguageLabel()}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-testid="button-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-2 border-t">
            {navigation.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent ${
                  location === item.href ? 'bg-accent text-accent-foreground' : 'text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${item.href.slice(1)}`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contact">
              <Button 
                variant="default" 
                className="w-full gap-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="button-mobile-submit-cv"
              >
                <MessageCircle className="h-4 w-4" />
                {t('nav.submitCV')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
