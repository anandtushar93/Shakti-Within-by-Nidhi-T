import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles, Star, ArrowRight } from 'lucide-react';
import { COSMIC_EVENTS, MONTH_NAMES, CATEGORY_META } from '../../data/cosmicEvents';
import type { CosmicEvent } from '../../data/cosmicEvents';
import Container from '../Shared/Container';

// Available months in dataset (July 2026 to November 2026)
const AVAILABLE_MONTHS = [
  { year: 2026, month: 6, label: 'July 2026' },
  { year: 2026, month: 7, label: 'August 2026' },
  { year: 2026, month: 8, label: 'September 2026' },
  { year: 2026, month: 9, label: 'October 2026' },
  { year: 2026, month: 10, label: 'November 2026' },
];

const WEEKDAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CosmicCalendar: React.FC = () => {
  const [activeMonthIndex, setActiveMonthIndex] = useState(0); // 0 = July 2026
  const [selectedEvent, setSelectedEvent] = useState<CosmicEvent | null>(null);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  const currentMonthInfo = AVAILABLE_MONTHS[activeMonthIndex];
  const { year, month } = currentMonthInfo;

  // Compute days in month and starting day of week
  const monthDaysData = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
    // Convert to Mon = 0, Sun = 6
    const startingOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return { startingOffset, daysInMonth };
  }, [year, month]);

  // Index events by YYYY-MM-DD
  const eventsByDateMap = useMemo(() => {
    const map = new Map<string, CosmicEvent>();
    COSMIC_EVENTS.forEach((evt) => {
      map.set(evt.date, evt);
    });
    return map;
  }, []);

  // Filter events for active month
  const monthEvents = useMemo(() => {
    return COSMIC_EVENTS.filter((e) => e.year === year && e.month === month);
  }, [year, month]);

  // Handlers for month nav
  const handlePrevMonth = () => {
    if (activeMonthIndex > 0) {
      setActiveMonthIndex(activeMonthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (activeMonthIndex < AVAILABLE_MONTHS.length - 1) {
      setActiveMonthIndex(activeMonthIndex + 1);
    }
  };

  // Helper date string builder
  const getDateString = (dayNum: number) => {
    const mStr = String(month + 1).padStart(2, '0');
    const dStr = String(dayNum).padStart(2, '0');
    return `${year}-${mStr}-${dStr}`;
  };

  // Today check (e.g. 2026-07-24)
  const todayStr = '2026-07-24';

  return (
    <section
      id="cosmic-calendar"
      className="py-24 sm:py-28 lg:py-36 bg-gradient-to-b from-[#140F0A] via-[#1E1710] to-[#140F0A] text-white relative overflow-hidden"
      aria-label="Astrology & Cosmic Calendar Section"
    >
      {/* Background Cosmic Nebulae */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#C59B27]/12 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-[#8A5CF5]/10 blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Floating Constellation Stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#E6B85C]/40 text-lg pointer-events-none select-none"
          style={{
            left: `${6 + i * 12}%`,
            top: `${12 + (i % 4) * 22}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.4 }}
          aria-hidden="true"
        >
          {['✦', '✧', '⭐', '✨', '☽', '★', '✦', '✧'][i]}
        </motion.div>
      ))}

      <Container>
        {/* Dark Theme Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4.5 py-1.5 mb-5 border border-[#E6B85C]/35 shadow-sm"
          >
            <Sparkles size={14} className="text-[#E6B85C]" />
            <span className="text-[#E6B85C] font-body text-xs font-semibold tracking-widest uppercase">
              ✨ Auspicious Energies
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-4 leading-tight"
          >
            Cosmic & Spiritual{' '}
            <span className="italic gradient-text-gold">Calendar</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-white/80 text-base sm:text-lg leading-relaxed"
          >
            Explore important spiritual dates, festivals, planetary events and auspicious occasions to help you stay aligned with positive energy.
          </motion.p>

          <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-transparent via-[#E6B85C] to-transparent mx-auto" />
        </div>

        {/* Month Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10" role="tablist" aria-label="Select Calendar Month">
          {AVAILABLE_MONTHS.map((m, idx) => (
            <button
              key={m.label}
              onClick={() => setActiveMonthIndex(idx)}
              role="tab"
              aria-selected={activeMonthIndex === idx}
              className={`font-body text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeMonthIndex === idx
                  ? 'bg-gradient-to-r from-[#C59B27] to-[#E6B85C] text-[#140F0A] border-[#E6B85C] font-bold shadow-[0_0_20px_rgba(197,155,39,0.4)] scale-105'
                  : 'bg-white/8 text-white/80 border-white/15 hover:border-[#E6B85C] hover:text-[#E6B85C]'
              }`}
            >
              <span>{m.label}</span>
              {idx === 0 && <span className="text-[10px] bg-[#140F0A]/30 px-1.5 py-0.5 rounded-full font-bold">Current</span>}
            </button>
          ))}
        </div>

        {/* Calendar Box */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Grid Component (8 Cols) */}
          <div className="lg:col-span-8 bg-[#1F1810]/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#C59B27]/35 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative">
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C59B27] to-[#E6B85C] flex items-center justify-center text-[#140F0A] shadow-md font-bold">
                  <CalendarIcon size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-white">
                    {MONTH_NAMES[month]} {year}
                  </h3>
                  <p className="font-body text-xs text-[#E6B85C]">
                    {monthEvents.length} Auspicious Spiritual & Planetary Events
                  </p>
                </div>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  disabled={activeMonthIndex === 0}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-[#C59B27] hover:text-[#140F0A] hover:border-[#C59B27] disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
                  aria-label="Previous Month"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={handleNextMonth}
                  disabled={activeMonthIndex === AVAILABLE_MONTHS.length - 1}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-[#C59B27] hover:text-[#140F0A] hover:border-[#C59B27] disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
                  aria-label="Next Month"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Weekday Names */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-3 text-center mb-3">
              {WEEKDAY_NAMES.map((wd) => (
                <div key={wd} className="font-body text-xs sm:text-sm font-semibold text-[#E6B85C] py-1">
                  {wd}
                </div>
              ))}
            </div>

            {/* Month Days Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMonthInfo.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-7 gap-1.5 sm:gap-3"
              >
                {/* Empty cells before month start */}
                {Array.from({ length: monthDaysData.startingOffset }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-16 sm:h-22 rounded-2xl bg-transparent opacity-0 pointer-events-none" />
                ))}

                {/* Actual Month Days */}
                {Array.from({ length: monthDaysData.daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const dateStr = getDateString(dayNum);
                  const event = eventsByDateMap.get(dateStr);
                  const isToday = dateStr === todayStr;
                  const isSelected = selectedDateStr === dateStr;

                  const categoryMeta = event ? CATEGORY_META[event.category] : null;

                  return (
                    <motion.div
                      key={dateStr}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setSelectedDateStr(dateStr);
                        if (event) setSelectedEvent(event);
                      }}
                      className={`h-16 sm:h-22 rounded-2xl p-1.5 sm:p-2.5 flex flex-col justify-between transition-all duration-300 cursor-pointer relative border overflow-hidden ${
                        isSelected
                          ? 'ring-2 ring-[#E6B85C] border-[#E6B85C] bg-[#C59B27]/35 shadow-[0_0_25px_rgba(230,184,92,0.4)]'
                          : isToday
                          ? 'border-[#E6B85C] bg-[#C59B27]/25 shadow-[0_0_20px_rgba(197,155,39,0.3)]'
                          : event
                          ? 'bg-gradient-to-br from-[#2E2317] to-[#1A130B] border-[#C59B27]/40 hover:border-[#E6B85C] hover:shadow-[0_0_20px_rgba(230,184,92,0.25)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/12 hover:border-[#C59B27]/50 text-white/90'
                      }`}
                      role="button"
                      tabIndex={0}
                      aria-label={`Day ${dayNum} ${event ? `- ${event.title}` : ''}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedDateStr(dateStr);
                          if (event) setSelectedEvent(event);
                        }
                      }}
                    >
                      {/* Top Row: Day Number & Today indicator */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-body text-xs sm:text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center ${
                            isToday
                              ? 'bg-[#E6B85C] text-[#140F0A] font-bold shadow-sm'
                              : isSelected
                              ? 'text-[#E6B85C] font-bold'
                              : 'text-white'
                          }`}
                        >
                          {dayNum}
                        </span>

                        {isToday && (
                          <span className="font-body text-[9px] bg-[#E6B85C]/20 text-[#E6B85C] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter hidden sm:inline-block border border-[#E6B85C]/40">
                            Today
                          </span>
                        )}
                      </div>

                      {/* Event Badge Icon & Short Pill */}
                      {event && categoryMeta && (
                        <div className="mt-auto">
                          <div
                            className="rounded-xl px-1.5 py-1 text-[10px] sm:text-xs font-body font-semibold truncate flex items-center gap-1 border shadow-xs"
                            style={{
                              color: categoryMeta.color,
                              backgroundColor: categoryMeta.bg,
                              borderColor: categoryMeta.border,
                            }}
                          >
                            <span className="text-xs leading-none flex-shrink-0">{event.badgeIcon}</span>
                            <span className="truncate hidden sm:inline">{event.title}</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs font-body text-white/80">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#E6B85C]" />
                <span>Today</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#F5D08E]/30 border border-[#F5D08E]" />
                <span>Lunar Phase</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#E6B85C]/30 border border-[#E6B85C]" />
                <span>Sacred Festival</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#B388FF]/30 border border-[#B388FF]" />
                <span>Planetary Transit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FFD700]/30 border border-[#FFD700]" />
                <span>Numerology Portal</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Featured Events List in Active Month (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#1F1810]/85 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-[#C59B27]/35 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                <h4 className="font-heading text-xl font-semibold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-[#E6B85C]" />
                  <span>{MONTH_NAMES[month]} Highlights</span>
                </h4>
                <span className="font-body text-xs bg-[#C59B27]/20 text-[#E6B85C] px-2.5 py-1 rounded-full border border-[#E6B85C]/30 font-semibold">
                  {monthEvents.length} Events
                </span>
              </div>

              {monthEvents.length === 0 ? (
                <p className="font-body text-xs text-white/60 italic text-center py-6">
                  No registered cosmic events for this month.
                </p>
              ) : (
                <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
                  {monthEvents.map((evt) => {
                    const catMeta = CATEGORY_META[evt.category];
                    const dateFormatted = new Date(evt.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });

                    return (
                      <motion.div
                        key={evt.id}
                        whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        onClick={() => setSelectedEvent(evt)}
                        className="p-4 rounded-2xl bg-white/6 border border-white/10 hover:border-[#C59B27]/60 transition-all cursor-pointer group shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-body font-semibold border"
                            style={{
                              color: catMeta.color,
                              backgroundColor: catMeta.bg,
                              borderColor: catMeta.border,
                            }}
                          >
                            <span>{evt.badgeIcon}</span>
                            <span>{catMeta.label}</span>
                          </span>

                          <span className="font-body text-xs font-semibold text-[#E6B85C] bg-[#C59B27]/20 px-2 py-0.5 rounded-lg border border-[#E6B85C]/30">
                            {dateFormatted}
                          </span>
                        </div>

                        <h5 className="font-heading text-base font-semibold text-white group-hover:text-[#E6B85C] transition-colors leading-snug mb-1">
                          {evt.title}
                        </h5>

                        <p className="font-body text-xs text-white/75 line-clamp-2 leading-relaxed">
                          {evt.shortDescription}
                        </p>

                        <div className="mt-2.5 flex items-center text-[11px] font-body font-semibold text-[#E6B85C] group-hover:translate-x-1 transition-transform">
                          <span>View Guidance</span>
                          <ArrowRight size={12} className="ml-1" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Consultation Banner */}
            <div className="bg-gradient-to-br from-[#2A2016] via-[#3D2E1E] to-[#594420] rounded-3xl p-6 text-white shadow-xl border border-[#E6B85C]/40 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#E6B85C]/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="w-10 h-10 rounded-full bg-[#E6B85C]/20 border border-[#E6B85C]/50 flex items-center justify-center text-[#E6B85C] mx-auto mb-3">
                <Star size={18} />
              </div>

              <h4 className="font-heading text-xl font-semibold text-white mb-1.5">
                Align With Cosmic Dates
              </h4>

              <p className="font-body text-xs text-white/85 leading-relaxed mb-4">
                Want to know how these planetary transits & festivals uniquely impact your personal birth chart?
              </p>

              <a
                href="https://wa.me/919899689394?text=Hi%20Nidhi!%20I%20would%20like%20a%20personal%20astrology%20%26%20numerology%20reading%20aligned%20with%20upcoming%20cosmic%20dates."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full text-xs py-3 font-semibold inline-flex items-center justify-center gap-1.5 shadow-lg"
                id="cosmic-calendar-banner-btn"
              >
                ✨ Book Personal Birth Chart Reading
              </a>
            </div>
          </div>
        </div>
      </Container>

    </section>
  );
};

export default CosmicCalendar;
