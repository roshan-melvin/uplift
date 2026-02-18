import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

/**
 * Hero – Full-screen landing section
 *
 * Animation strategy:
 * - useScroll + useTransform for parallax background movement
 * - Staggered children via Framer Motion variants
 * - Navbar fades in first, then headline, then subtext, then CTAs
 */

// ── Animation Variants ──────────────────────────────────────────────────────

/** Container that staggers its children with a 0.15s delay between each */
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.3,
        },
    },
}

/** Generic fade-up for individual text/button elements */
const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
}

/** Navbar items fade in from top */
const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' },
    },
}

// ── Component ────────────────────────────────────────────────────────────────

export default function Hero({ onScrollToAbout }) {
    const heroRef = useRef(null)
    const navigate = useNavigate()

    // Parallax: as user scrolls, background moves up at 40% of scroll speed
    const { scrollY } = useScroll()
    const bgY = useTransform(scrollY, [0, 600], ['0%', '30%'])

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex flex-col overflow-hidden"
            aria-label="Hero section"
        >
            {/* ── Parallax Background ─────────────────────────────────────── */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: bgY }}
            >
                {/* Background image - Using the user's preferred 'image.png' */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
                    style={{ backgroundImage: "url('/image.png')" }}
                />

                {/* Heavy blur layer */}
                <div className="absolute inset-0 backdrop-blur-sm" />

                {/* Dark gradient overlay – bottom-heavy for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A]/80 via-[#0A0E1A]/65 to-[#0A0E1A]/95" />

                {/* Subtle radial glow at center */}
                <div className="absolute inset-0 bg-gradient-radial from-teal-500/10 via-transparent to-transparent" />

                {/* Noise texture for premium feel */}
                <div className="noise-overlay" />
            </motion.div>

            {/* ── Navbar ──────────────────────────────────────────────────── */}
            <motion.nav
                className="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-20 pt-8"
                variants={navVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Brand Name */}
                <div className="flex items-center gap-3">
                    {/* Accent dot */}
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-gold-400 to-teal-400 shadow-lg shadow-teal-500/40" />
                    <span className="font-poppins font-bold text-xl md:text-2xl tracking-widest text-white uppercase text-shadow-lg">
                        Uplift{' '}
                        <span className="gradient-text">Bharat</span>
                    </span>
                </div>

                {/* About Us CTA - Now scrolls down */}
                <button
                    onClick={onScrollToAbout}
                    aria-label="Scroll to About Us section"
                    className="
            btn-glow
            font-inter font-medium text-sm md:text-base
            px-5 py-2.5 rounded-full
            border border-white/20
            bg-white/5 text-white
            hover:bg-white/10
            transition-all duration-300
            tracking-wide
          "
                >
                    About Us
                </button>
            </motion.nav>

            {/* ── Center Content ──────────────────────────────────────────── */}
            <motion.div
                className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 pb-24"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* SDG Badge */}
                <motion.div variants={fadeUpVariants} className="mb-6">
                    <span className="
            inline-flex items-center gap-2
            px-4 py-1.5 rounded-full
            border border-gold-400/30
            bg-gold-400/10
            text-gold-400 text-xs md:text-sm font-medium tracking-widest uppercase
          ">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                        UN SDG Goal 1 · No Poverty
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    variants={fadeUpVariants}
                    className="
            font-poppins font-extrabold
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            leading-tight tracking-tight
            text-white max-w-4xl
          "
                >
                    Bridging Trust.{' '}
                    <br />
                    <span className="gradient-text">Empowering Bharat.</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    variants={fadeUpVariants}
                    className="
            mt-6 max-w-2xl
            font-inter font-light text-base md:text-lg lg:text-xl
            text-slate-300 leading-relaxed
          "
                >
                    A verified ecosystem connecting artisans, investors, and job seekers —
                    powered by AI intelligence, secured by law, and grounded in human trust.
                </motion.p>

                {/* Divider line */}
                <motion.div
                    variants={fadeUpVariants}
                    className="mt-8 w-16 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent"
                />

                {/* CTA Buttons */}
                <motion.div
                    variants={fadeUpVariants}
                    className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
                >
                    {/* Business Button – primary */}
                    <button
                        aria-label="Explore Business opportunities"
                        onClick={() => navigate('/business')}
                        className="
              btn-glow
              relative overflow-hidden
              px-8 py-3.5 rounded-full
              font-poppins font-semibold text-sm md:text-base tracking-wide
              text-navy-900
              bg-gradient-to-r from-gold-400 to-gold-500
              shadow-lg shadow-gold-500/30
              transition-all duration-300
              min-w-[160px]
            "
                    >
                        <span className="relative z-10">🏢 Business</span>
                    </button>

                    {/* Employment Button – secondary/ghost */}
                    <button
                        aria-label="Explore Employment opportunities"
                        className="
              btn-glow
              px-8 py-3.5 rounded-full
              font-poppins font-semibold text-sm md:text-base tracking-wide
              text-white
              border border-teal-400/50
              bg-teal-500/10
              hover:bg-teal-500/20
              transition-all duration-300
              min-w-[160px]
            "
                    >
                        <span>💼 Employment</span>
                    </button>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    variants={fadeUpVariants}
                    className="mt-16 flex flex-col items-center gap-2 opacity-50"
                >
                    <span className="text-xs font-inter text-slate-400 tracking-widest uppercase">Scroll</span>
                    <motion.div
                        className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"
                        animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
            </motion.div>

            {/* ── Bottom gradient fade into next section ──────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0E1A] to-transparent z-10 pointer-events-none" />
        </section>
    )
}
