import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    HiOutlineShieldCheck,
    HiOutlineCpuChip,
    HiOutlineLockClosed,
    HiOutlineCheckCircle,
    HiOutlineGlobeAlt,
} from 'react-icons/hi2'

/**
 * AboutSection – Full-width section with staggered content cards
 * Replaces the previous modal-based 'About Us'
 */

// ── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
}

// ── Data ──────────────────────────────────────────────────────────────────────

const layers = [
    {
        icon: HiOutlineShieldCheck,
        color: 'from-teal-400 to-teal-600',
        glow: 'shadow-teal-500/30',
        title: 'The Verification Layer',
        subtitle: 'The Human Touch',
        body: 'We partner with Colleges (NSS/NCC) and NGOs to provide physical, on-ground verification. Volunteers geo-tag businesses, record consent videos, and ensure every opportunity is 100% real and documented.',
    },
    {
        icon: HiOutlineCpuChip,
        color: 'from-indigo-400 to-purple-600',
        glow: 'shadow-indigo-500/30',
        title: 'The Intelligence Layer',
        subtitle: 'The AI Engine',
        subItems: [
            { label: 'For Investors', text: 'AI analyzes risk and viability to suggest impactful artisan projects.' },
            { label: 'For Job Seekers', text: 'Maps local skills to nearby opportunities and generates a Smart Credibility Score.' },
        ],
    },
    {
        icon: HiOutlineLockClosed,
        color: 'from-gold-400 to-amber-600',
        glow: 'shadow-amber-500/30',
        title: 'The Security Layer',
        subtitle: 'The Legal Shield',
        body: 'We use RBI-compliant escrow systems (Razorpay/Cashfree). We never touch funds — we facilitate secure agreements and digital handshakes.',
    },
]

const differentiators = [
    'Not a Charity — Sustainable revenue sharing',
    'No Fund Pooling',
    'Verified Impact — Geo-location + NGO reporting',
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function AboutSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' })

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-24 md:py-32 px-6 overflow-hidden bg-navy-900"
            aria-label="About Us"
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-xs font-inter font-medium tracking-widest uppercase text-teal-400 mb-3">
                        Our Mission
                    </p>
                    <h2 className="font-poppins font-bold text-3xl md:text-5xl text-white">
                        What We <span className="gradient-text">Actually Do</span>
                    </h2>
                    <div className="mt-6 mx-auto w-16 h-1 bg-gradient-to-r from-gold-400 to-teal-400 rounded-full" />
                </motion.div>

                {/* Content Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {layers.map((layer) => {
                        const Icon = layer.icon
                        return (
                            <motion.div
                                key={layer.title}
                                variants={itemVariants}
                                className="glass-card p-8 flex flex-col h-full hover:border-white/20 transition-all duration-500 group"
                            >
                                {/* Icon */}
                                <div className={`
                  mb-6 w-14 h-14 rounded-2xl
                  flex items-center justify-center
                  bg-gradient-to-br ${layer.color}
                  shadow-xl ${layer.glow}
                  group-hover:scale-110 transition-transform duration-500
                `}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>

                                <div className="mb-4">
                                    <h3 className="font-poppins font-bold text-xl text-white mb-1">
                                        {layer.title}
                                    </h3>
                                    <p className="text-xs font-inter font-medium text-teal-400/80 uppercase tracking-widest">
                                        {layer.subtitle}
                                    </p>
                                </div>

                                {layer.body ? (
                                    <p className="font-inter text-slate-300 leading-relaxed">
                                        {layer.body}
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {layer.subItems.map((sub) => (
                                            <div key={sub.label}>
                                                <p className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">
                                                    {sub.label}
                                                </p>
                                                <p className="font-inter text-sm text-slate-300 leading-relaxed">
                                                    {sub.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Bottom Section: Why We Are Different & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Why We Are Different */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="glass-card p-8"
                    >
                        <h3 className="font-poppins font-bold text-xl text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-teal-400 rounded-full" />
                            Why We Are Different
                        </h3>
                        <ul className="space-y-4">
                            {differentiators.map((item) => (
                                <li key={item} className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                                        <HiOutlineCheckCircle className="w-5 h-5 text-teal-400" />
                                    </div>
                                    <span className="font-inter text-slate-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="glass-card p-8 relative overflow-hidden flex flex-col justify-center"
                    >
                        <div className="absolute -right-8 -bottom-8 opacity-10">
                            <HiOutlineGlobeAlt className="w-48 h-48 text-gold-400" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center">
                                    <HiOutlineGlobeAlt className="w-6 h-6 text-gold-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-inter font-medium tracking-widest uppercase text-gold-400 mb-0.5">
                                        Our Vision
                                    </p>
                                    <h3 className="font-poppins font-bold text-xl text-white">
                                        Impact at Scale
                                    </h3>
                                </div>
                            </div>
                            <p className="font-inter text-slate-300 leading-relaxed mb-4">
                                We are building the trust infrastructure for the next billion. Our model ensures that prosperity is shared, verified, and sustainable.
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 font-inter text-sm">
                                Aligned with UN SDG-1 · No Poverty
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Radial glow accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-teal-500/5 blur-[120px] pointer-events-none" />
        </section>
    )
}
