import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VolunteerManagement = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [showVModal, setShowVModal] = useState(false);
    const [showIModal, setShowIModal] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Volunteer form state
    const [vForm, setVForm] = useState({ name: '', dob: '', department: '', aadhar: '', phone: '' });
    // Idea form state
    const [iForm, setIForm] = useState({ businessName: '', description: '', location: '', fundingRequired: '' });

    useEffect(() => {
        setVolunteers(api.getVolunteers());
    }, []);

    const handleAddVolunteer = (e) => {
        e.preventDefault();
        api.addVolunteer(vForm);
        setVolunteers(api.getVolunteers());
        setShowVModal(false);
        setVForm({ name: '', dob: '', department: '', aadhar: '', phone: '' });
    };

    const handleAddIdea = (e) => {
        e.preventDefault();
        api.addInvestmentIdea({ ...iForm, verifiedBy: user.collegeName || 'Management Admin' });
        setShowIModal(false);
        setIForm({ businessName: '', description: '', location: '', fundingRequired: '' });
        alert('Investment project submitted for verification!');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-black tracking-tight"><span className="text-teal-400">Management</span> Panel</h1>
                <button onClick={() => { logout(); navigate('/business'); }} className="bg-red-500/10 text-red-500 px-4 py-2 rounded-xl text-sm font-bold">Sign Out</button>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Left: Volunteer Table */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Ground Volunteers</h2>
                            <p className="text-slate-500 text-sm italic">Physical verification agents currently active.</p>
                        </div>
                        <button onClick={() => setShowVModal(true)} className="bg-teal-600 hover:bg-teal-500 px-6 py-3 rounded-2xl font-bold text-sm transition-all">+ Add Volunteer</button>
                    </div>

                    <div className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="p-5 text-xs font-bold uppercase tracking-widest text-slate-500">Name</th>
                                    <th className="p-5 text-xs font-bold uppercase tracking-widest text-slate-500">Dept</th>
                                    <th className="p-5 text-xs font-bold uppercase tracking-widest text-slate-500">Aadhar</th>
                                    <th className="p-5 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {volunteers.map((v) => (
                                    <tr key={v.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-5 font-bold">{v.name}</td>
                                        <td className="p-5 text-slate-400">{v.department}</td>
                                        <td className="p-5 text-slate-500 font-mono text-sm">{v.aadhar}</td>
                                        <td className="p-5"><span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded font-bold">ACTIVE</span></td>
                                    </tr>
                                ))}
                                {volunteers.length === 0 && <tr><td colSpan="4" className="p-10 text-center text-slate-600">No volunteers registered.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Actions/Stats */}
                <div className="space-y-8">
                    <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl">
                        <h3 className="text-xl font-bold mb-6">Partnering Hub</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">Submit verified business pitches from your locality to our global investor pool.</p>
                        <button
                            onClick={() => setShowIModal(true)}
                            className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm hover:bg-slate-200 transition-all shadow-xl shadow-white/5"
                        >
                            PROPOSE INVESTMENT IDEA
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-teal-900/30 border border-teal-500/20 p-8 rounded-3xl">
                        <h4 className="text-teal-400 font-bold mb-2">Partner College</h4>
                        <p className="text-3xl font-black mb-4">{user?.collegeName || 'Hub Admin'}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">Verified Institution Status · 2026</p>
                    </div>
                </div>
            </div>

            {/* Volunteer Modal */}
            <AnimatePresence>
                {showVModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowVModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.form
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            onSubmit={handleAddVolunteer}
                            className="relative z-10 bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-lg space-y-4"
                        >
                            <h3 className="text-2xl font-bold mb-6">Register New <span className="text-teal-400">Volunteer</span></h3>
                            <input required placeholder="Full Name" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none" onChange={e => setVForm({ ...vForm, name: e.target.value })} />
                            <div className="grid grid-cols-2 gap-4">
                                <input required type="date" className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none" onChange={e => setVForm({ ...vForm, dob: e.target.value })} />
                                <input required placeholder="Department" className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none" onChange={e => setVForm({ ...vForm, department: e.target.value })} />
                            </div>
                            <input required placeholder="Aadhar Number" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none" onChange={e => setVForm({ ...vForm, aadhar: e.target.value })} />
                            <input required placeholder="Phone Number" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none" onChange={e => setVForm({ ...vForm, phone: e.target.value })} />
                            <div className="flex gap-4 mt-6">
                                <button type="button" onClick={() => setShowVModal(false)} className="flex-1 py-4 border border-white/10 rounded-xl font-bold uppercase text-xs">Cancel</button>
                                <button type="submit" className="flex-1 py-4 bg-teal-600 rounded-xl font-bold uppercase text-xs">Submit</button>
                            </div>
                        </motion.form>
                    </div>
                )}
            </AnimatePresence>

            {/* Investment Modal */}
            <AnimatePresence>
                {showIModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowIModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.form
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            onSubmit={handleAddIdea}
                            className="relative z-10 bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-2xl space-y-4 shadow-3xl"
                        >
                            <h3 className="text-2xl font-bold mb-6">Pitch <span className="text-blue-500">Business Opportunity</span></h3>
                            <input required placeholder="Business Name (e.g. Rural Handicraft Hub)" className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl outline-none font-bold" onChange={e => setIForm({ ...iForm, businessName: e.target.value })} />
                            <textarea required rows="4" placeholder="Briefly describe the business model and impact..." className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl outline-none resize-none" onChange={e => setIForm({ ...iForm, description: e.target.value })} />
                            <div className="grid grid-cols-2 gap-4">
                                <input required placeholder="Location" className="bg-slate-800 border border-slate-700 p-4 rounded-xl outline-none" onChange={e => setIForm({ ...iForm, location: e.target.value })} />
                                <input required placeholder="Funding Req (₹)" className="bg-slate-800 border border-slate-700 p-4 rounded-xl outline-none font-mono" onChange={e => setIForm({ ...iForm, fundingRequired: e.target.value })} />
                            </div>
                            <p className="text-[10px] text-slate-500 italic mt-2">By submitting you confirm this idea has been physically verified by your ground volunteers.</p>
                            <div className="flex gap-4 mt-6">
                                <button type="button" onClick={() => setShowIModal(false)} className="flex-1 py-4 border border-white/10 rounded-xl font-bold uppercase text-xs">Discard</button>
                                <button type="submit" className="flex-1 py-4 bg-white text-black rounded-xl font-bold uppercase text-xs">Submit for Verification</button>
                            </div>
                        </motion.form>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VolunteerManagement;
