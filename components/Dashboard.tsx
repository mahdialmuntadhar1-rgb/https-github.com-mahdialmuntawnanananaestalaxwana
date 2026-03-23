import React from 'react';
import type { User } from '../types';
import { Heart, Star, MapPin, Clock, Users } from './icons';
import { useTranslations } from '../hooks/useTranslations';
import { GlassCard } from './GlassCard';

interface DashboardProps {
    user: User;
    onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
    const { t } = useTranslations();
    
    const recentActivity = [
        { type: 'favorite', item: 'Saj Al-Reef', icon: <Heart className="w-4 h-4 text-accent" />, time: '2 hours ago' },
        { type: 'view', item: 'Baghdad International Music Festival', icon: <Clock className="w-4 h-4 text-secondary" />, time: '1 day ago' },
        { type: 'search', item: 'Hotels in Erbil', icon: <Users className="w-4 h-4 text-primary" />, time: '3 days ago' },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 text-center md:text-start rtl:md:text-right">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-6 md:mb-0">
                    <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-primary" />
                    <div>
                        <h1 className="text-3xl font-bold text-white">{t('dashboard.welcome')}, {user.name}!</h1>
                        <p className="text-white/70">{user.email}</p>
                    </div>
                </div>
                <button onClick={onLogout} className="px-6 py-2 rounded-full bg-accent/20 border border-accent text-accent font-semibold hover:bg-accent/30 transition-colors">
                    {t('dashboard.logout')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-start rtl:text-right">
                {/* Profile Settings */}
                <GlassCard className="lg:col-span-1 p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">{t('dashboard.profileSettings')}</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-white/70 text-sm mb-2">{t('auth.fullName')}</label>
                            <input type="text" defaultValue={user.name} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                            <label className="block text-white/70 text-sm mb-2">{t('auth.email')}</label>
                            <input type="email" defaultValue={user.email} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                            <label className="block text-white/70 text-sm mb-2">{t('auth.newPassword')}</label>
                            <input type="password" placeholder="********" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-primary transition-colors" />
                        </div>
                        <button type="submit" className="w-full !mt-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow-primary transition-all">
                            {t('dashboard.saveChanges')}
                        </button>
                    </form>
                </GlassCard>
                
                {/* My Activity and Favorites */}
                <div className="lg:col-span-2 space-y-8">
                     <GlassCard className="p-6">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Heart className="text-accent" /> {t('dashboard.myFavorites')}</h2>
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 rtl:pr-0 rtl:pl-2">
                             <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                <img src="https://picsum.photos/seed/b2/128/128" alt="Saj Al-Reef" className="w-16 h-16 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-white">Saj Al-Reef</h3>
                                    <div className="flex items-center gap-4 text-sm text-white/60">
                                        <div className="flex items-center gap-1"><Star className="w-4 h-4 text-accent" /> 4.5</div>
                                        <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> 1.2 km</div>
                                    </div>
                                </div>
                             </div>
                              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                <img src="https://picsum.photos/seed/b1/128/128" alt="Grand Millennium" className="w-16 h-16 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-white">Grand Millennium</h3>
                                    <div className="flex items-center gap-4 text-sm text-white/60">
                                        <div className="flex items-center gap-1"><Star className="w-4 h-4 text-accent" /> 4.8</div>
                                        <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> 2.5 km</div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </GlassCard>

                     <GlassCard className="p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">{t('dashboard.recentActivity')}</h2>
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 rtl:pr-0 rtl:pl-2">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">{activity.icon}</div>
                                    <div className="flex-1">
                                        <p className="text-white/90 text-sm"><span className="font-semibold">{t(`activity.${activity.type}`)}:</span> {activity.item}</p>
                                    </div>
                                    <p className="text-xs text-white/50">{activity.time}</p>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};