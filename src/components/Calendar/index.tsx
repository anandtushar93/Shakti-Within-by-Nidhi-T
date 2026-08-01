import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles, ExternalLink, BookOpen } from 'lucide-react';
import {
  COSMIC_EVENTS,
  MONTH_NAMES,
  CATEGORY_META,
  getAvailableMonths,
  buildEventMap,
} from '../../data/cosmicEvents';
import { useLatestBlog } from '../../hooks';
import Container from '../Shared/Container';

// ─── Constants ────────────────────────────────────────────────────────────────
const WEEKDAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Built once — month tabs starting from today's real month, never hardcoded.
const AVAILABLE_MONTHS = getAvailableMonths(6);

// Pre-built multi-event map: date → CosmicEvent[].
// Supports any number of events on the same calendar day.
const EVENT_MAP = buildEventMap(COSMIC_EVENTS);

// ─── Tooltip Component ────────────────────────────────────────────────────────
interface TooltipProps {
  events: ReturnType<typeof EVENT_MAP.get> & {};
}

const EventTooltip: React.FC<TooltipProps> = ({ events }) => {
  if (!events?.length) return null;
  // Use the first event's meta for border/background theming
  const primaryMeta = CATEGORY_META[events[0].category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.18 }}
      className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 sm:w-64 pointer-events-none"
    >
      <div
        className="rounded-2xl p-3.5 shadow-2xl border text-left"
        style={{
          background: 'linear-gradient(135deg, #1F1810 80%, #2E2317)',
          borderColor: primaryMeta.border,
          boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px ${primaryMeta.border}`,
        }}
      >
        {events.map((evt, i) => {
          const meta = CATEGORY_META[evt.category];
          return (
            <div key={evt.id} className={i > 0 ? 'mt-3 pt-3 border-t border-white/10' : ''}>
              {/* Badge */}
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-body font-semibold border mb-1.5"
                style={{ color: meta.color, backgroundColor: meta.bg, borderColor: meta.border }}
              >
                <span>{evt.badgeIcon}</span>
                <span>{meta.label}</span>
              </span>
              {/* Title */}
              <p className="font-heading text-sm font-semibold text-white leading-snug mb-1">
                {evt.title}
              </p>
              {/* Description */}
              <p className="font-body text-[11px] text-white/70 leading-relaxed">
                {evt.shortDescription}
              </p>
            </div>
          );
        })}
      </div>
      {/* Caret */}
      <div
        className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
        style={{
          background: '#1F1810',
          borderRight: `1px solid ${primaryMeta.border}`,
          borderBottom: `1px solid ${primaryMeta.border}`,
        }}
      />
    </motion.div>
  );
};

// ─── Main Calendar Component ──────────────────────────────────────────────────
const CosmicCalendar: React.FC = () => {
  // Always starts at index 0 = current month (from today's real date)
  const [activeMonthIndex, setActiveMonthIndex] = useState(0);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const { post: latestPost, loading: blogLoading, error: blogError } = useLatestBlog();

  const currentMonthInfo = AVAILABLE_MONTHS[activeMonthIndex];
  const { year, month } = currentMonthInfo;

  // Compute days in month and Mon-aligned starting offset
  const monthDaysData = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0=Sun
    const startingOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { startingOffset, daysInMonth };
  }, [year, month]);

  // Events for active month — used for the event count badge
  const monthEventCount = useMemo(() => {
    return COSMIC_EVENTS.filter((e) => e.year === year && e.month === month).length;
  }, [year, month]);

  // Helper: build YYYY-MM-DD string for a given day number in active month
  const getDateString = (dayNum: number): string => {
    const mStr = String(month + 1).padStart(2, '0');
    const dStr = String(dayNum).padStart(2, '0');
    return `${year}-${mStr}-${dStr}`;
  };

  // Today's date string (real-time, never hardcoded)
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  return (
    <section
      id="cosmic-calendar"
      className="py-24 sm:py-28 lg:py-36 bg-gradient-to-b from-[#140F0A] via-[#1E1710] to-[#140F0A] text-white relative overflow-hidden"
      aria-label="Cosmic & Spiritual Calendar Section"
    >
      {/* Background Nebulae */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#C59B27]/12 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-[#8A5CF5]/10 blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Floating Stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#E6B85C]/40 text-lg pointer-events-none select-none"
          style={{ left: `${6 + i * 12}%`, top: `${12 + (i % 4) * 22}%` }}
          animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.4 }}
          aria-hidden="true"
        >
          {['✦', '✧', '⭐', '✨', '☽', '★', '✦', '✧'][i]}
        </motion.div>
      ))}

      <Container>
        {/* Section Header */}
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
            Cosmic &amp; Spiritual{' '}
            <span className="italic gradient-text-gold">Calendar</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-white/80 text-base sm:text-lg leading-relaxed"
          >
            Explore important spiritual dates — Full Moon, New Moon &amp; Hindu festivals — to stay aligned with positive energy.
          </motion.p>

          <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-transparent via-[#E6B85C] to-transparent mx-auto" />
        </div>

        {/* ── Month Selector Tabs (fully dynamic from today's date) ── */}
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
              {/* "Current" badge only on the first tab (today's month) */}
              {idx === 0 && activeMonthIndex === 0 && (
                <span className="text-[10px] bg-[#140F0A]/30 px-1.5 py-0.5 rounded-full font-bold">Current</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Calendar Grid ── */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1F1810]/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#C59B27]/35 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative">

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
                    {monthEventCount} Spiritual Events · Hover a date to see details
                  </p>
                </div>
              </div>

              {/* Prev / Next */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => activeMonthIndex > 0 && setActiveMonthIndex(activeMonthIndex - 1)}
                  disabled={activeMonthIndex === 0}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-[#C59B27] hover:text-[#140F0A] hover:border-[#C59B27] disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
                  aria-label="Previous Month"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => activeMonthIndex < AVAILABLE_MONTHS.length - 1 && setActiveMonthIndex(activeMonthIndex + 1)}
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
                {/* Empty offset cells */}
                {Array.from({ length: monthDaysData.startingOffset }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-16 sm:h-20 rounded-2xl bg-transparent opacity-0 pointer-events-none" />
                ))}

                {/* Day Cells */}
                {Array.from({ length: monthDaysData.daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const dateStr = getDateString(dayNum);
                  // Multi-event support: get all events for this date
                  const events = EVENT_MAP.get(dateStr) ?? [];
                  const hasEvent = events.length > 0;
                  // Primary event drives the badge icon / color
                  const primaryEvent = events[0] ?? null;
                  const isToday = dateStr === todayStr;
                  const isHovered = hoveredDate === dateStr;
                  const categoryMeta = primaryEvent ? CATEGORY_META[primaryEvent.category] : null;

                  return (
                    <div
                      key={dateStr}
                      className="relative"
                      onMouseEnter={() => hasEvent && setHoveredDate(dateStr)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`h-16 sm:h-20 rounded-2xl p-1.5 sm:p-2.5 flex flex-col justify-between transition-all duration-300 relative border overflow-visible ${
                          isToday
                            ? 'border-[#E6B85C] bg-[#C59B27]/25 shadow-[0_0_20px_rgba(197,155,39,0.3)]'
                            : hasEvent
                            ? 'bg-gradient-to-br from-[#2E2317] to-[#1A130B] border-[#C59B27]/40 hover:border-[#E6B85C] hover:shadow-[0_0_20px_rgba(230,184,92,0.25)] cursor-pointer'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#C59B27]/30 text-white/90'
                        }`}
                        aria-label={`Day ${dayNum}${primaryEvent ? ` — ${primaryEvent.title}` : ''}${events.length > 1 ? ` +${events.length - 1} more` : ''}`}
                      >
                        {/* Day Number + Today Badge */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-body text-xs sm:text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center ${
                              isToday
                                ? 'bg-[#E6B85C] text-[#140F0A] font-bold shadow-sm'
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
                          {/* Multi-event indicator dot */}
                          {events.length > 1 && (
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#E6B85C] flex-shrink-0"
                              title={`${events.length} events`}
                            />
                          )}
                        </div>

                        {/* Primary Event Badge */}
                        {primaryEvent && categoryMeta && (
                          <div className="mt-auto">
                            <div
                              className="rounded-xl px-1.5 py-1 text-[10px] sm:text-xs font-body font-semibold flex items-center gap-1 border shadow-xs"
                              style={{
                                color: categoryMeta.color,
                                backgroundColor: categoryMeta.bg,
                                borderColor: categoryMeta.border,
                              }}
                            >
                              <span className="text-xs leading-none flex-shrink-0">{primaryEvent.badgeIcon}</span>
                              <span className="truncate hidden sm:inline leading-tight" style={{ fontSize: '9px' }}>
                                {primaryEvent.category === 'moon'
                                  ? (primaryEvent.badgeIcon === '🌑' ? 'New Moon' : 'Full Moon')
                                  : primaryEvent.title.replace(/^[^\s]+\s/, '')}
                              </span>
                            </div>
                          </div>
                        )}
                      </motion.div>

                      {/* Hover Tooltip — shows ALL events for the day */}
                      <AnimatePresence>
                        {isHovered && events.length > 0 && (
                          <EventTooltip events={events} />
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-center gap-5 text-xs font-body text-white/80">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#E6B85C]" />
                <span>Today</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🌑</span>
                <span>New Moon (Amavasya)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🌕</span>
                <span>Full Moon (Purnima)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🪔</span>
                <span>Hindu Festival</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6B85C] inline-block" />
                <span>Multiple Events</span>
              </div>
            </div>
          </div>

          {/* ── Latest Blog from Worthy of You ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-8 relative overflow-hidden rounded-3xl border border-[#E6B85C]/35 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
            style={{ background: 'linear-gradient(135deg, #1A130B 0%, #2A2016 50%, #1F1810 100%)' }}
          >
            {/* Glow accents */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-[#C59B27]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#8A5CF5]/10 rounded-full blur-3xl pointer-events-none" />

            {/* ── Loading Skeleton ── */}
            {blogLoading && (
              <div className="relative z-10 flex flex-col sm:flex-row gap-0 overflow-hidden rounded-3xl animate-pulse">
                <div className="sm:w-2/5 h-52 sm:h-64 flex-shrink-0 bg-white/8" />
                <div className="flex-1 p-6 sm:p-8 flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="h-6 w-44 rounded-full bg-white/10" />
                    <div className="h-6 w-20 rounded-full bg-white/8" />
                  </div>
                  <div className="h-4 w-24 rounded-full bg-white/8" />
                  <div className="h-6 w-3/4 rounded-lg bg-white/10" />
                  <div className="h-4 w-full rounded-lg bg-white/8" />
                  <div className="h-4 w-5/6 rounded-lg bg-white/8" />
                  <div className="mt-2 flex gap-3">
                    <div className="h-10 w-36 rounded-full bg-[#C59B27]/20" />
                    <div className="h-10 w-28 rounded-full bg-white/8" />
                  </div>
                </div>
              </div>
            )}

            {/* ── Error State ── */}
            {blogError && (
              <div className="relative z-10 p-8 sm:p-12 flex flex-col items-center justify-center gap-4 text-center">
                <span className="text-3xl">✦</span>
                <p className="font-heading text-base sm:text-lg text-white/60">
                  Latest blog is currently unavailable.
                </p>
                <a
                  href="https://worthyofyou.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm text-[#E6B85C] hover:text-white border border-[#E6B85C]/30 hover:border-[#E6B85C] px-5 py-2.5 rounded-full transition-all duration-300"
                >
                  <Sparkles size={13} />
                  Visit worthyofyou.in →
                </a>
              </div>
            )}

            {/* ── Loaded Post ── */}
            {!blogLoading && !blogError && latestPost && (
              <div className="relative z-10 flex flex-col sm:flex-row gap-0 overflow-hidden rounded-3xl">
                {/* Blog Thumbnail */}
                <div className="sm:w-2/5 h-52 sm:h-auto flex-shrink-0 relative overflow-hidden">
                  <img
                    src={latestPost.image}
                    alt={latestPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1A130B]/80 hidden sm:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A130B]/80 via-transparent to-transparent sm:hidden" />
                </div>

                {/* Blog Content */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 bg-[#C59B27]/20 border border-[#E6B85C]/40 text-[#E6B85C] font-body text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        <BookOpen size={11} />
                        Latest from Worthy of You
                      </span>
                      <span className="font-body text-[11px] text-white/50">{latestPost.date}</span>
                    </div>

                    <span className="inline-block bg-white/8 border border-white/15 text-white/70 font-body text-[10px] px-2.5 py-0.5 rounded-full mb-3">
                      ✦ {latestPost.category}
                    </span>

                    <h4 className="font-heading text-lg sm:text-xl lg:text-2xl font-semibold text-white leading-snug mb-3">
                      {latestPost.title}
                    </h4>

                    <p className="font-body text-sm text-white/70 leading-relaxed line-clamp-3">
                      {latestPost.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <a
                      href={latestPost.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="blog-read-btn"
                      className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#C59B27] to-[#E6B85C] text-[#140F0A] font-heading font-bold text-sm px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(197,155,39,0.35)] hover:shadow-[0_8px_30px_rgba(197,155,39,0.5)] transition-all duration-300 hover:scale-105"
                    >
                      <BookOpen size={15} />
                      Read Full Blog
                      <ExternalLink size={13} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    <a
                      href="https://worthyofyou.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      id="blog-all-btn"
                      className="inline-flex items-center gap-1.5 font-body text-sm text-[#E6B85C] hover:text-white border border-[#E6B85C]/30 hover:border-[#E6B85C] px-5 py-3 rounded-full transition-all duration-300"
                    >
                      <Sparkles size={13} />
                      All Blogs →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default CosmicCalendar;
