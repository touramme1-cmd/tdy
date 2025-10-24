import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Languages, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function LanguageSelector() {
  const { setLang } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem('lang');
    if (!hasSelectedLanguage) {
      setOpen(true);
    }
  }, []);

  const selectLanguage = (lang: 'en' | 'ar' | 'fr') => {
    setLang(lang);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-language-selector">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Languages className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl">Welcome / مرحباً / Bienvenue</DialogTitle>
          <DialogDescription className="text-base">
            Choose your preferred language / اختر لغتك المفضلة / Choisissez votre langue
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-3 py-4">
          <Button
            onClick={() => selectLanguage('en')}
            variant="outline"
            size="lg"
            className="justify-start gap-3"
            data-testid="button-select-english"
          >
            <Globe className="h-5 w-5 text-primary" />
            <div className="flex flex-col items-start">
              <span className="font-semibold">English</span>
              <span className="text-xs text-muted-foreground">International</span>
            </div>
          </Button>

          <Button
            onClick={() => selectLanguage('ar')}
            variant="outline"
            size="lg"
            className="justify-start gap-3"
            data-testid="button-select-arabic"
          >
            <Globe className="h-5 w-5 text-primary" />
            <div className="flex flex-col items-start">
              <span className="font-semibold">العربية</span>
              <span className="text-xs text-muted-foreground">اللغة العربية</span>
            </div>
          </Button>

          <Button
            onClick={() => selectLanguage('fr')}
            variant="outline"
            size="lg"
            className="justify-start gap-3"
            data-testid="button-select-french"
          >
            <Globe className="h-5 w-5 text-primary" />
            <div className="flex flex-col items-start">
              <span className="font-semibold">Français</span>
              <span className="text-xs text-muted-foreground">Maghreb</span>
            </div>
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          You can change this later from the header / يمكنك تغيير هذا لاحقًا / Vous pouvez changer cela plus tard
        </p>
      </DialogContent>
    </Dialog>
  );
}
