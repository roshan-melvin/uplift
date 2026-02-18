import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ManagementLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ collegeName: '', adminName: '', username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            const admin = api.authenticateManagement(formData.username, formData.password);
            if (admin) {
                login(admin, 'management');
                navigate('/business/volunteers');
            } else {
                setError('Invalid admin credentials');
            }
        } else {
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }
            api.addManagement(formData);
            setIsLogin(true);
            alert('Management account created! Proceed to login.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
            <motion.div layout className="p-8 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl w-full max-w-md shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">
                    Management <span className="text-white">{isLogin ? 'Login' : 'Signup'}</span>
                </h2>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-4 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <input required name="collegeName" placeholder="College Name (e.g. IIT Bombay)" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none" onChange={handleInputChange} />
                            <input required name="adminName" placeholder="Admin Full Name" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none" onChange={handleInputChange} />
                        </motion.div>
                    )}
                    <input required name="username" placeholder="Username" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" onChange={handleInputChange} />
                    <input required name="password" type="password" placeholder="Password" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" onChange={handleInputChange} />
                    <button className="w-full py-4 bg-teal-600 hover:bg-teal-500 rounded-xl font-bold shadow-lg shadow-teal-500/20 mt-4 transition-all uppercase tracking-widest">
                        {isLogin ? 'Admin Sign In' : 'Register College'}
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400 text-sm">
                    {isLogin ? "New partner college?" : "Already registered?"}{' '}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-teal-400 font-bold hover:underline">
                        {isLogin ? 'Join Us' : 'Log In'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default ManagementLogin;
