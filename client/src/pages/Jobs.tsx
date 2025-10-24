import { useState, useMemo } from 'react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';
import JobCard from '@/components/JobCard';
import { useQuery } from '@tanstack/react-query';
import type { JobWithEmployer } from '@shared/schema';
import { useLocation } from 'wouter';

export default function Jobs() {
  const { t } = useI18n();
  const [location, setLocation] = useLocation();
  
  const searchParams = new URLSearchParams(window.location.search);
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [country, setCountry] = useState(searchParams.get('country') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [experience, setExperience] = useState(searchParams.get('experience') || '');
  const [contractType, setContractType] = useState(searchParams.get('contractType') || '');
  const [sortBy, setSortBy] = useState('recent');

  const { data: jobs, isLoading } = useQuery<JobWithEmployer[]>({
    queryKey: ['/api/jobs'],
  });

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    
    let filtered = jobs.filter(job => job.status === 'published');

    if (keyword) {
      const lower = keyword.toLowerCase();
      filtered = filtered.filter(job =>
        job.titleEn.toLowerCase().includes(lower) ||
        job.titleAr.toLowerCase().includes(lower) ||
        job.descriptionEn.toLowerCase().includes(lower) ||
        job.descriptionAr.toLowerCase().includes(lower)
      );
    }

    if (country) {
      filtered = filtered.filter(job => job.country === country);
    }

    if (city) {
      filtered = filtered.filter(job => job.city === city);
    }

    if (category) {
      filtered = filtered.filter(job => job.category.toLowerCase() === category.toLowerCase());
    }

    if (experience) {
      filtered = filtered.filter(job => job.experienceLevel === experience);
    }

    if (contractType) {
      filtered = filtered.filter(job => job.contractType === contractType);
    }

    if (sortBy === 'salary' && filtered.some(j => j.salaryMax)) {
      filtered.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
    } else {
      filtered.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    }

    return filtered;
  }, [jobs, keyword, country, city, category, experience, contractType, sortBy]);

  const resetFilters = () => {
    setKeyword('');
    setCountry('');
    setCity('');
    setCategory('');
    setExperience('');
    setContractType('');
    setLocation('/jobs');
  };

  const activeFiltersCount = [keyword, country, city, category, experience, contractType].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="keyword">{t('filter.keyword')}</Label>
        <Input
          id="keyword"
          type="search"
          placeholder={t('filter.keyword')}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          data-testid="input-filter-keyword"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">{t('filter.country')}</Label>
        <Select value={country || undefined} onValueChange={(value) => setCountry(value)}>
          <SelectTrigger id="country" data-testid="select-filter-country">
            <SelectValue placeholder={t('filter.country')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="KSA">{t('country.ksa')}</SelectItem>
            <SelectItem value="UAE">{t('country.uae')}</SelectItem>
            <SelectItem value="QAT">{t('country.qat')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">{t('filter.city')}</Label>
        <Select value={city || undefined} onValueChange={setCity}>
          <SelectTrigger id="city" data-testid="select-filter-city">
            <SelectValue placeholder={t('filter.city')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Riyadh">{t('city.riyadh')}</SelectItem>
            <SelectItem value="Jeddah">{t('city.jeddah')}</SelectItem>
            <SelectItem value="Dammam">{t('city.dammam')}</SelectItem>
            <SelectItem value="Dubai">{t('city.dubai')}</SelectItem>
            <SelectItem value="Abu Dhabi">{t('city.abudhabi')}</SelectItem>
            <SelectItem value="Doha">{t('city.doha')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">{t('filter.category')}</Label>
        <Select value={category || undefined} onValueChange={setCategory}>
          <SelectTrigger id="category" data-testid="select-filter-category">
            <SelectValue placeholder={t('filter.category')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="it">{t('category.it')}</SelectItem>
            <SelectItem value="healthcare">{t('category.healthcare')}</SelectItem>
            <SelectItem value="construction">{t('category.construction')}</SelectItem>
            <SelectItem value="finance">{t('category.finance')}</SelectItem>
            <SelectItem value="sales">{t('category.sales')}</SelectItem>
            <SelectItem value="hospitality">{t('category.hospitality')}</SelectItem>
            <SelectItem value="engineering">{t('category.engineering')}</SelectItem>
            <SelectItem value="education">{t('category.education')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">{t('filter.experience')}</Label>
        <Select value={experience || undefined} onValueChange={setExperience}>
          <SelectTrigger id="experience" data-testid="select-filter-experience">
            <SelectValue placeholder={t('filter.experience')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-1">{t('filter.exp.01')}</SelectItem>
            <SelectItem value="2-4">{t('filter.exp.24')}</SelectItem>
            <SelectItem value="5-7">{t('filter.exp.57')}</SelectItem>
            <SelectItem value="8+">{t('filter.exp.8plus')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contract">{t('filter.contract')}</Label>
        <Select value={contractType || undefined} onValueChange={setContractType}>
          <SelectTrigger id="contract" data-testid="select-filter-contract">
            <SelectValue placeholder={t('filter.contract')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full-time">{t('filter.contract.fulltime')}</SelectItem>
            <SelectItem value="Part-time">{t('filter.contract.parttime')}</SelectItem>
            <SelectItem value="Contract">{t('filter.contract.contract')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={resetFilters}
        data-testid="button-reset-filters"
      >
        <X className="h-4 w-4 me-2" />
        {t('jobs.reset')}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4" data-testid="text-jobs-title">{t('jobs.title')}</h1>
          <p className="text-muted-foreground">
            {filteredJobs.length} {t('jobs.results')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">{t('jobs.filter')}</h2>
                <FilterContent />
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden" data-testid="button-filter-mobile">
                    <Filter className="h-4 w-4 me-2" />
                    {t('jobs.filter')}
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ms-2">{activeFiltersCount}</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>{t('jobs.filter')}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2">
                <Label htmlFor="sort" className="text-sm">{t('jobs.sortBy')}</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort" className="w-40" data-testid="select-sort">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">{t('jobs.sort.recent')}</SelectItem>
                    <SelectItem value="salary">{t('jobs.sort.salary')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {keyword && (
                  <Badge variant="secondary" className="gap-1">
                    {keyword}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setKeyword('')} />
                  </Badge>
                )}
                {country && (
                  <Badge variant="secondary" className="gap-1">
                    {t(`country.${country.toLowerCase()}`)}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setCountry('')} />
                  </Badge>
                )}
                {city && (
                  <Badge variant="secondary" className="gap-1">
                    {city}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setCity('')} />
                  </Badge>
                )}
                {category && (
                  <Badge variant="secondary" className="gap-1">
                    {t(`category.${category}`)}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setCategory('')} />
                  </Badge>
                )}
              </div>
            )}

            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="h-64 animate-pulse bg-muted" />
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">{t('jobs.noResults')}</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={resetFilters}
                    data-testid="button-reset"
                  >
                    {t('jobs.reset')}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
