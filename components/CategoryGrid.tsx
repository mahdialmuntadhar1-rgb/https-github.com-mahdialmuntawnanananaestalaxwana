import React, { useState, useEffect } from 'react';
import { categories } from '../constants';
import type { Category } from '../types';
import { Sparkles } from './icons';
import { useTranslations } from '../hooks/useTranslations';
import { GlassCard } from './GlassCard';

interface CategoryGridProps {
  onCategoryClick: (category: Category) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const SkeletonCard: React.FC = () => (
    <div className="aspect-square backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center animate-pulse">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-full mb-4"></div>
        <div className="h-4 w-3/4 bg-white/10 rounded mb-2"></div>
        <div className="h-6 w-1/2 bg-white/10 rounded"></div>
    </div>
);

const ITEMS_PER_PAGE = 9;

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick, currentPage, setCurrentPage }) => {
    const [loading, setLoading] = useState(true);
    const { t } = useTranslations();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500); // Simulate loading time
        return () => clearTimeout(timer);
    }, []);

    const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
    const paginatedCategories = categories.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                    {t('categories.title')}
                </h2>
                <p className="text-white/60">
                    {t('categories.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
                {loading ? (
                    Array.from({ length: 9 }).map((_, index) => <SkeletonCard key={index} />)
                ) : (
                    paginatedCategories.map((category) => (
                        <GlassCard
                            as="button"
                            key={category.id}
                            onClick={() => onCategoryClick(category)}
                            className="group relative aspect-square p-0 hover:shadow-glow-primary hover:scale-105 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                                <div className="text-4xl md:text-5xl mb-3 text-white transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(0,217,255,0.5)]">
                                    {category.icon}
                                </div>
                                <h3 className="text-white font-semibold text-sm md:text-base mb-2">
                                    {t(category.nameKey)}
                                </h3>
                                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-white/80">
                                    {category.eventCount} {t('categories.events')}
                                </div>
                                {category.recommended && (
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center animate-pulse">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        </GlassCard>
                    ))
                )}
            </div>
            
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`
                            w-2 h-2 rounded-full transition-all duration-300
                            ${currentPage === index 
                                ? 'w-8 bg-primary' 
                                : 'bg-white/20 hover:bg-white/40'
                            }
                            `}
                            aria-label={`Go to page ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};