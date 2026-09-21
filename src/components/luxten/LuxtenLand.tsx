import React, { useEffect } from 'react';

export const LuxtenLand: React.FC = () => {
    useEffect(() => {
        const counters = document.querySelectorAll('.counter');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = +(entry.target.getAttribute('data-target') || 0);
                    const duration = 5000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            (entry.target as HTMLElement).innerText = Math.ceil(current).toString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            (entry.target as HTMLElement).innerText = target.toString();
                        }
                    };
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="snap-section bg-[#f8f8f8] dark:bg-[var(--color-LUXTEN-black)] transition-colors duration-500 overflow-x-hidden flex flex-col" id="section-impact">
            <section className="w-full pt-10 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto flex flex-col">
                <nav className="hidden md:flex justify-between items-center w-full mb-8 border-b border-gray-300 dark:border-white/5 pb-4">
                    <div className="flex items-center gap-6">
                        <a href="#section-impact" className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#00C4CC] hover:opacity-80 transition-opacity">Global Impact</a>
                        <a href="#section-data" className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[var(--color-LUXTEN-charcoal)] dark:text-white hover:text-[#00C4CC] transition-colors">Open Data</a>
                    </div>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <i className="fa-solid fa-chart-line text-[#E5B80B] animate-pulse"></i>
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">Impact Metrics</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-[0.9] text-[var(--color-LUXTEN-black)] dark:text-white transition-colors">
                                Measure <br/> <span className="text-gray-500 dark:text-gray-600">Progress</span>
                            </h2>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 w-full">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed text-right max-w-xl ml-auto transition-colors">
                            Transparency is the foundation of accountability. We track and verify <strong className="text-[var(--color-LUXTEN-charcoal)] dark:text-white">civic interventions</strong> across all 47 counties in real-time.
                        </p>

                        <div id="impact-counter-section" className="grid grid-cols-4 gap-4 border-t border-gray-300 dark:border-white/10 pt-6">
                            <div className="text-center md:text-left">
                                <span className="text-xl md:text-2xl font-bold text-[var(--color-LUXTEN-charcoal)] dark:text-white block"><span className="counter" data-target="47">0</span></span>
                                <span className="text-[8px] uppercase tracking-widest text-[#00C4CC]">Counties</span>
                            </div>
                            <div className="text-center md:text-left border-l border-gray-300 dark:border-white/10 pl-4">
                                <span className="text-xl md:text-2xl font-bold text-[var(--color-LUXTEN-charcoal)] dark:text-white block"><span className="counter" data-target="1500">0</span>+</span>
                                <span className="text-[8px] uppercase tracking-widest text-[#00C4CC]">Youth Mentors</span>
                            </div>
                            <div className="text-center md:text-left border-l border-gray-300 dark:border-white/10 pl-4">
                                <span className="text-xl md:text-2xl font-bold text-[var(--color-LUXTEN-charcoal)] dark:text-white block"><span className="counter" data-target="120">0</span></span>
                                <span className="text-[8px] uppercase tracking-widest text-[#00C4CC]">Civic Startups</span>
                            </div>
                            <div className="text-center md:text-left border-l border-gray-300 dark:border-white/10 pl-4">
                                <span className="text-xl md:text-2xl font-bold text-[var(--color-LUXTEN-charcoal)] dark:text-white block"><span className="counter" data-target="85">0</span>%</span>
                                <span className="text-[8px] uppercase tracking-widest text-[#00C4CC]">Resolution</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-full h-[600px] rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/10 group mb-12 transition-colors">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=2600')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#005587]/80 via-[#005587]/50 to-transparent mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    
                    <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
                        <div className="w-full md:max-w-4xl">
                            <div className="flex items-center gap-2 mb-4">
                                <i className="fa-solid fa-globe text-[#E5B80B] text-xs"></i>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-white">Active Zones</span>
                            </div>
                            <div className="flex flex-wrap gap-2 max-h-[200px] overflow-visible">
                                <button className="px-5 py-2 rounded-full border border-[#E5B80B] bg-[#E5B80B] text-black text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">Nairobi HQ</button>
                                <button className="px-5 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Rift Valley</button>
                                <button className="px-5 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Coast Hub</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
