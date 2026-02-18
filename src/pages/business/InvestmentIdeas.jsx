import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const InvestmentIdeas = () => {
    const [ideas, setIdeas] = useState([]);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setIdeas(api.getInvestmentIdeas());
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/business');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Verified <span className="text-blue-500">Opportunities</span></h1>
                    <p className="text-slate-400">Impact-focused business models curated by verified partners.</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-900 px-6 py-3 rounded-2xl border border-white/5">
                    <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Logged in as</p>
                        <p className="font-bold text-blue-400">{user?.fullName || user?.username}</p>
                    </div>
                    <button onClick={handleLogout} className="text-sm bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-xl transition-all">Logout</button>
                </div>
            </div>

            {ideas.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-40">
                    <div className="w-16 h-16 border-2 border-slate-700 rounded-full flex items-center justify-center mb-4 text-2xl">?</div>
                    <p className="text-xl">No verified investment opportunities yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ideas.map((idea, idx) => (
                        <motion.div
                            key={idea.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-slate-900 border border-white/10 p-8 rounded-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all" />

                            <div className="flex items-start justify-between mb-6">
                                <h3 className="text-2xl font-bold leading-tight">{idea.businessName}</h3>
                                <span className="bg-teal-500/20 text-teal-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-teal-500/10">
                                    {idea.riskLevel || 'Low Risk'}
                                </span>
                            </div>

                            <p className="text-slate-400 mb-8 line-clamp-3 text-sm leading-relaxed">{idea.description}</p>

                            <div className="space-y-3 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Location</span>
                                    <span className="font-bold">{idea.location}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Target Range</span>
                                    <span className="font-bold text-blue-400">₹{idea.fundingRequired}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-500 text-xs font-bold">✓</div>
                                    <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                                        Verified by <br /><span className="text-slate-300">{idea.verifiedBy}</span>
                                    </div>
                                </div>
                                <button className="text-xs bg-white text-black font-black px-4 py-2 rounded-lg hover:bg-slate-200 transition-all">PITCH</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InvestmentIdeas;
