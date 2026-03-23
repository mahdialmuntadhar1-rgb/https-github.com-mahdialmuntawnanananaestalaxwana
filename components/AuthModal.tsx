import React, { useState } from 'react';
import { X } from './icons';
import { useTranslations } from '../hooks/useTranslations';

interface AuthModalProps {
    onClose: () => void;
    onLogin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
    const { t } = useTranslations();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-md backdrop-blur-2xl bg-dark-bg/90 border border-white/20 rounded-3xl p-8 shadow-glow-primary text-start rtl:text-right">
                <button onClick={onClose} className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <X className="w-5 h-5 text-white" />
                </button>
                
                <div className="flex border-b border-white/10 mb-6">
                    <button onClick={() => setActiveTab('signin')} className={`flex-1 py-3 font-semibold transition-colors ${activeTab === 'signin' ? 'text-primary border-b-2 border-primary' : 'text-white/60 hover:text-white'}`}>
                        {t('auth.signIn')}
                    </button>
                    <button onClick={() => setActiveTab('signup')} className={`flex-1 py-3 font-semibold transition-colors ${activeTab === 'signup' ? 'text-primary border-b-2 border-primary' : 'text-white/60 hover:text-white'}`}>
                        {t('auth.signUp')}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {activeTab === 'signup' && (
                        <>
                            <div>
                                <label className="block text-white/70 text-sm mb-2">{t('auth.fullName')}</label>
                                <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary transition-colors" />
                            </div>
                             <div>
                                <label className="block text-white/70 text-sm mb-2">{t('auth.phone')}</label>
                                <input type="tel" placeholder="+964 7..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary transition-colors" />
                            </div>
                        </>
                    )}
                    <div>
                        <label className="block text-white/70 text-sm mb-2">{t('auth.email')}</label>
                        <input type="email" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                        <label className="block text-white/70 text-sm mb-2">{t('auth.password')}</label>
                        <input type="password" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary transition-colors" />
                    </div>
                     {activeTab === 'signup' && (
                        <div>
                            <label className="block text-white/70 text-sm mb-2">{t('auth.language')}</label>
                            <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary transition-colors appearance-none bg-no-repeat bg-right-4" style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'left 0.75rem center', backgroundSize: '1.5em 1.5em'}}>
                                <option className="bg-dark-bg">English</option>
                                <option className="bg-dark-bg">العربية</option>
                                <option className="bg-dark-bg">Kurdî</option>
                            </select>
                        </div>
                    )}
                    <button type="submit" className="w-full !mt-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow-primary transition-all">
                        {activeTab === 'signin' ? t('auth.signIn') : t('auth.createAccount')}
                    </button>
                </form>
            </div>
        </div>
    );
};