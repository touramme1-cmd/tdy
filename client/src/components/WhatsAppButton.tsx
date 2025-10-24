import { MessageCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from '@/lib/whatsapp';

const DEFAULT_WHATSAPP_NUMBER = '21652265563';

export default function WhatsAppButton() {
  const { t, lang } = useI18n();

  const handleClick = () => {
    const message = createGeneralWhatsAppMessage(lang);
    const link = createWhatsAppLink(DEFAULT_WHATSAPP_NUMBER, message);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 end-6 z-50 flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
      aria-label={t('whatsapp.chat')}
      data-testid="button-whatsapp-float"
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  );
}
