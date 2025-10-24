import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar' | 'fr';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'nav.jobs': 'Jobs',
    'nav.about': 'About',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.hire': 'Hire with Us',
    'nav.comingSoon': 'Coming Soon',
    'nav.submitCV': 'Contact Us',
    
    // Home
    'home.hero.title': 'Your Career in the Gulf',
    'home.hero.subtitle': 'Find exceptional job opportunities in Saudi Arabia, UAE, and Qatar',
    'home.hero.search': 'Search jobs by title or keyword...',
    'home.hero.category': 'All Categories',
    'home.hero.country': 'All Countries',
    'home.hero.city': 'All Cities',
    'home.hero.searchBtn': 'Search Jobs',
    'home.categories.title': 'Browse by Category',
    'home.recent.title': 'Recent Opportunities',
    'home.featured.title': 'Featured Jobs',
    'home.partner.text': 'We recruit for the MENA region',
    'home.partner.btn': 'Post a Job',
    
    // Services Section
    'services.title': 'Your Complete Relocation Partner',
    'services.subtitle': 'We handle everything from job search to settling in your new country',
    'services.admin.title': 'Administrative Support',
    'services.admin.desc': 'Complete administrative handling from job search to contract signing',
    'services.visa.title': 'Visa Processing',
    'services.visa.desc': 'Full visa application support and processing',
    'services.relocation.title': 'Relocation Assistance',
    'services.relocation.desc': 'Professional support for your move to the Gulf',
    'services.housing.title': '1 Month Housing',
    'services.housing.desc': 'We cover your accommodation for the first month while you find your home',
    'services.flight.title': 'Annual Return Ticket',
    'services.flight.desc': 'We guarantee one annual return ticket to your home country, negotiated with your employer',
    'services.guarantee.title': 'Our Guarantees',
    'services.guarantee.desc': 'Professional support at every step of your journey',
    
    // Countries & Cities
    'country.ksa': 'Saudi Arabia',
    'country.uae': 'United Arab Emirates',
    'country.qat': 'Qatar',
    'city.riyadh': 'Riyadh',
    'city.jeddah': 'Jeddah',
    'city.dammam': 'Dammam',
    'city.dubai': 'Dubai',
    'city.abudhabi': 'Abu Dhabi',
    'city.doha': 'Doha',
    
    // Categories
    'category.it': 'IT & Technology',
    'category.healthcare': 'Healthcare',
    'category.construction': 'Construction',
    'category.finance': 'Finance',
    'category.sales': 'Sales',
    'category.hospitality': 'Hospitality',
    'category.engineering': 'Engineering',
    'category.education': 'Education',
    
    // Job badges
    'badge.urgent': 'Urgent',
    'badge.visa': 'Visa Sponsor',
    'badge.housing': 'Housing',
    'badge.relocation': 'Relocation',
    'badge.remote': 'Remote',
    'badge.featured': 'Featured',
    
    // Job listing
    'jobs.title': 'Available Positions',
    'jobs.results': 'positions found',
    'jobs.filter': 'Filter Jobs',
    'jobs.sortBy': 'Sort by:',
    'jobs.sort.recent': 'Most Recent',
    'jobs.sort.salary': 'Highest Salary',
    'jobs.reset': 'Reset Filters',
    'jobs.apply': 'Apply',
    'jobs.noResults': 'No jobs found matching your criteria',
    'jobs.loadMore': 'Load More',
    
    // Job detail
    'job.applyNow': 'Apply Now',
    'job.applyWhatsapp': 'Apply on WhatsApp',
    'job.save': 'Save Job',
    'job.share': 'Share',
    'job.postedOn': 'Posted on',
    'job.expiresOn': 'Expires on',
    'job.description': 'Job Description',
    'job.responsibilities': 'Responsibilities',
    'job.requirements': 'Requirements',
    'job.salary': 'Salary & Benefits',
    'job.visaRelocation': 'Visa & Relocation',
    'job.aboutEmployer': 'About the Employer',
    'job.similarJobs': 'Similar Opportunities',
    'job.moreFromEmployer': 'More from this employer',
    
    // Filters
    'filter.keyword': 'Keyword',
    'filter.country': 'Country',
    'filter.city': 'City',
    'filter.category': 'Category',
    'filter.experience': 'Experience Level',
    'filter.exp.01': '0-1 years',
    'filter.exp.24': '2-4 years',
    'filter.exp.57': '5-7 years',
    'filter.exp.8plus': '8+ years',
    'filter.contract': 'Contract Type',
    'filter.contract.fulltime': 'Full-time',
    'filter.contract.parttime': 'Part-time',
    'filter.contract.contract': 'Contract',
    'filter.salary': 'Salary Range',
    'filter.origin': 'Candidate Origin',
    'filter.posted': 'Posted Within',
    'filter.posted.7': 'Last 7 days',
    'filter.posted.14': 'Last 14 days',
    'filter.posted.30': 'Last 30 days',
    
    // Apply form
    'apply.title': 'Apply for this Position',
    'apply.name': 'Full Name',
    'apply.email': 'Email Address',
    'apply.phone': 'WhatsApp / Phone',
    'apply.origin': 'Country of Origin',
    'apply.cv': 'Upload CV (PDF)',
    'apply.message': 'Cover Letter (Optional)',
    'apply.submit': 'Submit Application',
    'apply.success': 'Application submitted successfully!',
    'apply.error': 'Failed to submit application',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Have questions? We\'re here to help',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.phone': 'WhatsApp / Phone',
    'contact.country': 'Country',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell us about your inquiry, question, or how we can help you...',
    'contact.attach': 'Attach CV (Optional)',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Failed to send message',
    'contact.info': 'Contact Information',
    
    // Employer form
    'employer.title': 'Post a Job Opportunity',
    'employer.subtitle': 'Find top talent for your organization',
    'employer.company': 'Company Name',
    'employer.email': 'Email',
    'employer.whatsapp': 'WhatsApp Number',
    'employer.country': 'Country',
    'employer.city': 'City',
    'employer.position': 'Position Title',
    'employer.salary': 'Salary Range',
    'employer.benefits': 'Benefits',
    'employer.description': 'Job Description',
    'employer.requirements': 'Requirements',
    'employer.deadline': 'Application Deadline',
    'employer.visa': 'Visa Sponsorship Available',
    'employer.submit': 'Submit Job',
    'employer.success': 'Job submission received! We\'ll review and contact you soon.',
    'employer.error': 'Failed to submit job',
    
    // Coming soon
    'coming.title': 'Upcoming Opportunities',
    'coming.subtitle': 'Be the first to know about new positions',
    'coming.email': 'Your Email',
    'coming.subscribe': 'Subscribe to Alerts',
    'coming.success': 'Subscribed successfully!',
    
    // Footer
    'footer.about': 'BENO Consulting connects talented professionals from North Africa with leading companies in the Gulf region.',
    'footer.quick': 'Quick Links',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.rights': 'All rights reserved',
    
    // WhatsApp
    'whatsapp.chat': 'Chat on WhatsApp',
    'whatsapp.interested': "I'm interested in:",
    
    // Why Gulf Section
    'why.title': 'Why Gulf Countries?',
    'why.subtitle': 'Exceptional opportunities in fast-growing economies',
    'why.salary.title': 'Competitive Salaries',
    'why.salary.desc': 'Tax-free salaries with comprehensive benefit packages',
    'why.growth.title': 'Career Growth',
    'why.growth.desc': 'Unlimited advancement and skill development opportunities',
    'why.lifestyle.title': 'Modern Lifestyle',
    'why.lifestyle.desc': 'World-class infrastructure and diverse lifestyle',
    
    // Categories Section
    'home.categories.subtitle': 'Explore opportunities across various sectors',
    'home.submitCV.title': 'Ready to Start? Submit Your CV Now',
    'home.featured.subtitle': 'Latest opportunities available',
    'home.partner.subtitle': 'Join our network of leading employers',
    
    // About Page
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To bridge the gap between talented professionals from North Africa and exceptional career opportunities in the Gulf region, creating mutually beneficial connections that drive growth and success.',
    'about.serve.title': 'Who We Serve',
    'about.serve.desc': 'We specialize in connecting candidates from Tunisia, Morocco, and Algeria with leading employers in Saudi Arabia, UAE, and Qatar across various industries including IT, healthcare, construction, and finance.',
    'about.process.title': 'Our Process',
    'about.process.desc': 'We carefully vet all job postings and employers to ensure quality opportunities. Our streamlined application process, combined with WhatsApp integration, makes it easy for candidates to connect with employers quickly and efficiently.',
    'about.commitment.title': 'Our Commitment',
    'about.commitment.desc': 'We provide comprehensive support throughout the hiring process, including visa sponsorship coordination, relocation assistance, and ongoing career guidance. Our service is completely free for job seekers.',
    'about.why.title': 'Why Choose BENO Consulting',
    'about.why.expertise': 'Expertise:',
    'about.why.expertise.desc': 'With years of experience in Gulf recruitment, we understand the unique requirements and cultural nuances of both employers and candidates.',
    'about.why.quality': 'Quality:',
    'about.why.quality.desc': 'We maintain high standards by thoroughly screening all job postings and providing verified employer information.',
    'about.why.support': 'Support:',
    'about.why.support.desc': 'From initial application to final placement, we\'re with you every step of the way, offering guidance on visa processes, relocation, and career development.',
    'about.why.technology': 'Technology:',
    'about.why.technology.desc': 'Our platform makes job searching simple with advanced filters, multilingual support (Arabic/English/French), and WhatsApp integration for instant communication.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Try Again',
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View Details',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.reset': 'Reset',
    'common.apply': 'Apply',
  },
  ar: {
    // Header
    'nav.jobs': 'الوظائف',
    'nav.about': 'من نحن',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.contact': 'اتصل بنا',
    'nav.hire': 'وظف معنا',
    'nav.comingSoon': 'قريباً',
    'nav.submitCV': 'اتصل بنا',
    
    // Home
    'home.hero.title': 'مسيرتك المهنية في الخليج',
    'home.hero.subtitle': 'اعثر على فرص عمل استثنائية في السعودية والإمارات وقطر',
    'home.hero.search': 'ابحث عن الوظائف بالعنوان أو الكلمة المفتاحية...',
    'home.hero.category': 'جميع الفئات',
    'home.hero.country': 'جميع الدول',
    'home.hero.city': 'جميع المدن',
    'home.hero.searchBtn': 'بحث عن الوظائف',
    'home.categories.title': 'تصفح حسب الفئة',
    'home.recent.title': 'الفرص الأخيرة',
    'home.featured.title': 'الوظائف المميزة',
    'home.partner.text': 'نحن نوظف لمنطقة الشرق الأوسط وشمال أفريقيا',
    'home.partner.btn': 'انشر وظيفة',
    
    // Services Section
    'services.title': 'شريكك الكامل للانتقال',
    'services.subtitle': 'نتولى كل شيء من البحث عن وظيفة إلى الاستقرار في بلدك الجديد',
    'services.admin.title': 'الدعم الإداري',
    'services.admin.desc': 'إدارة إدارية كاملة من البحث عن الوظيفة إلى توقيع العقد',
    'services.visa.title': 'معالجة التأشيرة',
    'services.visa.desc': 'دعم كامل لتقديم ومعالجة التأشيرة',
    'services.relocation.title': 'المساعدة في الانتقال',
    'services.relocation.desc': 'دعم احترافي لانتقالك إلى الخليج',
    'services.housing.title': 'سكن لشهر واحد',
    'services.housing.desc': 'نغطي سكنك للشهر الأول بينما تجد منزلك',
    'services.flight.title': 'تذكرة عودة سنوية',
    'services.flight.desc': 'نضمن تذكرة عودة سنوية واحدة إلى بلدك، يتم التفاوض عليها مع صاحب العمل',
    'services.guarantee.title': 'ضماناتنا',
    'services.guarantee.desc': 'دعم احترافي في كل خطوة من رحلتك',
    
    // Countries & Cities
    'country.ksa': 'المملكة العربية السعودية',
    'country.uae': 'الإمارات العربية المتحدة',
    'country.qat': 'قطر',
    'city.riyadh': 'الرياض',
    'city.jeddah': 'جدة',
    'city.dammam': 'الدمام',
    'city.dubai': 'دبي',
    'city.abudhabi': 'أبوظبي',
    'city.doha': 'الدوحة',
    
    // Categories
    'category.it': 'تكنولوجيا المعلومات',
    'category.healthcare': 'الرعاية الصحية',
    'category.construction': 'البناء',
    'category.finance': 'المالية',
    'category.sales': 'المبيعات',
    'category.hospitality': 'الضيافة',
    'category.engineering': 'الهندسة',
    'category.education': 'التعليم',
    
    // Job badges
    'badge.urgent': 'عاجل',
    'badge.visa': 'رعاية تأشيرة',
    'badge.housing': 'سكن',
    'badge.relocation': 'نقل',
    'badge.remote': 'عن بعد',
    'badge.featured': 'مميز',
    
    // Job listing
    'jobs.title': 'الوظائف المتاحة',
    'jobs.results': 'وظيفة',
    'jobs.filter': 'تصفية الوظائف',
    'jobs.sortBy': 'ترتيب حسب:',
    'jobs.sort.recent': 'الأحدث',
    'jobs.sort.salary': 'أعلى راتب',
    'jobs.reset': 'إعادة تعيين الفلاتر',
    'jobs.apply': 'قدّم',
    'jobs.noResults': 'لا توجد وظائف مطابقة لمعاييرك',
    'jobs.loadMore': 'تحميل المزيد',
    
    // Job detail
    'job.applyNow': 'قدّم الآن',
    'job.applyWhatsapp': 'قدّم عبر واتساب',
    'job.save': 'حفظ الوظيفة',
    'job.share': 'مشاركة',
    'job.postedOn': 'نُشرت في',
    'job.expiresOn': 'تنتهي في',
    'job.description': 'وصف الوظيفة',
    'job.responsibilities': 'المسؤوليات',
    'job.requirements': 'المتطلبات',
    'job.salary': 'الراتب والمزايا',
    'job.visaRelocation': 'التأشيرة والنقل',
    'job.aboutEmployer': 'عن صاحب العمل',
    'job.similarJobs': 'فرص مماثلة',
    'job.moreFromEmployer': 'المزيد من هذا صاحب العمل',
    
    // Filters
    'filter.keyword': 'الكلمة المفتاحية',
    'filter.country': 'الدولة',
    'filter.city': 'المدينة',
    'filter.category': 'الفئة',
    'filter.experience': 'مستوى الخبرة',
    'filter.exp.01': '0-1 سنة',
    'filter.exp.24': '2-4 سنوات',
    'filter.exp.57': '5-7 سنوات',
    'filter.exp.8plus': '8+ سنوات',
    'filter.contract': 'نوع العقد',
    'filter.contract.fulltime': 'دوام كامل',
    'filter.contract.parttime': 'دوام جزئي',
    'filter.contract.contract': 'عقد',
    'filter.salary': 'نطاق الراتب',
    'filter.origin': 'بلد المرشح',
    'filter.posted': 'نُشرت خلال',
    'filter.posted.7': 'آخر 7 أيام',
    'filter.posted.14': 'آخر 14 يوم',
    'filter.posted.30': 'آخر 30 يوم',
    
    // Apply form
    'apply.title': 'تقدم لهذه الوظيفة',
    'apply.name': 'الاسم الكامل',
    'apply.email': 'البريد الإلكتروني',
    'apply.phone': 'واتساب / الهاتف',
    'apply.origin': 'بلد المنشأ',
    'apply.cv': 'رفع السيرة الذاتية (PDF)',
    'apply.message': 'رسالة تعريفية (اختياري)',
    'apply.submit': 'إرسال الطلب',
    'apply.success': 'تم إرسال طلبك بنجاح!',
    'apply.error': 'فشل إرسال الطلب',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'لديك أسئلة؟ نحن هنا للمساعدة',
    'contact.name': 'اسمك',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'واتساب / الهاتف',
    'contact.country': 'البلد',
    'contact.subject': 'الموضوع',
    'contact.message': 'الرسالة',
    'contact.messagePlaceholder': 'أخبرنا عن استفسارك أو سؤالك أو كيف يمكننا مساعدتك...',
    'contact.attach': 'إرفاق السيرة الذاتية (اختياري)',
    'contact.send': 'إرسال الرسالة',
    'contact.success': 'تم إرسال الرسالة بنجاح!',
    'contact.error': 'فشل إرسال الرسالة',
    'contact.info': 'معلومات الاتصال',
    
    // Employer form
    'employer.title': 'انشر فرصة عمل',
    'employer.subtitle': 'ابحث عن أفضل المواهب لمؤسستك',
    'employer.company': 'اسم الشركة',
    'employer.email': 'البريد الإلكتروني',
    'employer.whatsapp': 'رقم واتساب',
    'employer.country': 'الدولة',
    'employer.city': 'المدينة',
    'employer.position': 'المسمى الوظيفي',
    'employer.salary': 'نطاق الراتب',
    'employer.benefits': 'المزايا',
    'employer.description': 'وصف الوظيفة',
    'employer.requirements': 'المتطلبات',
    'employer.deadline': 'الموعد النهائي للتقديم',
    'employer.visa': 'رعاية تأشيرة متاحة',
    'employer.submit': 'إرسال الوظيفة',
    'employer.success': 'تم استلام طلبك! سنراجعه ونتواصل معك قريباً.',
    'employer.error': 'فشل إرسال الوظيفة',
    
    // Coming soon
    'coming.title': 'الفرص القادمة',
    'coming.subtitle': 'كن أول من يعرف عن الوظائف الجديدة',
    'coming.email': 'بريدك الإلكتروني',
    'coming.subscribe': 'اشترك في التنبيهات',
    'coming.success': 'تم الاشتراك بنجاح!',
    
    // Footer
    'footer.about': 'بينو كونسلتينج تربط المهنيين الموهوبين من شمال أفريقيا مع الشركات الرائدة في منطقة الخليج.',
    'footer.quick': 'روابط سريعة',
    'footer.legal': 'قانوني',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.cookies': 'سياسة الكوكيز',
    'footer.rights': 'جميع الحقوق محفوظة',
    
    // WhatsApp
    'whatsapp.chat': 'دردش على واتساب',
    'whatsapp.interested': 'أنا مهتم بـ:',
    
    // Why Gulf Section
    'why.title': 'لماذا دول الخليج؟',
    'why.subtitle': 'فرص استثنائية في اقتصادات سريعة النمو',
    'why.salary.title': 'رواتب تنافسية',
    'why.salary.desc': 'رواتب معفاة من الضرائب مع حزم مزايا شاملة',
    'why.growth.title': 'تطوير مهني',
    'why.growth.desc': 'فرص تقدم وتطوير مهارات لا محدودة',
    'why.lifestyle.title': 'حياة عصرية',
    'why.lifestyle.desc': 'بنية تحتية عالمية المستوى ونمط حياة متنوع',
    
    // Categories Section
    'home.categories.subtitle': 'استكشف الفرص في مختلف القطاعات',
    'home.submitCV.title': 'جاهز للبدء؟ أرسل سيرتك الذاتية الآن',
    'home.featured.subtitle': 'أحدث الفرص المتاحة',
    'home.partner.subtitle': 'انضم إلى شبكتنا من أصحاب العمل الرائدين',
    
    // About Page
    'about.mission.title': 'مهمتنا',
    'about.mission.desc': 'سد الفجوة بين المهنيين الموهوبين من شمال أفريقيا والفرص الوظيفية الاستثنائية في منطقة الخليج، وإنشاء اتصالات مفيدة للطرفين تدفع النمو والنجاح.',
    'about.serve.title': 'من نخدم',
    'about.serve.desc': 'نحن متخصصون في ربط المرشحين من تونس والمغرب والجزائر مع أصحاب العمل الرائدين في المملكة العربية السعودية والإمارات وقطر عبر مختلف الصناعات بما في ذلك تكنولوجيا المعلومات والرعاية الصحية والبناء والمالية.',
    'about.process.title': 'عمليتنا',
    'about.process.desc': 'نفحص بعناية جميع إعلانات الوظائف وأصحاب العمل لضمان فرص عالية الجودة. عملية التقديم المبسطة لدينا، جنبًا إلى جنب مع تكامل واتساب، تجعل من السهل على المرشحين التواصل مع أصحاب العمل بسرعة وكفاءة.',
    'about.commitment.title': 'التزامنا',
    'about.commitment.desc': 'نقدم دعمًا شاملاً طوال عملية التوظيف، بما في ذلك تنسيق رعاية التأشيرة والمساعدة في الانتقال والتوجيه المهني المستمر. خدمتنا مجانية تمامًا للباحثين عن عمل.',
    'about.why.title': 'لماذا تختار بينو كونسلتينج',
    'about.why.expertise': 'الخبرة:',
    'about.why.expertise.desc': 'مع سنوات من الخبرة في توظيف الخليج، نفهم المتطلبات الفريدة والفروق الثقافية الدقيقة لكل من أصحاب العمل والمرشحين.',
    'about.why.quality': 'الجودة:',
    'about.why.quality.desc': 'نحافظ على معايير عالية من خلال فحص شامل لجميع إعلانات الوظائف وتوفير معلومات موثوقة عن أصحاب العمل.',
    'about.why.support': 'الدعم:',
    'about.why.support.desc': 'من التقديم الأولي إلى التعيين النهائي، نحن معك في كل خطوة، نقدم التوجيه حول عمليات التأشيرة والانتقال والتطوير المهني.',
    'about.why.technology': 'التكنولوجيا:',
    'about.why.technology.desc': 'منصتنا تجعل البحث عن وظيفة بسيطًا مع فلاتر متقدمة ودعم متعدد اللغات (العربية/الإنجليزية/الفرنسية) وتكامل واتساب للتواصل الفوري.',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ ما',
    'common.retry': 'حاول مرة أخرى',
    'common.close': 'إغلاق',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض التفاصيل',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.reset': 'إعادة تعيين',
    'common.apply': 'تطبيق',
  },
  fr: {
    // Header
    'nav.jobs': 'Emplois',
    'nav.about': 'À propos',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.hire': 'Recruter avec nous',
    'nav.comingSoon': 'Bientôt',
    'nav.submitCV': 'Nous contacter',
    
    // Home
    'home.hero.title': 'Votre carrière dans le Golfe',
    'home.hero.subtitle': 'Trouvez des opportunités d\'emploi exceptionnelles en Arabie Saoudite, aux EAU et au Qatar',
    'home.hero.search': 'Rechercher des emplois par titre ou mot-clé...',
    'home.hero.category': 'Toutes les catégories',
    'home.hero.country': 'Tous les pays',
    'home.hero.city': 'Toutes les villes',
    'home.hero.searchBtn': 'Rechercher',
    'home.categories.title': 'Parcourir par catégorie',
    'home.recent.title': 'Opportunités récentes',
    'home.featured.title': 'Emplois en vedette',
    'home.partner.text': 'Nous recrutons pour la région MENA',
    'home.partner.btn': 'Publier une offre',
    
    // Services Section
    'services.title': 'Votre partenaire complet pour la relocalisation',
    'services.subtitle': 'Nous gérons tout, de la recherche d\'emploi à votre installation dans le nouveau pays',
    'services.admin.title': 'Accompagnement administratif',
    'services.admin.desc': 'Prise en charge complète des démarches de la recherche d\'emploi à la signature du contrat',
    'services.visa.title': 'Traitement du visa',
    'services.visa.desc': 'Support complet pour la demande et le traitement de votre visa',
    'services.relocation.title': 'Assistance au déménagement',
    'services.relocation.desc': 'Support professionnel pour votre déménagement vers le Golfe',
    'services.housing.title': 'Logement 1 mois',
    'services.housing.desc': 'Nous prenons en charge votre logement pendant le premier mois le temps de trouver votre chez-vous',
    'services.flight.title': 'Billet de retour annuel',
    'services.flight.desc': 'Nous garantissons un billet de retour annuel vers votre pays d\'origine, négocié avec votre employeur',
    'services.guarantee.title': 'Nos garanties',
    'services.guarantee.desc': 'Un accompagnement professionnel à chaque étape de votre parcours',
    
    // Countries & Cities
    'country.ksa': 'Arabie Saoudite',
    'country.uae': 'Émirats Arabes Unis',
    'country.qat': 'Qatar',
    'city.riyadh': 'Riyad',
    'city.jeddah': 'Djeddah',
    'city.dammam': 'Dammam',
    'city.dubai': 'Dubaï',
    'city.abudhabi': 'Abu Dhabi',
    'city.doha': 'Doha',
    
    // Categories
    'category.it': 'IT & Technologie',
    'category.healthcare': 'Santé',
    'category.construction': 'Construction',
    'category.finance': 'Finance',
    'category.sales': 'Ventes',
    'category.hospitality': 'Hôtellerie',
    'category.engineering': 'Ingénierie',
    'category.education': 'Éducation',
    
    // Job badges
    'badge.urgent': 'Urgent',
    'badge.visa': 'Visa sponsorisé',
    'badge.housing': 'Logement',
    'badge.relocation': 'Relocalisation',
    'badge.remote': 'Télétravail',
    'badge.featured': 'En vedette',
    
    // Job listing
    'jobs.title': 'Postes disponibles',
    'jobs.results': 'postes trouvés',
    'jobs.filter': 'Filtrer les emplois',
    'jobs.sortBy': 'Trier par:',
    'jobs.sort.recent': 'Plus récents',
    'jobs.sort.salary': 'Salaire le plus élevé',
    'jobs.reset': 'Réinitialiser les filtres',
    'jobs.apply': 'Postuler',
    'jobs.noResults': 'Aucun emploi ne correspond à vos critères',
    'jobs.loadMore': 'Charger plus',
    
    // Job detail
    'job.applyNow': 'Postuler maintenant',
    'job.applyWhatsapp': 'Postuler via WhatsApp',
    'job.save': 'Sauvegarder',
    'job.share': 'Partager',
    'job.postedOn': 'Publié le',
    'job.expiresOn': 'Expire le',
    'job.description': 'Description du poste',
    'job.responsibilities': 'Responsabilités',
    'job.requirements': 'Exigences',
    'job.salary': 'Salaire et avantages',
    'job.visaRelocation': 'Visa et relocalisation',
    'job.aboutEmployer': 'À propos de l\'employeur',
    'job.similarJobs': 'Emplois similaires',
    'job.moreFromEmployer': 'Plus de cet employeur',
    
    // Filters
    'filter.keyword': 'Mot-clé',
    'filter.country': 'Pays',
    'filter.city': 'Ville',
    'filter.category': 'Catégorie',
    'filter.experience': 'Niveau d\'expérience',
    'filter.exp.01': '0-1 an',
    'filter.exp.24': '2-4 ans',
    'filter.exp.57': '5-7 ans',
    'filter.exp.8plus': '8+ ans',
    'filter.contract': 'Type de contrat',
    'filter.contract.fulltime': 'Temps plein',
    'filter.contract.parttime': 'Temps partiel',
    'filter.contract.contract': 'Contrat',
    'filter.salary': 'Fourchette de salaire',
    'filter.origin': 'Pays du candidat',
    'filter.posted': 'Publié dans les',
    'filter.posted.7': '7 derniers jours',
    'filter.posted.14': '14 derniers jours',
    'filter.posted.30': '30 derniers jours',
    
    // Apply form
    'apply.title': 'Postuler à cette offre',
    'apply.name': 'Nom complet',
    'apply.email': 'Email',
    'apply.phone': 'WhatsApp / Téléphone',
    'apply.origin': 'Pays d\'origine',
    'apply.cv': 'Télécharger votre CV (PDF)',
    'apply.message': 'Lettre de motivation (optionnel)',
    'apply.submit': 'Envoyer ma candidature',
    'apply.success': 'Votre candidature a été envoyée avec succès!',
    'apply.error': 'Échec de l\'envoi de la candidature',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Des questions? Nous sommes là pour vous aider',
    'contact.name': 'Votre nom',
    'contact.email': 'Email',
    'contact.phone': 'WhatsApp / Téléphone',
    'contact.country': 'Pays',
    'contact.subject': 'Sujet',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Parlez-nous de votre demande, question ou comment nous pouvons vous aider...',
    'contact.attach': 'Joindre CV (optionnel)',
    'contact.send': 'Envoyer le message',
    'contact.success': 'Message envoyé avec succès!',
    'contact.error': 'Échec de l\'envoi du message',
    'contact.info': 'Informations de contact',
    
    // About
    'about.title': 'À propos de BENO Consulting',
    'about.mission': 'Notre mission',
    'about.vision': 'Notre vision',
    'about.values': 'Nos valeurs',
    
    // FAQ
    'faq.title': 'Questions fréquemment posées',
    'faq.question': 'Question',
    'faq.answer': 'Réponse',
    
    // Employer
    'employer.title': 'Publier une offre d\'emploi',
    'employer.subtitle': 'Trouvez les meilleurs talents pour votre entreprise',
    'employer.company': 'Nom de l\'entreprise',
    'employer.email': 'Email professionnel',
    'employer.whatsapp': 'Numéro WhatsApp',
    'employer.country': 'Pays',
    'employer.city': 'Ville',
    'employer.position': 'Titre du poste',
    'employer.salary': 'Fourchette de salaire',
    'employer.benefits': 'Avantages',
    'employer.description': 'Description du poste',
    'employer.requirements': 'Exigences',
    'employer.deadline': 'Date limite de candidature',
    'employer.visa': 'Visa sponsorisé disponible',
    'employer.submit': 'Soumettre l\'offre',
    'employer.success': 'Votre demande a été reçue! Nous la réviserons et vous contacterons bientôt.',
    'employer.error': 'Échec de la soumission de l\'offre',
    
    // Coming soon
    'coming.title': 'Opportunités à venir',
    'coming.subtitle': 'Soyez le premier informé des nouvelles offres',
    'coming.email': 'Votre email',
    'coming.subscribe': 'S\'abonner aux alertes',
    'coming.success': 'Abonnement réussi!',
    
    // Footer
    'footer.about': 'BENO Consulting connecte les professionnels talentueux d\'Afrique du Nord aux entreprises leaders de la région du Golfe.',
    'footer.quick': 'Liens rapides',
    'footer.legal': 'Légal',
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': 'Conditions d\'utilisation',
    'footer.cookies': 'Politique des cookies',
    'footer.rights': 'Tous droits réservés',
    
    // WhatsApp
    'whatsapp.chat': 'Discuter sur WhatsApp',
    'whatsapp.interested': 'Je suis intéressé par:',
    
    // Why Gulf Section
    'why.title': 'Pourquoi les pays du Golfe?',
    'why.subtitle': 'Opportunités exceptionnelles dans des économies en pleine croissance',
    'why.salary.title': 'Salaires compétitifs',
    'why.salary.desc': 'Salaires sans impôts avec des avantages complets',
    'why.growth.title': 'Développement professionnel',
    'why.growth.desc': 'Opportunités d\'avancement et de développement illimitées',
    'why.lifestyle.title': 'Vie moderne',
    'why.lifestyle.desc': 'Infrastructures de classe mondiale et mode de vie diversifié',
    
    // Categories Section
    'home.categories.subtitle': 'Explorez les opportunités dans différents secteurs',
    'home.submitCV.title': 'Prêt à commencer? Envoyez votre CV maintenant',
    'home.featured.subtitle': 'Dernières opportunités disponibles',
    'home.partner.subtitle': 'Rejoignez notre réseau d\'employeurs leaders',
    
    // About Page
    'about.mission.title': 'Notre mission',
    'about.mission.desc': 'Combler le fossé entre les professionnels talentueux d\'Afrique du Nord et les opportunités de carrière exceptionnelles dans la région du Golfe, en créant des connexions mutuellement bénéfiques qui favorisent la croissance et le succès.',
    'about.serve.title': 'Qui nous servons',
    'about.serve.desc': 'Nous sommes spécialisés dans la mise en relation de candidats de Tunisie, du Maroc et d\'Algérie avec des employeurs de premier plan en Arabie Saoudite, aux EAU et au Qatar dans diverses industries notamment l\'informatique, la santé, la construction et la finance.',
    'about.process.title': 'Notre processus',
    'about.process.desc': 'Nous examinons soigneusement toutes les offres d\'emploi et les employeurs pour garantir des opportunités de qualité. Notre processus de candidature simplifié, combiné à l\'intégration WhatsApp, facilite la connexion rapide et efficace des candidats avec les employeurs.',
    'about.commitment.title': 'Notre engagement',
    'about.commitment.desc': 'Nous fournissons un soutien complet tout au long du processus d\'embauche, y compris la coordination du parrainage de visa, l\'aide à la relocalisation et l\'orientation professionnelle continue. Notre service est entièrement gratuit pour les chercheurs d\'emploi.',
    'about.why.title': 'Pourquoi choisir BENO Consulting',
    'about.why.expertise': 'Expertise:',
    'about.why.expertise.desc': 'Avec des années d\'expérience dans le recrutement dans le Golfe, nous comprenons les exigences uniques et les nuances culturelles des employeurs et des candidats.',
    'about.why.quality': 'Qualité:',
    'about.why.quality.desc': 'Nous maintenons des normes élevées en examinant minutieusement toutes les offres d\'emploi et en fournissant des informations vérifiées sur les employeurs.',
    'about.why.support': 'Soutien:',
    'about.why.support.desc': 'De la candidature initiale au placement final, nous sommes avec vous à chaque étape, offrant des conseils sur les processus de visa, la relocalisation et le développement de carrière.',
    'about.why.technology': 'Technologie:',
    'about.why.technology.desc': 'Notre plateforme simplifie la recherche d\'emploi avec des filtres avancés, un support multilingue (arabe/anglais/français) et une intégration WhatsApp pour une communication instantanée.',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur s\'est produite',
    'common.retry': 'Réessayer',
    'common.close': 'Fermer',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.view': 'Voir les détails',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.reset': 'Réinitialiser',
    'common.apply': 'Appliquer',
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved === 'ar' || saved === 'en' || saved === 'fr') ? saved : 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang][key as keyof typeof translations.en] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
