import React, { useEffect } from 'react';

export const LuxtenRemaining: React.FC = () => {
    useEffect(() => {
        // FAQ logic for Insights section
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(f => f.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });
    }, []);

    return (
        <div className="snap-section bg-[#0a0a0a] text-white overflow-hidden flex flex-col" id="section-data">
            <section className="w-full py-16 md:py-24 px-6 md:px-12 max-w-[1600px] mx-auto flex flex-col items-center text-center flex-1 justify-center">
                 <div className="flex items-center gap-3 mb-4">
                    <i className="fa-solid fa-book-open-reader text-[#00C4CC] animate-pulse"></i>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">Open Data & Insights</span>
                </div>
                 <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-6 text-white">Civic Knowledge Base</h2>
                 <p className="text-gray-400 max-w-2xl mb-12 text-sm">Frequently asked questions regarding our civic tracking methodologies, grant applications, and grassroots interventions.</p>
                 
                 <div className="w-full max-w-3xl text-left space-y-4">
                     {[
                         { q: "How are grassroots interventions tracked?", a: "We utilize our nationwide network of youth ambassadors who log verified peace forums, accountability workshops, and civic actions directly onto our live mapping node." },
                         { q: "Who is eligible for Civic Innovation Grants?", a: "Any youth-led community organization operating within the 47 counties that focuses on SDG 16 objectives is eligible to apply for seed funding." },
                         { q: "Is the data accessible to the public?", a: "Yes. All civic data regarding resource allocation and conflict resolution tracking is open-source and anonymized for public safety." }
                     ].map((faq, idx) => (
                         <div key={idx} className="faq-item border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-[#E5B80B] transition-colors">
                             <div className="flex justify-between items-center">
                                 <h4 className="font-bold uppercase tracking-wide text-sm">{faq.q}</h4>
                                 <i className="fa-solid fa-chevron-down faq-icon text-[#E5B80B]"></i>
                             </div>
                             <div className="faq-content">
                                 <p className="text-sm text-gray-400">{faq.a}</p>
                             </div>
                         </div>
                     ))}
                 </div>
                 
                 <div className="mt-16 flex flex-col items-center gap-6">
                     <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00C4CC]">Ready to participate?</p>
                     <button className="px-8 py-4 bg-[#E5B80B] text-black font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:scale-105 transition-transform">Access Civic Data Hub</button>
                 </div>
            </section>

            <footer className="w-full mt-auto border-t border-white/10 pt-12 pb-6 px-6 md:px-12 text-center" id="section-footer">
                 <h2 className="text-[15vw] md:text-[12vw] font-black leading-none text-white/5 uppercase select-none pointer-events-none mb-4 md:mb-8 tracking-tighter">PAMOJA 16</h2>
                 <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest gap-4">
                     <p>&copy; 2024 PAMOJA 16 FOUNDATION.</p>
                     <div className="flex gap-4 md:gap-6">
                         <a href="#" className="hover:text-[#00C4CC] transition-colors">Methodology</a>
                         <a href="#" className="hover:text-[#00C4CC] transition-colors">Privacy</a>
                         <a href="#" className="hover:text-[#00C4CC] transition-colors">Contact</a>
                     </div>
                 </div>
            </footer>
        </div>
    );
};
