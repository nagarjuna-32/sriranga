/**
 * Utility to construct direct WhatsApp API link with encoded customer enquiry
 * @param {Object} params
 * @param {string} params.phone - Configurable WhatsApp number from settings
 * @param {string} params.name - Customer Name
 * @param {string} params.phone - Customer Phone
 * @param {string} [params.email] - Customer Email
 * @param {string} params.service - Selected Service name
 * @param {string} params.message - Enquiry details
 */
export const createWhatsAppEnquiryUrl = (whatsappNumber, customerDetails) => {
  if (!whatsappNumber) {
    console.warn('WhatsApp number is not configured in website settings.');
    return '#';
  }

  // Clean WhatsApp number (digits only)
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const textLines = [
    `*NEW ENQUIRY - RANGA SRI ENTERPRISES*`,
    `----------------------------------------`,
    `👤 *Name:* ${customerDetails.name}`,
    `📞 *Phone:* ${customerDetails.phone}`,
    customerDetails.email ? `✉️ *Email:* ${customerDetails.email}` : null,
    `🏷️ *Service:* ${customerDetails.service_name || customerDetails.service || 'General Business Solution'}`,
    `----------------------------------------`,
    `📝 *Enquiry Details:*`,
    `${customerDetails.message}`,
    `----------------------------------------`,
    `_Sent via official website enquiry portal_`
  ].filter(Boolean);

  const formattedText = textLines.join('\n');
  const encodedText = encodeURIComponent(formattedText);

  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
};

/**
 * Quick Chat WhatsApp URL (for floating button without filled form)
 */
export const createWhatsAppChatUrl = (whatsappNumber, customGreeting) => {
  if (!whatsappNumber) return '#';
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const greeting = customGreeting || 'Hello Ranga Sri Enterprises, I would like to enquire about your services.';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(greeting)}`;
};
