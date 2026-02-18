import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiOutlineGlobeAlt } from 'react-icons/hi2'

/**
 * Footer – Minimal, elegant footer
 *
 * Animation strategy:
 * - useInView triggers a gentle fade-up when footer enters viewport
 * - Subtle top border gradient
 */

export default function Footer() {
    const footerRef = useRef(null)
    const isInView = useInView(footerRef, { once: true, margin: '-5% 0px' })

    return (
        <motion.footer
            ref={footerRef}
            className="relative py-10 px-6 bg-[#0A0E1A]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            aria-label="Site footer"
        >
            {/* Top border gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Brand */}
                <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-gold-400 to-teal-400" />
                    <span className="font-poppins font-bold text-sm tracking-widest text-white uppercase">
                        Uplift <span className="gradient-text">Bharat</span>
                    </span>
                </div>

                {/* Center – SDG alignment */}
                <div className="flex items-center gap-2 text-slate-500 text-xs font-inter">
                    <HiOutlineGlobeAlt className="w-4 h-4 text-teal-400/60" />
                    <span>Aligned with UN SDG-1 · No Poverty</span>
                </div>

                {/* Right – copyright */}
                <div className="text-center md:text-right">
                    <p className="font-inter text-xs text-slate-500">
                        © 2026 <span className="text-slate-400 font-medium">UPLIFT BHARAT</span>
                    </p>
                    <p className="font-inter text-xs text-slate-600 mt-0.5 tracking-widest uppercase">
                        Team Aura
                    </p>
                </div>
            </div>
        </motion.footer>
    )
}
