import { useRoute, Link } from 'wouter';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  MessageCircle,
  Share2,
  Bookmark,
  Building2,
  Mail,
  Globe,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import type { JobWithEmployer } from '@shared/schema';
import { createWhatsAppLink, createJobWhatsAppMessage } from '@/lib/whatsapp';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import JobCard from '@/components/JobCard';

export default function JobDetail() {
  const [, params] = useRoute('/job/:slug');
  const { t, lang } = useI18n();
  const { toast } = useToast();
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryOfOrigin: '',
    message: '',
  });

  const { data: job, isLoading } = useQuery<JobWithEmployer>({
    queryKey: [`/api/jobs/${params?.slug}`],
    enabled: !!params?.slug,
  });

  const { data: similarJobs } = useQuery<JobWithEmployer[]>({
    queryKey: [`/api/jobs?category=${job?.category}&limit=3`],
    enabled: !!job?.category,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold">{t('common.error')}</p>
          <Link href="/jobs">
            <Button>{t('common.back')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === 'ar' ? job.titleAr : lang === 'fr' ? (job.titleFr || job.titleEn) : job.titleEn;
  const description = lang === 'ar' ? job.descriptionAr : lang === 'fr' ? (job.descriptionFr || job.descriptionEn) : job.descriptionEn;
  const responsibilities = lang === 'ar' ? job.responsibilitiesAr : lang === 'fr' ? (job.responsibilitiesFr || job.responsibilitiesEn) : job.responsibilitiesEn;
  const requirements = lang === 'ar' ? job.requirementsAr : lang === 'fr' ? (job.requirementsFr || job.requirementsEn) : job.requirementsEn;

  const countryKey = job.country.toLowerCase() as 'ksa' | 'uae' | 'qat';
  const countryName = t(`country.${countryKey}`);
  const cityKey = job.city.toLowerCase().replace(/\s+/g, '') as 'riyadh' | 'dubai' | 'doha' | 'jeddah' | 'dammam' | 'abudhabi';
  const cityName = t(`city.${cityKey}`);

  const formatSalary = () => {
    if (!job.salaryMin && !job.salaryMax) return t('contact.subject');
    if (job.salaryMin && job.salaryMax) {
      return `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${job.currency}`;
    }
    if (job.salaryMin) {
      return `${job.salaryMin.toLocaleString()}+ ${job.currency}`;
    }
    return `${job.salaryMax.toLocaleString()} ${job.currency}`;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    const locale = lang === 'ar' ? 'ar-SA' : lang === 'fr' ? 'fr-FR' : 'en-US';
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleWhatsAppClick = () => {
    const phone = job.whatsappRecipient || job.employer.whatsappNumber;
    const currentUrl = window.location.href;
    const message = createJobWhatsAppMessage(title, cityName, countryName, currentUrl, lang);
    const link = createWhatsAppLink(phone, message);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied',
        description: 'Job link copied to clipboard',
      });
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await apiRequest('POST', '/api/applications', {
        jobId: job.id,
        ...formData,
      });

      toast({
        title: t('apply.success'),
        description: 'We will review your application and get back to you soon.',
      });

      setApplyDialogOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryOfOrigin: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: t('apply.error'),
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Link href="/jobs">
                  <a className="hover:text-primary">{t('jobs.title')}</a>
                </Link>
                <span>/</span>
                <span>{title}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-job-title">
                {title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.urgent && (
                  <Badge className="bg-accent text-accent-foreground">
                    {t('badge.urgent')}
                  </Badge>
                )}
                {job.featured && (
                  <Badge variant="secondary">{t('badge.featured')}</Badge>
                )}
                {job.visaSponsorship && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {t('badge.visa')}
                  </Badge>
                )}
                {job.housing && (
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    {t('badge.housing')}
                  </Badge>
                )}
                {job.relocation && (
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                    {t('badge.relocation')}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium text-foreground">{job.employer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{cityName}, {countryName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(job.postedAt)}</span>
                </div>
              </div>
            </div>

            {job.employer.logo && (
              <img
                src={job.employer.logo}
                alt={job.employer.name}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
            )}
          </div>

          <div className="flex gap-3 mt-6 flex-wrap">
            <Button size="lg" onClick={() => setApplyDialogOpen(true)} data-testid="button-apply">
              <Briefcase className="h-5 w-5 me-2" />
              {t('job.applyNow')}
            </Button>
            <Button size="lg" variant="outline" onClick={handleWhatsAppClick} data-testid="button-whatsapp">
              <MessageCircle className="h-5 w-5 me-2" />
              {t('job.applyWhatsapp')}
            </Button>
            <Button size="lg" variant="outline" onClick={handleShare} data-testid="button-share">
              <Share2 className="h-5 w-5 me-2" />
              {t('job.share')}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('job.description')}</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{description}</p>
              </CardContent>
            </Card>

            {responsibilities && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('job.responsibilities')}</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{responsibilities}</p>
                </CardContent>
              </Card>
            )}

            {requirements && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('job.requirements')}</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{requirements}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>{t('job.salary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{formatSalary()}</p>
                    <p className="text-sm text-muted-foreground">{job.contractType}</p>
                  </div>
                </div>

                {job.benefits && job.benefits.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Benefits:</p>
                    <ul className="space-y-1">
                      {job.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {(job.visaSponsorship || job.relocation || job.housing) && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('job.visaRelocation')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {job.visaSponsorship && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        ✓
                      </Badge>
                      <span>{t('badge.visa')}</span>
                    </div>
                  )}
                  {job.housing && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        ✓
                      </Badge>
                      <span>{t('badge.housing')}</span>
                    </div>
                  )}
                  {job.relocation && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        ✓
                      </Badge>
                      <span>{t('badge.relocation')}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('job.aboutEmployer')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  {job.employer.logo && (
                    <img
                      src={job.employer.logo}
                      alt={job.employer.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{job.employer.name}</h3>
                  </div>
                </div>

                {job.employer.about && (
                  <p className="text-sm text-muted-foreground">{job.employer.about}</p>
                )}

                <Separator />

                <div className="space-y-2 text-sm">
                  {job.employer.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={job.employer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                  {job.employer.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${job.employer.email}`}
                        className="text-primary hover:underline"
                      >
                        {job.employer.email}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {similarJobs && similarJobs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('job.similarJobs')}</h3>
                <div className="space-y-4">
                  {similarJobs.filter(j => j.id !== job.id).slice(0, 2).map((similarJob) => (
                    <JobCard key={similarJob.id} job={similarJob} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('apply.title')}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleApplySubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('apply.name')}</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                data-testid="input-apply-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('apply.email')}</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                data-testid="input-apply-email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t('apply.phone')}</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                data-testid="input-apply-phone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">{t('apply.origin')}</Label>
              <Input
                id="origin"
                placeholder="Tunisia, Morocco, Algeria"
                value={formData.countryOfOrigin}
                onChange={(e) => setFormData({ ...formData, countryOfOrigin: e.target.value })}
                data-testid="input-apply-origin"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t('apply.message')}</Label>
              <Textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                data-testid="input-apply-message"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setApplyDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button type="submit" data-testid="button-submit-apply">
                {t('apply.submit')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
