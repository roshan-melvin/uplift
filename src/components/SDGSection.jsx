import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * SDGSection – Full-width quote section
 *
 * Animation strategy:
 * - useInView triggers animation when section enters viewport
 * - Quote fades up with a slight delay
 * - Animated underline grows from left to right on entry
 * - Subtle background gradient pulse
 */

export default function SDGSection() {
    const sectionRef = useRef(null)
    // Trigger once when 30% of the section is visible
    const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' })

    return (
        <section
            ref={sectionRef}
            className="relative py-28 md:py-36 px-6 overflow-hidden"
            aria-label="SDG Quote Section"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A] via-[#0D1224] to-[#0A0E1A]" />

            {/* Radial glow accent */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={isInView ? { opacity: [0, 0.15, 0.08] } : { opacity: 0 }}
                transition={{ duration: 2, ease: 'easeOut' }}
            >
                <div className="w-[600px] h-[300px] rounded-full bg-teal-500 blur-[120px]" />
            </motion.div>

            {/* UN SDG badge */}
            <motion.div
                className="relative z-10 flex justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <span className="
          inline-flex items-center gap-2
          px-4 py-1.5 rounded-full
          border border-teal-400/30
          bg-teal-400/10
          text-teal-400 text-xs font-inter font-medium tracking-widest uppercase
        ">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    United Nations · SDG Goal 1
                </span>
            </motion.div>

            {/* Quote */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Opening quotation mark */}
                <motion.div
                    className="font-poppins text-7xl md:text-9xl text-teal-400/20 leading-none select-none mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    "
                </motion.div>

                <motion.blockquote
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* The quote text with animated underline on key phrase */}
                    <p className="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                        Eradicating poverty isn't an act of{' '}
                        <span className="relative inline-block">
                            <span className="gradient-text">charity</span>
                            {/* Animated underline */}
                            <motion.span
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold-400 to-teal-400 rounded-full"
                                initial={{ width: '0%' }}
                                animate={isInView ? { width: '100%' } : { width: '0%' }}
                                transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                            />
                        </span>
                        {', '}
                        <br className="hidden md:block" />
                        but an act of{' '}
                        <span className="relative inline-block">
                            <span className="gradient-text">justice.</span>
                            <motion.span
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-400 to-indigo-400 rounded-full"
                                initial={{ width: '0%' }}
                                animate={isInView ? { width: '100%' } : { width: '0%' }}
                                transition={{ duration: 1.2, delay: 1.1, ease: 'easeOut' }}
                            />
                        </span>
                    </p>
                </motion.blockquote>

                {/* Attribution */}
                <motion.p
                    className="mt-8 font-inter text-sm text-slate-500 tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.4 }}
                >
                    — Nelson Mandela
                </motion.p>

                {/* Decorative divider */}
                <motion.div
                    className="mt-10 flex items-center justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.6 }}
                >
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-teal-400/50" />
                    <div className="w-2 h-2 rounded-full bg-teal-400/50" />
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-teal-400/50" />
                </motion.div>
            </div>
        </section>
    )
}
