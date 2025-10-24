import { useI18n } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, TrendingUp, Award } from 'lucide-react';

export default function About() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-about-title">
            {t('nav.about')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('footer.about')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Our Mission</h2>
                <p className="text-muted-foreground">
                  To bridge the gap between talented professionals from North Africa and exceptional career opportunities in the Gulf region, creating mutually beneficial connections that drive growth and success.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Who We Serve</h2>
                <p className="text-muted-foreground">
                  We specialize in connecting candidates from Tunisia, Morocco, and Algeria with leading employers in Saudi Arabia, UAE, and Qatar across various industries including IT, healthcare, construction, and finance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Our Process</h2>
                <p className="text-muted-foreground">
                  We carefully vet all job postings and employers to ensure quality opportunities. Our streamlined application process, combined with WhatsApp integration, makes it easy for candidates to connect with employers quickly and efficiently.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Our Commitment</h2>
                <p className="text-muted-foreground">
                  We provide comprehensive support throughout the hiring process, including visa sponsorship coordination, relocation assistance, and ongoing career guidance. Our service is completely free for job seekers.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Why Choose BENO Consulting</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Expertise:</strong> With years of experience in Gulf recruitment, we understand the unique requirements and cultural nuances of both employers and candidates.
                </p>
                <p>
                  <strong className="text-foreground">Quality:</strong> We maintain high standards by thoroughly screening all job postings and providing verified employer information.
                </p>
                <p>
                  <strong className="text-foreground">Support:</strong> From initial application to final placement, we're with you every step of the way, offering guidance on visa processes, relocation, and career development.
                </p>
                <p>
                  <strong className="text-foreground">Technology:</strong> Our platform makes job searching simple with advanced filters, multilingual support (Arabic/English), and WhatsApp integration for instant communication.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
