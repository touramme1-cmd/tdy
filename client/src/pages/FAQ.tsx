import { useI18n } from '@/lib/i18n';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

export default function FAQ() {
  const { t } = useI18n();

  const faqs = [
    {
      question: 'How do I apply for a job?',
      answer: 'You can apply directly through our website by clicking the "Apply" button on any job listing. Alternatively, you can use the WhatsApp button to connect directly with the employer.',
    },
    {
      question: 'Is your service free for candidates?',
      answer: 'Yes, all our services are completely free for job seekers. We never charge candidates for job placements or applications.',
    },
    {
      question: 'How long does the hiring process take?',
      answer: 'The typical hiring process takes 2-4 weeks from application to offer. However, this can vary depending on the employer and position.',
    },
    {
      question: 'Do you help with visa sponsorship?',
      answer: 'Many of our employers offer visa sponsorship. Jobs with visa sponsorship are clearly marked with a "Visa Sponsor" badge. We also provide guidance throughout the visa application process.',
    },
    {
      question: 'What documents do I need to apply?',
      answer: 'Typically, you need an updated CV/resume, relevant certifications or degrees, and sometimes a cover letter. Specific requirements are listed in each job posting.',
    },
    {
      question: 'Can I apply if I\'m from a country other than Tunisia, Morocco, or Algeria?',
      answer: 'While we specialize in connecting North African candidates with Gulf opportunities, some employers may consider candidates from other regions. Please check individual job requirements.',
    },
    {
      question: 'How do I know if an employer offers housing?',
      answer: 'Jobs that include housing are marked with a "Housing" badge. Additional details about accommodation are provided in the job description.',
    },
    {
      question: 'What is the typical salary range in Gulf countries?',
      answer: 'Salaries vary by industry, experience level, and location. Each job posting includes a salary range or indicates that it\'s negotiable. The Gulf region typically offers tax-free salaries.',
    },
    {
      question: 'How can I improve my chances of getting hired?',
      answer: 'Ensure your CV is updated and tailored to the position, respond promptly to employer communications, highlight relevant experience, and be professional in all interactions.',
    },
    {
      question: 'What if I have questions about a specific job?',
      answer: 'You can contact the employer directly via WhatsApp (available on each job posting) or reach out to us through our contact form for general inquiries.',
    },
    {
      question: 'Do you provide relocation assistance?',
      answer: 'Many employers offer relocation packages, which are indicated in the job posting. We also provide guidance on the relocation process.',
    },
    {
      question: 'How do I subscribe to job alerts?',
      answer: 'Visit our "Coming Soon" page to subscribe to email and WhatsApp job alerts. You\'ll be notified when new jobs matching your preferences are posted.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-faq-title">
            {t('nav.faq')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Still have questions?{' '}
              <a href="/contact" className="text-primary hover:underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
