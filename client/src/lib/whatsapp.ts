export function createWhatsAppLink(phone: string, message: string): string {
  // Remove any non-digit characters from phone number
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Encode the message
  const encodedMessage = encodeURIComponent(message);
  
  // Return wa.me link (official WhatsApp format)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export function createJobWhatsAppMessage(
  jobTitle: string,
  city: string,
  country: string,
  jobUrl: string,
  lang: string
): string {
  if (lang === 'ar') {
    return `أنا مهتم بـ: ${jobTitle} - ${city}, ${country}\n\n${jobUrl}?utm_source=whatsapp`;
  }
  if (lang === 'fr') {
    return `Je suis intéressé par: ${jobTitle} - ${city}, ${country}\n\n${jobUrl}?utm_source=whatsapp`;
  }
  return `I'm interested in: ${jobTitle} - ${city}, ${country}\n\n${jobUrl}?utm_source=whatsapp`;
}

export function createGeneralWhatsAppMessage(lang: string): string {
  if (lang === 'ar') {
    return 'مرحباً، أود الاستفسار عن فرص العمل المتاحة.';
  }
  if (lang === 'fr') {
    return 'Bonjour, je souhaiterais me renseigner sur les opportunités d\'emploi disponibles.';
  }
  return 'Hello, I would like to inquire about available job opportunities.';
}
