import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Keyboard, A11y } from 'swiper/modules';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLockScroll } from '../../hooks';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from '../../assets/images/img1.jpeg';
import img2 from '../../assets/images/img2.jpeg';
import img3 from '../../assets/images/img3.jpeg';
import img4 from '../../assets/images/img4.jpeg';
import img5 from '../../assets/images/img5.jpeg';
import img6 from '../../assets/images/img6.jpeg';
import img7 from '../../assets/images/img7.jpeg';
import img8 from '../../assets/images/img8.jpeg';
import img9 from '../../assets/images/img9.jpeg';
import img10 from '../../assets/images/img10.jpeg';

const CLIENT_SCREENSHOTS = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const ClientScreenshotGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
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
          {CLIENT_SCREENSHOTS.map((src, idx) => (
            <SwiperSlide key={`img-${idx}`}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl overflow-hidden shadow-lg border border-[#C59B27]/20 group cursor-pointer relative"
                onClick={() => setSelectedItem(src)}
              >
                <img
                  src={src}
                  alt={`Client review screenshot ${idx + 1}`}
                  className="w-auto m-auto h-100 object-fill transition-transform duration-500 group-hover:scale-105"
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
              className="relative max-w-lg w-full mx-4 bg-amber-50"
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

              <img
                src={selectedItem}
                alt="Client testimonial screenshot"
                className="w-full rounded-3xl max-h-[80vh] object-contain border border-[#C59B27]/30"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientScreenshotGallery;
