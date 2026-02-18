import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BusinessLanding = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600 rounded-full blur-[160px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-teal-600 rounded-full blur-[160px] animate-pulse delay-700" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 text-center max-w-4xl"
            >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                    Business <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent italic">Pitch</span>
                </h1>

                <p className="text-sm md:text-base font-medium text-slate-400 mb-12 tracking-wide uppercase">
                    Aligned with SDG-1: Not a Charity — Sustainable Revenue Sharing | No Fund Pooling
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/business/investor-login')}
                        className="px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 transition-all border border-blue-400/30"
                    >
                        Investor Login
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/business/management-login')}
                        className="px-10 py-5 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold text-lg border border-slate-700 transition-all"
                    >
                        Management Login
                    </motion.button>
                </div>
            </motion.div>

            <div className="absolute bottom-8 text-slate-500 text-xs tracking-widest uppercase">
                Uplift Bharat · Internal Platform
            </div>
        </div>
    );
};

export default BusinessLanding;
