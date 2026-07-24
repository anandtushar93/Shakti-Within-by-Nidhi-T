import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Keyboard, A11y } from 'swiper/modules';
import { ZoomIn, X, ChevronLeft, ChevronRight, Star, MessageCircle, Quote } from 'lucide-react';
import { useLockScroll } from '../../hooks';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export interface ReviewScreenshot {
  id: string;
  name: string;
  service: string;
  rating: number;
  date: string;
  message: string;
  avatarText: string;
  highlight: string;
  imageSrc?: string;
}

const DUMMY_CLIENT_REVIEWS: ReviewScreenshot[] = [
  {
    id: 's1',
    name: 'Ananya Roy',
    service: 'Tarot Consultation',
    rating: 5,
    date: 'Yesterday, 8:42 PM',
    message: "Nidhi's tarot reading gave me so much clarity regarding my career transition! She knew things without me explaining anything. Truly blessed experience. 🙏✨",
    avatarText: 'AR',
    highlight: 'Knew things without me explaining anything!',
  },
  {
    id: 's2',
    name: 'Rohit Sharma',
    service: 'Numerology & Guidance',
    rating: 5,
    date: '2 days ago',
    message: 'The name correction and numerology chart Nidhi prepared for my business was spot on! Revenue increased within 2 months. 100% recommended!',
    avatarText: 'RS',
    highlight: 'Revenue increased within 2 months!',
  },
  {
    id: 's3',
    name: 'Pooja Verma',
    service: 'Spiritual Guidance',
    rating: 5,
    date: '3 days ago',
    message: 'I was feeling extremely overwhelmed and stuck in life. After just one session with Nidhi mam, I felt a deep sense of calm and direction. Thank you Shakti Within!',
    avatarText: 'PV',
    highlight: 'Felt a deep sense of calm & direction',
  },
  {
    id: 's4',
    name: 'Simran Kaur',
    service: 'Love & Relationship Tarot',
    rating: 5,
    date: '4 days ago',
    message: 'Her prediction about my marriage timeline came out exact! She has such pure divine energy. Best intuitive reader in Delhi NCR.',
    avatarText: 'SK',
    highlight: 'Prediction came out exact!',
  },
  {
    id: 's5',
    name: 'Meera Deshmukh',
    service: 'Energy Healing & Guidance',
    rating: 5,
    date: '5 days ago',
    message: 'The energy session left me feeling recharged and spiritually aligned. Her voice alone heals half your anxiety. Immense gratitude to Nidhi T. 💜✨',
    avatarText: 'MD',
    highlight: 'Her voice alone heals half your anxiety',
  },
];

interface ClientScreenshotGalleryProps {
  screenshots?: string[];
  onSelectPreview?: (item: ReviewScreenshot | string) => void;
}

