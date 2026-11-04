/**
 * Utility to construct direct WhatsApp API link with encoded customer enquiry
 * Configured for RANGA SRI ENTERPRISES - 20 Categories & 400 Services across Karnataka
 */

export const createWhatsAppEnquiryUrl = (whatsappNumber, customerDetails) => {
  if (!whatsappNumber) {
    console.warn('WhatsApp number is not configured in website settings.');
    return '#';
  }

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const textLines = [
    `*RANGA SRI ENTERPRISES - SERVICE ENQUIRY*`,
    `_ONE-STOP SOLUTION FOR EVERY NEED_`,
    `----------------------------------------`,
    `📌 *Type:* ${customerDetails.enquiry_type || 'Service Quotation Request'}`,
    `👤 *Name:* ${customerDetails.name}`,
    `📞 *Phone:* ${customerDetails.phone}`,
    customerDetails.email ? `✉️ *Email:* ${customerDetails.email}` : null,
    customerDetails.district ? `📍 *District:* ${customerDetails.district}` : `📍 *District:* Karnataka`,
    customerDetails.category ? `📂 *Category:* ${customerDetails.category}` : null,
    `🏷️ *Service:* ${customerDetails.service_name || customerDetails.service || 'Multi-Service Coordination'}`,
    `----------------------------------------`,
    `📝 *Requirements / Scope:*`,
    `${customerDetails.message}`,
    `----------------------------------------`,
    `_Sent via Ranga Sri Enterprises One-Stop Portal_`
  ].filter(Boolean);

  const formattedText = textLines.join('\n');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(formattedText)}`;
};

/**
 * Direct WhatsApp URL for Service Card 1-Click Inquiry
 */
export const createWhatsAppServiceDirectUrl = (whatsappNumber, service, district = 'Karnataka') => {
  if (!whatsappNumber) return '#';
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const text = [
    `*INQUIRY: ${service.title}*`,
    `*Category:* ${service.category}`,
    `*Location:* ${district}`,
    `----------------------------------------`,
    `Hello Ranga Sri Enterprises, I would like to enquire about quotations and verified provider availability for *${service.title}*.`
  ].join('\n');

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
};

/**
 * Partner / Provider Onboarding WhatsApp message
 */
export const createWhatsAppProviderUrl = (whatsappNumber, providerDetails) => {
  if (!whatsappNumber) return '#';
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const text = [
    `*PARTNER REGISTRATION APPLICATION*`,
    `----------------------------------------`,
    `🏢 *Business / Agency:* ${providerDetails.business_name}`,
    `👤 *Contact Person:* ${providerDetails.full_name}`,
    `📞 *Phone:* ${providerDetails.phone}`,
    providerDetails.email ? `✉️ *Email:* ${providerDetails.email}` : null,
    `📍 *District:* ${providerDetails.district}`,
    `📂 *Primary Category:* ${providerDetails.category}`,
    `🛠️ *Services:* ${providerDetails.services_offered}`,
    `⭐ *Experience:* ${providerDetails.experience_years || 1} Year(s)`,
    `----------------------------------------`,
    `Hello Ranga Sri Enterprises, I would like to join your verified provider network across Karnataka.`
  ].filter(Boolean).join('\n');

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
};

/**
 * Quick Chat WhatsApp URL
 */
export const createWhatsAppChatUrl = (whatsappNumber, customGreeting) => {
  if (!whatsappNumber) return '#';
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const greeting = customGreeting || 'Hello Ranga Sri Enterprises, I need assistance with a service requirement in Karnataka.';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(greeting)}`;
};
