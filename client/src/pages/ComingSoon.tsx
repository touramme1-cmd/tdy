import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function ComingSoon() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest('POST', '/api/job-alerts', {
        email,
        phone,
        countries: [],
        categories: [],
        keywords: '',
      });

      toast({
        title: t('coming.success'),
        description: 'You will be notified when new jobs are posted.',
      });

      setEmail('');
      setPhone('');
    } catch (error) {
      toast({
        title: 'Failed to subscribe',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const upcomingCategories = [
    'Financial Services',
    'Real Estate',
    'Aviation',
    'Oil & Gas',
    'Telecommunications',
    'Manufacturing',
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-12 text-center">
          <Bell className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl font-bold mb-4" data-testid="text-coming-title">
            {t('coming.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('coming.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('coming.subscribe')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('coming.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-testid="input-coming-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp / Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+971501234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    data-testid="input-coming-phone"
                  />
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting} data-testid="button-coming-subscribe">
                  {isSubmitting ? t('common.loading') : t('coming.subscribe')}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingCategories.map((category, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-lg border bg-card hover-elevate"
                  >
                    <Briefcase className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{category}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-muted-foreground">
            <p>We're constantly adding new opportunities from top employers across the Gulf region.</p>
            <p className="mt-2">Subscribe now to be the first to know!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
