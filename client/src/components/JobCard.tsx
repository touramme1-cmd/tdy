import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, DollarSign, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';
import type { JobWithEmployer } from '@shared/schema';
import { createWhatsAppLink, createJobWhatsAppMessage } from '@/lib/whatsapp';

interface JobCardProps {
  job: JobWithEmployer;
}

export default function JobCard({ job }: JobCardProps) {
  const { t, lang } = useI18n();

  const title = lang === 'ar' ? job.titleAr : job.titleEn;
  const description = lang === 'ar' ? job.descriptionAr : job.descriptionEn;
  
  const countryKey = job.country.toLowerCase() as 'ksa' | 'uae' | 'qat';
  const countryName = t(`country.${countryKey}`);
  const cityKey = job.city.toLowerCase().replace(/\s+/g, '') as 'riyadh' | 'dubai' | 'doha' | 'jeddah' | 'dammam' | 'abudhabi';
  const cityName = t(`city.${cityKey}`);

  const formatSalary = () => {
    if (!job.salaryMin && !job.salaryMax) return null;
    if (job.salaryMin && job.salaryMax) {
      return `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${job.currency}`;
    }
    if (job.salaryMin) {
      return `${job.salaryMin.toLocaleString()}+ ${job.currency}`;
    }
    return `${job.salaryMax.toLocaleString()} ${job.currency}`;
  };

  const salary = formatSalary();

  const handleWhatsAppClick = () => {
    const phone = job.whatsappRecipient || job.employer.whatsappNumber;
    const currentUrl = `${window.location.origin}/job/${job.slug}`;
    const message = createJobWhatsAppMessage(title, cityName, countryName, currentUrl, lang);
    const link = createWhatsAppLink(phone, message);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    const locale = lang === 'ar' ? 'ar-SA' : lang === 'fr' ? 'fr-FR' : 'en-US';
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="h-full flex flex-col hover-elevate transition-all" data-testid={`card-job-${job.id}`}>
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link href={`/job/${job.slug}`} className="hover:text-primary transition-colors">
              <h3 className="font-semibold text-lg line-clamp-2" data-testid={`text-job-title-${job.id}`}>{title}</h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{job.employer.name}</p>
          </div>
          {job.employer.logo && (
            <img
              src={job.employer.logo}
              alt={job.employer.name}
              className="w-12 h-12 rounded-md object-cover flex-shrink-0"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {job.urgent && (
            <Badge className="bg-accent text-accent-foreground" data-testid={`badge-urgent-${job.id}`}>
              {t('badge.urgent')}
            </Badge>
          )}
          {job.featured && (
            <Badge variant="secondary" data-testid={`badge-featured-${job.id}`}>
              {t('badge.featured')}
            </Badge>
          )}
          {job.visaSponsorship && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" data-testid={`badge-visa-${job.id}`}>
              {t('badge.visa')}
            </Badge>
          )}
          {job.housing && (
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" data-testid={`badge-housing-${job.id}`}>
              {t('badge.housing')}
            </Badge>
          )}
          {job.relocation && (
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100" data-testid={`badge-relocation-${job.id}`}>
              {t('badge.relocation')}
            </Badge>
          )}
          {job.remote && (
            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100" data-testid={`badge-remote-${job.id}`}>
              {t('badge.remote')}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span>{cityName}, {countryName}</span>
        </div>

        {salary && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 flex-shrink-0" />
            <span className="font-medium text-foreground">{salary}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span>{formatDate(job.postedAt)}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2 pt-3 border-t">
        <Link href={`/job/${job.slug}`}>
          <Button variant="default" size="sm" className="flex-1" data-testid={`button-apply-${job.id}`}>
            {t('jobs.apply')}
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleWhatsAppClick}
          data-testid={`button-whatsapp-${job.id}`}
        >
          <MessageCircle className="h-4 w-4 me-2" />
          WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
}
