// ================================================
// CASAMANDUVA - Frontend-only API Service
// Uses EmailJS for form submissions (no backend)
// ================================================

import emailjs from '@emailjs/browser';

// ── EmailJS config ──────────────────────────────
const EMAILJS_SERVICE_ID = 'service_e49hvl5';
const EMAILJS_PUBLIC_KEY = 'OUaB704vITVaQUJVf';

// Your 2 templates
const TEMPLATE_ENQUIRY  = 'template_vkz0yom';  // Enquiry form + Newsletter
const TEMPLATE_ESTIMATE = 'template_bx8kx8y';  // Estimate enquiry
// ─────────────────────────────────────────────────

let _emailjsInitialised = false;

function initEmailJS() {
  if (_emailjsInitialised) return;
  emailjs.init(EMAILJS_PUBLIC_KEY);
  _emailjsInitialised = true;
}

// ── VISITOR TRACKING (no-op — GA4 handles this) ──
export const trackVisitor = async () => Promise.resolve();

// ── ENQUIRY FORM ──────────────────────────────────
export const submitEnquiry = async (enquiryData) => {
  if (!enquiryData.name?.trim())         throw new Error('Name is required');
  if (!enquiryData.email?.includes('@')) throw new Error('Valid email is required');
  if (!enquiryData.phone?.match(/^[0-9+\-()\\s]{10,}$/)) {
    throw new Error('Valid phone number required');
  }
  if (!enquiryData.message?.trim()) throw new Error('Project description required');

  initEmailJS();

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_ENQUIRY, {
      from_name:     enquiryData.name.trim(),
      from_email:    enquiryData.email.trim().toLowerCase(),
      phone:         enquiryData.phone.trim(),
      property_type: enquiryData.propertyType || 'Not specified',
      budget:        enquiryData.budget        || 'Not specified',
      service:       enquiryData.service       || 'Not specified',
      message:       enquiryData.message.trim(),
      source:        `Enquiry Form (${enquiryData.source || 'website'})`,
      reply_to:      enquiryData.email.trim().toLowerCase(),
    });

    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-XXXXXXXXX/CONVERSION_ID',
        value: 1.0,
        currency: 'INR',
      });
    }
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: enquiryData.source,
        value: 1.0,
        currency: 'INR',
      });
    }

    return { success: true };
  } catch (err) {
    console.error('EmailJS enquiry error:', err);
    throw new Error('Failed to send. Please try WhatsApp or call us directly.');
  }
};

// Aliases
export const submitContactForm = submitEnquiry;
export const getEnquiries = async () => [];

// ── ESTIMATE ENQUIRY ──────────────────────────────
export const saveEstimateEnquiry = async (data) => {
  if (!data.name?.trim()) throw new Error('Name is required');
  if (!data.phone?.match(/^[0-9+\-()\\s]{10,}$/)) {
    throw new Error('Valid phone required');
  }
  if (!data.area || data.area < 300 || data.area > 5000) {
    throw new Error('Area must be 300–5000 sq.ft');
  }

  initEmailJS();

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_ESTIMATE, {
      from_name:        data.name.trim(),
      phone:            data.phone.trim(),
      from_email:       data.email?.trim() || 'Not provided',
      location:         data.location?.trim() || 'Not specified',
      bhk_type:         (data.bhkType || '').toUpperCase(),
      package_type:     data.packageType || 'Not specified',
      area:             data.area,
      selected_rooms:   data.selectedRooms || 'Default rooms',
      estimated_budget: data.estimatedBudget
        ? `₹${Number(data.estimatedBudget).toLocaleString('en-IN')}`
        : 'Not calculated',
      reply_to:         data.email?.trim() || '',
    });

    return { success: true };
  } catch (err) {
    console.error('EmailJS estimate error:', err);
    throw new Error('Failed to submit. Please try WhatsApp or call us directly.');
  }
};

// ── NEWSLETTER ────────────────────────────────────
// Reuses TEMPLATE_ENQUIRY with source = 'Newsletter Subscription'
export const subscribeNewsletter = async (email) => {
  if (!email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error('Invalid email format');
  }

  initEmailJS();

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_ENQUIRY, {
      from_name:     'Newsletter Subscriber',
      from_email:    email.trim().toLowerCase(),
      phone:         'N/A',
      property_type: 'N/A',
      budget:        'N/A',
      service:       'N/A',
      message:       `New newsletter subscription: ${email.trim().toLowerCase()}`,
      source:        'Newsletter Subscription',
      reply_to:      email.trim().toLowerCase(),
    });

    return { success: true };
  } catch (err) {
    console.error('EmailJS newsletter error:', err);
    throw new Error('Failed to subscribe. Please try again.');
  }
};

// ── Estimate helpers (client-side only) ──────────
export const getBHKEstimations = async () => Promise.resolve({});
export const calculateEstimate = async () => Promise.resolve({});

export default {
  trackVisitor,
  submitEnquiry,
  submitContactForm,
  saveEstimateEnquiry,
  getBHKEstimations,
  calculateEstimate,
  subscribeNewsletter,
  getEnquiries,
};