import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Target, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function HireWithUs() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    whatsapp: '',
    country: '',
    city: '',
    position: '',
    salaryRange: '',
    benefits: '',
    description: '',
    requirements: '',
    deadline: '',
    visaSponsor: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest('POST', '/api/employer-submissions', formData);

      toast({
        title: t('employer.success'),
      });

      setFormData({
        companyName: '',
        email: '',
        whatsapp: '',
        country: '',
        city: '',
        position: '',
        salaryRange: '',
        benefits: '',
        description: '',
        requirements: '',
        deadline: '',
        visaSponsor: false,
      });
    } catch (error) {
      toast({
        title: t('employer.error'),
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-hire-title">
            {t('employer.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('employer.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">{t('employer.company')}</Label>
                      <Input
                        id="company"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        data-testid="input-employer-company"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t('employer.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="input-employer-email"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">{t('employer.whatsapp')}</Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        required
                        placeholder="+971501234567"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        data-testid="input-employer-whatsapp"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">{t('employer.position')}</Label>
                      <Input
                        id="position"
                        required
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        data-testid="input-employer-position"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="country">{t('employer.country')}</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData({ ...formData, country: value })}
                      >
                        <SelectTrigger id="country" data-testid="select-employer-country">
                          <SelectValue placeholder={t('employer.country')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="KSA">{t('country.ksa')}</SelectItem>
                          <SelectItem value="UAE">{t('country.uae')}</SelectItem>
                          <SelectItem value="QAT">{t('country.qat')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">{t('employer.city')}</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        data-testid="input-employer-city"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="salary">{t('employer.salary')}</Label>
                      <Input
                        id="salary"
                        placeholder="8,000 - 12,000 SAR"
                        value={formData.salaryRange}
                        onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                        data-testid="input-employer-salary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline">{t('employer.deadline')}</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        data-testid="input-employer-deadline"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="benefits">{t('employer.benefits')}</Label>
                    <Input
                      id="benefits"
                      placeholder="Housing, Transport, Medical insurance"
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      data-testid="input-employer-benefits"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t('employer.description')}</Label>
                    <Textarea
                      id="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      data-testid="input-employer-description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">{t('employer.requirements')}</Label>
                    <Textarea
                      id="requirements"
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      data-testid="input-employer-requirements"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="visa"
                      checked={formData.visaSponsor}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, visaSponsor: checked as boolean })
                      }
                      data-testid="checkbox-employer-visa"
                    />
                    <Label htmlFor="visa" className="cursor-pointer">
                      {t('employer.visa')}
                    </Label>
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting} data-testid="button-employer-submit">
                    {isSubmitting ? t('common.loading') : t('employer.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Qualified Candidates</h3>
                    <p className="text-sm text-muted-foreground">
                      Access to pre-screened professionals from Tunisia, Morocco, and Algeria.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Targeted Reach</h3>
                    <p className="text-sm text-muted-foreground">
                      Your job posting reaches candidates specifically looking for Gulf opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Fast Results</h3>
                    <p className="text-sm text-muted-foreground">
                      Get quality applications within 48 hours of posting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
