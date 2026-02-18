import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const InvestorLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '', age: '', dob: '', aadhar: '', role: 'Student', username: '', password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const validateAadhar = (num) => /^\d{12}$/.test(num);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            const user = api.authenticateInvestor(formData.username, formData.password);
            if (user) {
                login(user, 'investor');
                navigate('/business/investment-ideas');
            } else {
                setError('Invalid username or password');
            }
        } else {
            if (!validateAadhar(formData.aadhar)) {
                setError('Aadhar number must be exactly 12 digits');
                return;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }
            api.addInvestor(formData);
            setIsLogin(true);
            alert('Account created successfully! Please login.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
            <motion.div
                layout
                className="white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl w-full max-w-md shadow-2xl bg-slate-900/50"
            >
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Investor <span className="text-blue-500">{isLogin ? 'Login' : 'Signup'}</span>
                </h2>

                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-4 text-sm text-center">
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <AnimatePresence mode='wait'>
                        {!isLogin && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4">
                                <input required name="fullName" placeholder="Full Name" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleInputChange} />
                                <div className="grid grid-cols-2 gap-4">
                                    <input required name="age" type="number" placeholder="Age" className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none" onChange={handleInputChange} />
                                    <input required name="dob" type="date" className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none" onChange={handleInputChange} />
                                </div>
                                <input required name="aadhar" placeholder="12-digit Aadhar Number" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none" onChange={handleInputChange} />
                                <select name="role" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none" onChange={handleInputChange}>
                                    <option>Student</option>
                                    <option>Employee</option>
                                    <option>Entrepreneur</option>
                                    <option>Other</option>
                                </select>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <input required name="username" placeholder="Username" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleInputChange} />
                    <input required name="password" type="password" placeholder="Password" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleInputChange} />

                    <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold shadow-lg shadow-blue-500/20 mt-4 transition-all">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400 text-sm">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 font-bold hover:underline">
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default InvestorLogin;
