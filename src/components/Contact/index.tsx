import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { BRAND } from '../../constants';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../Shared/SectionHeader';
import Container from '../Shared/Container';

// ─── Inline Social Icons ──────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

// ─── Contact Card ─────────────────────────────────────────────────────────────
const ContactCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  color: string;
  external?: boolean;
}> = ({ icon, label, value, href, color, external }) => (
  <motion.a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className="group glass-card rounded-2xl p-6 card-hover flex items-center gap-4 border border-[#C59B27]/18 cursor-pointer"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    aria-label={`${label}: ${value}`}
  >
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-2xs"
      style={{ background: `${color}18` }}
    >
      <span style={{ color }}>{icon}</span>
    </div>
    <div>
      <p className="font-body text-xs text-[#685F52] uppercase tracking-wider mb-0.5 font-medium">{label}</p>
      <p className="font-heading text-base sm:text-lg font-semibold text-[#201A15] group-hover:text-[#C59B27] transition-colors duration-300">
        {value}
      </p>
    </div>
    <div className="ml-auto text-[#C59B27] group-hover:translate-x-1 transition-transform duration-300 font-body">
      →
    </div>
  </motion.a>
);

// ─── Contact Section ──────────────────────────────────────────────────────────
const Contact: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Form State & Validation
  const [name, setName] = useState('');
  const [service] = useState(''); // service selected via WhatsApp message
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; message?: string } = {};

    if (!name.trim()) newErrors.name = 'Please enter your name';
    if (!message.trim()) newErrors.message = 'Please enter a message';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      const formattedText = `Hi Nidhi! My name is ${name}.${
        service ? ` I am interested in ${service}.` : ''
      }\n\nMessage: ${message}`;

      window.open(
        `https://wa.me/919899689394?text=${encodeURIComponent(formattedText)}`,
        '_blank'
      );
    }, 800);
  };

  return (
    <section
      id="contact"
      className="py-28 lg:py-36 bg-gradient-to-b from-[#FAF6EE] to-[#FFFDF9] relative overflow-hidden"
      aria-label="Contact Section"
    >
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#C59B27]/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <Container>
        <SectionHeader
          badge="Get In Touch"
          title="Let's Connect &"
          highlight="Begin Together"
          subtitle="Have a question or ready to book? Reach out — I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Cards */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="space-y-4"
          >
            <motion.h3
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="font-heading text-2xl sm:text-3xl font-semibold text-[#201A15] mb-6"
            >
              Reach Out to Nidhi T
            </motion.h3>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <ContactCard
                icon={<MessageCircle size={22} />}
                label="WhatsApp"
                value="+91 9899 689 394"
                href={BRAND.whatsapp}
                color="#25D366"
                external
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <ContactCard
                icon={<Phone size={22} />}
                label="Phone Call"
                value="+91 9899 689 394"
                href={`tel:${BRAND.phone}`}
                color="#C59B27"
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <ContactCard
                icon={<InstagramIcon />}
                label="Instagram"
                value="@shaktiwithinbynidhi"
                href={BRAND.instagram}
                color="#E1306C"
                external
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <ContactCard
                icon={<LinkedinIcon />}
                label="LinkedIn"
                value="Nidhi T"
                href={BRAND.linkedin}
                color="#0077B5"
                external
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <ContactCard
                icon={<YoutubeIcon />}
                label="YouTube"
                value="ShaktiWithin by Nidhi"
                href={BRAND.youtube}
                color="#FF0000"
                external
              />
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex gap-4 pt-4"
            >
              <motion.a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 text-center inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="contact-whatsapp-btn"
              >
                💬 WhatsApp
              </motion.a>
              <motion.a
                href={`tel:${BRAND.phone}`}
                className="btn-outline flex-1 text-center inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="contact-call-btn"
              >
                📞 Call
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Enhanced Message Form */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-8 border border-[#C59B27]/22 shadow-lg relative overflow-hidden"
            >
              <h3 className="font-heading text-2xl font-semibold text-[#201A15] mb-1">
                Send a Quick Message
              </h3>
              <p className="font-body text-sm text-[#685F52] mb-6">
                Fill out the details below to connect directly with Nidhi T.
              </p>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 bg-[#FAF6EE] rounded-2xl border border-[#C59B27]/30 text-center"
                  >
                    <CheckCircle size={44} className="text-[#C59B27] mx-auto mb-3" />
                    <h4 className="font-heading text-2xl font-semibold text-[#201A15] mb-1">
                      Message Prepared!
                    </h4>
                    <p className="font-body text-sm text-[#685F52] mb-4 leading-relaxed">
                      Redirecting to WhatsApp to send your message to Nidhi T...
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="btn-outline text-xs px-5 py-2 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    aria-label="Contact Form"
                    noValidate
                  >
                    <div>
                      <label htmlFor="contact-name" className="font-body text-sm font-medium text-[#201A15] block mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="Priya Sharma"
                        className={`w-full px-4 py-3 rounded-xl border bg-white font-body text-sm text-[#201A15] placeholder:text-[#aaa] focus:outline-none transition-all ${
                          errors.name ? 'border-red-400 focus:border-red-500' : 'border-[#EFE5D3] focus:border-[#C59B27]'
                        }`}
                        aria-label="Your name"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="font-body text-xs text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* <div>
                      <label htmlFor="contact-service" className="font-body text-sm font-medium text-[#201A15] block mb-1.5">
                        Interested In
                      </label>
                      <select
                        id="contact-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EFE5D3] bg-white font-body text-sm text-[#201A15] focus:outline-none focus:border-[#C59B27] transition-all"
                        aria-label="Select a service"
                      >
                        <option value="">Select a Service (Optional)</option>
                        <option value="Tarot Reading">Tarot Reading</option>
                        <option value="Numerology Consultation">Numerology Consultation</option>
                        <option value="Spiritual Guidance">Spiritual Guidance</option>
                        <option value="Energy Healing">Energy Healing</option>
                        <option value="Other">Other / Not Sure</option>
                      </select>
                    </div> */}

                    <div>
                      <label htmlFor="contact-message" className="font-body text-sm font-medium text-[#201A15] block mb-1.5">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors({ ...errors, message: undefined });
                        }}
                        placeholder="Hi Nidhi, I'd love to book a consultation for..."
                        className={`w-full px-4 py-3 rounded-xl border bg-white font-body text-sm text-[#201A15] placeholder:text-[#aaa] resize-none focus:outline-none transition-all ${
                          errors.message ? 'border-red-400 focus:border-red-500' : 'border-[#EFE5D3] focus:border-[#C59B27]'
                        }`}
                        aria-label="Your message"
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p className="font-body text-xs text-red-500 mt-1">{errors.message}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      id="contact-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Preparing Message...
                        </>
                      ) : (
                        'Send via WhatsApp ✨'
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* QR Code Placeholder */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 flex items-center gap-5 border border-[#C59B27]/20"
            >
              <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-[#FAF6EE] border border-[#C59B27]/25 flex items-center justify-center" aria-label="WhatsApp QR Code placeholder">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="18" height="18" rx="2" stroke="#C59B27" strokeWidth="1.5"/>
                  <rect x="7" y="7" width="8" height="8" fill="#C59B27" opacity="0.6"/>
                  <rect x="28" y="2" width="18" height="18" rx="2" stroke="#C59B27" strokeWidth="1.5"/>
                  <rect x="33" y="7" width="8" height="8" fill="#C59B27" opacity="0.6"/>
                  <rect x="2" y="28" width="18" height="18" rx="2" stroke="#C59B27" strokeWidth="1.5"/>
                  <rect x="7" y="33" width="8" height="8" fill="#C59B27" opacity="0.6"/>
                  <rect x="28" y="28" width="4" height="4" fill="#C59B27"/>
                  <rect x="36" y="28" width="4" height="4" fill="#C59B27"/>
                  <rect x="28" y="36" width="4" height="4" fill="#C59B27"/>
                  <rect x="36" y="36" width="4" height="4" fill="#C59B27"/>
                  <rect x="32" y="32" width="4" height="4" fill="#C59B27"/>
                </svg>
              </div>
              <div>
                <p className="font-heading text-base font-semibold text-[#201A15] mb-1">Scan to Book via WhatsApp</p>
                <p className="font-body text-xs text-[#685F52]">
                  Scan with your camera to open WhatsApp directly
                </p>
              </div>
            </motion.div> */}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
