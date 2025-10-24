import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Briefcase, Heart, Building2, Code, DollarSign, Hotel, GraduationCap, FileCheck, Plane, Home as HomeIcon, Shield, MapPin, FileText, TrendingUp, Users, Globe } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import JobCard from '@/components/JobCard';
import { useQuery } from '@tanstack/react-query';
import type { JobWithEmployer } from '@shared/schema';
import HeroCarousel from '@/components/HeroCarousel';
import constructionImage from '@assets/stock_images/construction_worker__0cdacec9.jpg';
import officeImage from '@assets/stock_images/professional_office__8f3db9b0.jpg';
import healthcareImage from '@assets/stock_images/nurse_healthcare_med_4e119dd6.jpg';
import engineerImage from '@assets/stock_images/engineer_technical_p_4ffc8c1a.jpg';
import hospitalityImage from '@assets/stock_images/hotel_staff_hospital_c26db125.jpg';

export default function Home() {
  const { t, lang } = useI18n();
  const [, setLocation] = useLocation();
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data: jobs, isLoading } = useQuery<JobWithEmployer[]>({
    queryKey: ['/api/jobs?limit=6&featured=true'],
  });

  const heroImages = [officeImage, constructionImage, healthcareImage, engineerImage, hospitalityImage];

  const categories = [
    { key: 'it', icon: Code, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100', image: engineerImage },
    { key: 'healthcare', icon: Heart, color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100', image: healthcareImage },
    { key: 'construction', icon: Building2, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100', image: constructionImage },
    { key: 'finance', icon: DollarSign, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100', image: officeImage },
    { key: 'sales', icon: Briefcase, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100', image: officeImage },
    { key: 'hospitality', icon: Hotel, color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-100', image: hospitalityImage },
    { key: 'engineering', icon: Building2, color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100', image: constructionImage },
    { key: 'education', icon: GraduationCap, color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100', image: officeImage },
  ];

  const quickFilters = [
    { label: t('country.ksa'), query: '?country=KSA' },
    { label: t('country.uae'), query: '?country=UAE' },
    { label: t('country.qat'), query: '?country=QAT' },
    { label: t('city.dubai'), query: '?city=Dubai' },
    { label: t('city.riyadh'), query: '?city=Riyadh' },
    { label: t('city.doha'), query: '?city=Doha' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      setLocation(`/jobs?keyword=${encodeURIComponent(searchKeyword)}`);
    } else {
      setLocation('/jobs');
    }
  };

  return (
    <div className="min-h-screen">
      <section
        className="relative text-primary-foreground py-24 md:py-40 overflow-hidden"
        data-testid="section-hero"
      >
        <HeroCarousel images={heroImages} interval={5000} />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60"></div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight" data-testid="text-hero-title">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/95 max-w-3xl mx-auto font-medium">
              {t('home.hero.subtitle')}
            </p>

            <form onSubmit={handleSearch} className="mt-10">
              <div className="flex gap-3 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t('home.hero.search')}
                    className="ps-12 h-14 bg-background text-foreground text-lg shadow-xl border-0"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    data-testid="input-search-hero"
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 px-8 text-lg shadow-xl" data-testid="button-search-hero">
                  {t('home.hero.searchBtn')}
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap gap-3 justify-center pt-6">
              {quickFilters.map((filter, idx) => (
                <Link key={idx} href={`/jobs${filter.query}`}>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover-elevate px-5 py-2.5 bg-background/20 backdrop-blur-sm text-primary-foreground border-primary-foreground/30 text-sm font-medium"
                    data-testid={`badge-filter-${idx}`}
                  >
                    {filter.label}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              {lang === 'ar' ? 'لماذا دول الخليج؟' : lang === 'fr' ? 'Pourquoi les pays du Golfe?' : 'Why Gulf Countries?'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {lang === 'ar' ? 'فرص استثنائية في اقتصادات سريعة النمو' : lang === 'fr' ? 'Opportunités exceptionnelles dans des économies en pleine croissance' : 'Exceptional opportunities in fast-growing economies'}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <Card className="hover-elevate text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">
                  {lang === 'ar' ? 'رواتب تنافسية' : lang === 'fr' ? 'Salaires compétitifs' : 'Competitive Salaries'}
                </h3>
                <p className="text-muted-foreground">
                  {lang === 'ar' ? 'رواتب معفاة من الضرائب مع حزم مزايا شاملة' : lang === 'fr' ? 'Salaires sans impôts avec des avantages complets' : 'Tax-free salaries with comprehensive benefit packages'}
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-accent">
                  {lang === 'ar' ? 'تطوير مهني' : lang === 'fr' ? 'Développement professionnel' : 'Career Growth'}
                </h3>
                <p className="text-muted-foreground">
                  {lang === 'ar' ? 'فرص تقدم وتطوير مهارات لا محدودة' : lang === 'fr' ? 'Opportunités d\'avancement et de développement illimitées' : 'Unlimited advancement and skill development opportunities'}
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">
                  {lang === 'ar' ? 'حياة عصرية' : lang === 'fr' ? 'Vie moderne' : 'Modern Lifestyle'}
                </h3>
                <p className="text-muted-foreground">
                  {lang === 'ar' ? 'بنية تحتية عالمية المستوى ونمط حياة متنوع' : lang === 'fr' ? 'Infrastructures de classe mondiale et mode de vie diversifié' : 'World-class infrastructure and diverse lifestyle'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/50" data-testid="section-categories">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-categories-title">
              {t('home.categories.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {lang === 'ar' ? 'استكشف الفرص في مختلف القطاعات' : lang === 'fr' ? 'Explorez les opportunités dans différents secteurs' : 'Explore opportunities across various sectors'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(({ key, icon: Icon, color, image }) => (
              <Link key={key} href={`/jobs?category=${key}`}>
                <Card className="hover-elevate cursor-pointer transition-all overflow-hidden h-full group" data-testid={`card-category-${key}`}>
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={image} 
                      alt={t(`category.${key}`)} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className={`absolute bottom-3 start-3 w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-center">{t(`category.${key}`)}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background" data-testid="section-cv-cta">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            {lang === 'ar' ? 'جاهز للبدء؟ أرسل سيرتك الذاتية الآن' : lang === 'fr' ? 'Prêt à commencer? Envoyez votre CV maintenant' : 'Ready to Start? Submit Your CV Now'}
          </h2>
          <Link href="/contact">
            <Button size="lg" className="gap-2 h-14 px-8 text-lg" data-testid="button-submit-cv-home">
              <FileText className="h-5 w-5" />
              {t('nav.submitCV')}
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10" data-testid="section-services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-services-title">
              {t('services.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FileCheck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t('services.admin.title')}</h3>
                <p className="text-muted-foreground">{t('services.admin.desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t('services.visa.title')}</h3>
                <p className="text-muted-foreground">{t('services.visa.desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t('services.relocation.title')}</h3>
                <p className="text-muted-foreground">{t('services.relocation.desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center">
                  <HomeIcon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">{t('services.housing.title')}</h3>
                <p className="text-muted-foreground">{t('services.housing.desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Plane className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">{t('services.flight.title')}</h3>
                <p className="text-muted-foreground">{t('services.flight.desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Shield className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">{t('services.guarantee.title')}</h3>
                <p className="text-muted-foreground">{t('services.guarantee.desc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background border-t" data-testid="section-jobs">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2" data-testid="text-featured-title">
                {t('home.featured.title')}
              </h2>
              <p className="text-muted-foreground">
                {lang === 'ar' ? 'أحدث الفرص المتاحة' : lang === 'fr' ? 'Dernières opportunités disponibles' : 'Latest opportunities available'}
              </p>
            </div>
            <Link href="/jobs">
              <Button variant="outline" size="lg" data-testid="button-view-all">
                {t('common.view')}
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-64 animate-pulse bg-muted" />
              ))}
            </div>
          ) : jobs && jobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {t('jobs.noResults')}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground border-t border-primary-foreground/10" data-testid="section-cta">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">{t('home.partner.text')}</h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {lang === 'ar' ? 'انضم إلى شبكتنا من أصحاب العمل الرائدين' : lang === 'fr' ? 'Rejoignez notre réseau d\'employeurs leaders' : 'Join our network of leading employers'}
          </p>
          <Link href="/hire-with-us">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg" data-testid="button-hire">
              {t('home.partner.btn')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
