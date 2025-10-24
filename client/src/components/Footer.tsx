import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useI18n();

  const quickLinks = [
    { name: t('nav.jobs'), href: '/jobs' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.faq'), href: '/faq' },
    { name: t('nav.contact'), href: '/contact' },
    { name: t('nav.hire'), href: '/hire-with-us' },
    { name: t('nav.comingSoon'), href: '/coming-soon' },
  ];

  const legalLinks = [
    { name: t('footer.privacy'), href: '/privacy' },
    { name: t('footer.terms'), href: '/terms' },
    { name: t('footer.cookies'), href: '/cookies' },
  ];

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">BENO Consulting</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.about')}
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@beno-consulting.com" className="hover:text-primary">
                  contact@beno-consulting.com
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.quick')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors" 
                    data-testid={`link-footer-${link.href.slice(1)}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors" 
                    data-testid={`link-footer-${link.href.slice(1)}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('contact.info')}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="https://wa.me/21652265563" className="hover:text-primary">
                  +216 52 265 563
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <div>
                  <p>Tunisia • Saudi Arabia</p>
                  <p>{t('country.uae')} • {t('country.ksa')} • {t('country.qat')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} BENO Consulting. {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
}