const ClientScreenshotGallery: React.FC<ClientScreenshotGalleryProps> = ({
  screenshots = [],
}) => {
  const [selectedItem, setSelectedItem] = useState<ReviewScreenshot | string | null>(null);
  useLockScroll(!!selectedItem);

  return (
    <div className="relative w-full my-12">
      {/* Custom Swiper Slider */}
      <div className="relative px-2 sm:px-4">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, Keyboard, A11y]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-custom-pagination',
          }}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          keyboard={{ enabled: true }}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
          className="pb-14 pt-4 px-1"
        >
          {/* If real screenshots provided */}
          {screenshots.length > 0
            ? screenshots.map((src, idx) => (
                <SwiperSlide key={`img-${idx}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="glass-card rounded-3xl overflow-hidden shadow-lg border border-[#C59B27]/20 group cursor-pointer relative"
                    onClick={() => setSelectedItem(src)}
                  >
                    <img
                      src={src}
                      alt={`Client review screenshot ${idx + 1}`}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#201A15]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                      <span className="font-body text-xs text-white font-medium">Click to expand</span>
                      <div className="glass rounded-full p-2">
                        <ZoomIn size={16} className="text-[#C59B27]" />
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))
            : DUMMY_CLIENT_REVIEWS.map((review) => (
                <SwiperSlide key={review.id}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="glass-card rounded-3xl p-6 sm:p-7 shadow-lg border border-[#C59B27]/22 group cursor-pointer relative h-full flex flex-col justify-between"
                    onClick={() => setSelectedItem(review)}
                  >
                    {/* Header: WhatsApp style badge */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white text-xs font-bold">
                            <MessageCircle size={14} />
                          </div>
                          <span className="font-body text-xs font-semibold text-[#25D366] tracking-wide">
                            WhatsApp Verified Review
                          </span>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} size={13} className="text-[#C59B27] fill-[#C59B27]" />
                          ))}
                        </div>
                      </div>

                      {/* Highlight quote */}
                      <div className="bg-[#FAF6EE] rounded-2xl p-3.5 border border-[#C59B27]/18 mb-4">
                        <p className="font-heading text-sm font-semibold text-[#C59B27] italic flex items-center gap-1.5">
                          <Quote size={14} className="text-[#C59B27] flex-shrink-0" />
                          "{review.highlight}"
                        </p>
                      </div>

                      {/* Chat text */}
                      <p className="font-body text-xs sm:text-sm text-[#383026] leading-relaxed mb-6 line-clamp-3 italic">
                        "{review.message}"
                      </p>
                    </div>

                    {/* Author & Footer */}
                    <div className="flex items-center justify-between border-t border-[#EFE5D3] pt-4 mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C59B27] to-[#E6B85C] flex items-center justify-center text-[#201A15] font-heading font-bold text-xs">
                          {review.avatarText}
                        </div>
                        <div>
                          <p className="font-heading text-sm font-semibold text-[#201A15]">{review.name}</p>
                          <p className="font-body text-[10px] text-[#685F52]">{review.service}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-body text-[10px] text-[#685F52] block">{review.date}</span>
                        <span className="font-body text-[11px] font-semibold text-[#C59B27] group-hover:underline inline-flex items-center gap-0.5 mt-0.5">
                          View <ZoomIn size={11} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
        </Swiper>

        {/* Custom Navigation Arrows & Pagination */}
        <div className="flex items-center justify-between mt-4 max-w-xs mx-auto">
          <button
            className="swiper-button-prev-custom w-10 h-10 rounded-full glass border border-[#C59B27]/30 flex items-center justify-center text-[#201A15] hover:bg-[#C59B27] hover:text-white transition-all cursor-pointer shadow-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="swiper-custom-pagination flex justify-center gap-2" />

          <button
            className="swiper-button-next-custom w-10 h-10 rounded-full glass border border-[#C59B27]/30 flex items-center justify-center text-[#201A15] hover:bg-[#C59B27] hover:text-white transition-all cursor-pointer shadow-sm"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Lightbox Preview */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Client review details"
          >
            <motion.div
              className="relative max-w-lg w-full mx-4"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-4 -right-4 z-10 w-9 h-9 glass rounded-full flex items-center justify-center text-[#201A15] hover:bg-white transition-colors cursor-pointer shadow-md"
                aria-label="Close review"
              >
                <X size={18} />
              </button>

              {typeof selectedItem === 'string' ? (
                <img
                  src={selectedItem}
                  alt="Client testimonial screenshot"
                  className="w-full rounded-3xl max-h-[80vh] object-contain border border-[#C59B27]/30"
                />
              ) : (
                <div className="glass-card rounded-3xl p-8 border border-[#C59B27]/30 shadow-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs font-bold">
                      <MessageCircle size={15} />
                    </div>
                    <span className="font-body text-xs font-semibold text-[#25D366]">Verified WhatsApp Screenshot</span>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: selectedItem.rating }).map((_, i) => (
                      <Star key={i} size={15} className="text-[#C59B27] fill-[#C59B27]" />
                    ))}
                  </div>

                  <p className="font-heading text-xl italic text-[#201A15] leading-relaxed mb-6">
                    "{selectedItem.message}"
                  </p>

                  <div className="flex items-center justify-between border-t border-[#EFE5D3] pt-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C59B27] to-[#E6B85C] flex items-center justify-center text-[#201A15] font-heading font-bold text-base">
                        {selectedItem.avatarText}
                      </div>
                      <div>
                        <p className="font-heading text-lg font-semibold text-[#201A15]">{selectedItem.name}</p>
                        <p className="font-body text-xs text-[#685F52]">{selectedItem.service}</p>
                      </div>
                    </div>
                    <span className="font-body text-xs text-[#685F52]">{selectedItem.date}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientScreenshotGallery;
