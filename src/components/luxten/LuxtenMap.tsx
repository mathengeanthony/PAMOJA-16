import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LuxtenMapProps {
    isLightMode?: boolean;
}

export const LuxtenMap: React.FC<LuxtenMapProps> = ({ isLightMode = false }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const tileLayerRef = useRef<L.TileLayer | null>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        // Dataset
        const listingData = [
            { loc: "Nairobi-Kilimani", lat: -1.2902, lng: 36.7904, size: 'md', growth: '2.1%', price: '14.5M' },
            { loc: "Nairobi-Westlands", lat: -1.2684, lng: 36.8044, size: 'md', growth: '5.4%', price: '18.0M' },
            { loc: "Nairobi-LUXTEN", lat: -1.3197, lng: 36.7050, size: 'lg', growth: '4.2%', price: '85.0M' },
            { loc: "Mombasa-Nyali", lat: -4.0322, lng: 39.7081, size: 'lg', growth: '8.1%', price: '35.0M' },
            { loc: "Mombasa-Bamburi", lat: -3.9961, lng: 39.7138, size: 'md', growth: '6.4%', price: '12.0M' },
            { loc: "Kwale-Diani Beach", lat: -4.2798, lng: 39.5947, size: 'lg', growth: '12.4%', price: '45.0M' },
            { loc: "Kilifi-Mtwapa", lat: -3.9450, lng: 39.7390, size: 'md', growth: '7.8%', price: '15.5M' },
            { loc: "Kilifi-Watamu", lat: -3.3524, lng: 40.0152, size: 'md', growth: '15.0%', price: '28.0M' },
            { loc: "Kilifi-Malindi", lat: -3.2236, lng: 40.1300, size: 'md', growth: '9.2%', price: '22.0M' },
            { loc: "Lamu-Shela", lat: -2.2917, lng: 40.9142, size: 'lg', growth: '10.2%', price: '60.0M' },
            { loc: "Kiambu-Ruiru", lat: -1.1472, lng: 36.9611, size: 'sm', growth: '18.5%', price: '8.5M' },
            { loc: "Kiambu-Ruaka", lat: -1.2185, lng: 36.7997, size: 'sm', growth: '22.1%', price: '11.0M' },
            { loc: "Machakos-Syokimau", lat: -1.3570, lng: 36.9380, size: 'sm', growth: '14.3%', price: '9.0M' },
            { loc: "Nakuru-Milimani", lat: -0.2795, lng: 36.0715, size: 'md', growth: '20.0%', price: '22.0M' },
            { loc: "Uasin Gishu-Eldoret", lat: 0.5143, lng: 35.2698, size: 'md', growth: '11.8%', price: '18.5M' },
            { loc: "Kisumu-Milimani", lat: -0.1081, lng: 34.7505, size: 'md', growth: '8.9%', price: '25.0M' },
            { loc: "Laikipia-Nanyuki", lat: 0.0167, lng: 37.0667, size: 'md', growth: '25.4%', price: '30.0M' },
            { loc: "Kajiado-Kitengela", lat: -1.5167, lng: 36.8500, size: 'sm', growth: '16.7%', price: '7.5M' },
            { loc: "Taita Taveta-Voi", lat: -3.3945, lng: 38.5630, size: 'sm', growth: '5.2%', price: '6.0M' },
            { loc: "Narok-Maasai Mara", lat: -1.5273, lng: 35.1925, size: 'lg', growth: '1.2%', price: '120.0M' }
        ];

        const map = L.map(mapRef.current, { 
            zoomControl: false, scrollWheelZoom: false, 
            doubleClickZoom: false, dragging: false, attributionControl: false 
        }).setView([-1.2921, 36.8219], 13);
        mapInstance.current = map;

        const flyToTimeout = setTimeout(() => {
            if (mapInstance.current) {
                mapInstance.current.flyTo([0.3, 37.0], 6, { duration: 2.5, easeLinearity: 0.25 });
            }
        }, 800);

        function createStarIcon(sizeClass: string) {
            let px = sizeClass === 'lg' ? 14 : sizeClass === 'md' ? 8 : 5;
            let delay = -(Math.random() * 3).toFixed(2);
            return L.divIcon({
                className: 'custom-star-icon',
                html: `<div style="width:${px}px; height:${px}px; animation-delay: ${delay}s; background-color: #FFFF00; border: 1px solid #000; border-radius: 50%; box-shadow: 0 0 12px rgba(255,255,0,0.8);" class="animate-pulse"></div>`,
                iconSize: [px, px], iconAnchor: [px/2, px/2]
            });
        }

        const hqMarker = L.marker([-1.2921, 36.8219], { icon: createStarIcon('lg') }).addTo(map);
        hqMarker.bindTooltip(`
            <div class="font-mono text-[9px] text-[#E5B80B] tracking-widest uppercase mb-1">Pamoja 16 Secretariat</div>
            <div class="font-extrabold text-[13px] tracking-tight text-black bg-[#E5B80B] px-1 inline-block uppercase mb-2">Nairobi HQ</div>
            <div class="text-[10px] uppercase text-gray-300 font-bold mt-1">National Grassroots Command</div>
        `, { className: 'custom-map-hud', direction: 'top', sticky: true, opacity: 1 });

        listingData.forEach(point => {
            const marker = L.marker([point.lat, point.lng], { icon: createStarIcon(point.size) }).addTo(map);
            const hudContent = `
                <div class="font-mono text-[9px] text-[#E5B80B] tracking-widest uppercase mb-1">Civic Data Node</div>
                <div class="font-extrabold text-[13px] text-white tracking-tight uppercase mb-2 border-b border-[#00C4CC]/30 pb-1">${point.loc}</div>
                <div class="flex justify-between gap-8">
                    <div>
                        <div class="text-[8px] uppercase text-gray-400 font-bold">Youth Engagement</div>
                        <div class="text-[#00C4CC] font-bold text-[11px]">+${point.growth}</div>
                    </div>
                    <div>
                        <div class="text-[8px] uppercase text-gray-400 font-bold">Grants Disbursed</div>
                        <div class="text-[#E5B80B] font-bold text-[11px]">KES ${point.price}</div>
                    </div>
                </div>
            `;
            marker.bindTooltip(hudContent, { className: 'custom-map-hud', direction: 'top', sticky: true, opacity: 1 });
        });

        return () => {
            clearTimeout(flyToTimeout);
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
            tileLayerRef.current = null;
        };
    }, []);

    // Tile Layer switching Effect
    useEffect(() => {
        if (!mapInstance.current) return;
        
        if (tileLayerRef.current) {
            mapInstance.current.removeLayer(tileLayerRef.current);
        }

        const tileUrl = isLightMode 
            ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

        tileLayerRef.current = L.tileLayer(tileUrl, { maxZoom: 18, updateWhenIdle: true, keepBuffer: 4, crossOrigin: true });
        tileLayerRef.current.addTo(mapInstance.current);
    }, [isLightMode]);

    const toggleLock = () => {
        const map = mapInstance.current;
        if (!map) return;
        const lockBtn = document.getElementById('map-lock-btn');
        const lockIcon = document.getElementById('lock-icon');
        const lockText = document.getElementById('lock-text');
        
        if (map.dragging.enabled()) {
            map.dragging.disable(); map.scrollWheelZoom.disable(); map.doubleClickZoom.disable();
            lockBtn?.classList.remove('bg-[#E5B80B]', 'text-black', 'border-[#E5B80B]'); 
            lockIcon?.classList.replace('fa-lock-open', 'fa-lock');
            if (lockText) lockText.innerHTML = "Click to interact <br> with map";
        } else {
            map.dragging.enable(); map.scrollWheelZoom.enable(); map.doubleClickZoom.enable();
            lockBtn?.classList.add('bg-[#E5B80B]', 'text-black', 'border-[#E5B80B]'); 
            lockIcon?.classList.replace('fa-lock', 'fa-lock-open');
            if (lockText) lockText.innerHTML = "Map Active <br> Click to lock";
        }
    };

    return (
        <div className="snap-section relative transition-colors duration-700 z-10" id="section-map" style={{ backgroundColor: isLightMode ? '#f1f5f9' : '#0a1729' }}>
            <style>{`
                .custom-map-hud {
                    background: rgba(5, 5, 5, 0.9) !important;
                    backdrop-filter: blur(8px) !important;
                    border: 1px solid rgba(0, 196, 204, 0.3) !important;
                    border-left: 4px solid #E5B80B !important;
                    border-radius: 8px !important;
                    padding: 12px 16px !important;
                    color: white !important;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.8) !important;
                }
                .leaflet-tooltip-left:before, .leaflet-tooltip-right:before, .leaflet-tooltip-top:before, .leaflet-tooltip-bottom:before { display: none; }
            `}</style>
            
            {/* Map Wrapper with Overflow and Crossfade Mask */}
            <div 
                className="absolute left-0 right-0 bottom-0 overflow-hidden pointer-events-none z-0"
                style={{
                    top: '-15vh',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15vh, black 100%)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15vh, black 100%)'
                }}
            >
                <div id="map" ref={mapRef} className="absolute inset-0 z-0 pointer-events-auto"></div>
                
                {/* BASE MAP TINT */}
                <div className={`absolute inset-0 mix-blend-color pointer-events-none z-[5] transition-colors duration-700 ${isLightMode ? 'bg-[#00C4CC] opacity-20' : 'bg-[#005587] opacity-60'}`}></div>
                
                {/* GENERAL OVERLAY VIGNETTE */}
                <div className={`absolute inset-0 bg-gradient-to-b pointer-events-none z-10 transition-colors duration-700 ${isLightMode ? 'from-[#003355]/60 via-transparent to-[#f8f8f8]/80' : 'from-[#0a1729]/80 via-[#005587]/30 to-[#050505]/90'}`}></div>
            </div>

            {/* BOTTOM CURTAIN - Matches Section 3 Top */}
            <div 
                className="absolute bottom-0 left-0 w-full h-48 z-[15] pointer-events-none transition-colors duration-700"
                style={{
                    background: isLightMode
                        ? 'linear-gradient(to top, #f4f7fb 0%, #f4f7fb 15%, transparent 100%)'
                        : 'linear-gradient(to top, #050505 0%, #050505 15%, transparent 100%)'
                }}
            ></div>
            
            <main className="content-layer px-6 pt-4 pb-6 md:px-12 md:pt-6 md:pb-8 h-full min-h-[100dvh] flex flex-col justify-between overflow-hidden relative z-30">
                
                <div className="w-full animate-fade-in-up z-40 flex-shrink-0">
                    <div className="marquee-strip border-t border-b border-[#00C4CC]/20 bg-black/60">
                        <div className="flex whitespace-nowrap animate-scroll-ticker">
                            <div className="flex items-center gap-12 px-6 text-[8px] md:text-[9px] font-mono tracking-[0.3em] uppercase text-[#E5B80B] opacity-90">
                                <span>Grassroots Peace Forums</span> • <span>SDG 16 Accountability</span> • <span>Civic Innovation Grants</span> • <span>Youth Mentorship</span> • <span>County Dialogue Data</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mt-4">
                        <div className="text-left">
                            <h1 className="font-extrabold leading-[0.82] uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(2.5rem, 9vw, 4.8rem)' }}>
                                <div className="block">PAMOJA 16</div>
                                <div className="block text-black bg-[#E5B80B] px-4 w-fit -ml-4 my-2 pb-1">CIVIC</div>
                                <div className="block text-[#00C4CC]">COMMAND</div>
                            </h1>
                            <div className="mt-3 pl-4 border-l-2 border-[#E5B80B]">
                                <p className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase text-[#E5B80B]">Live Action Map</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 border-r border-[#E5B80B]/30 pr-4 md:mt-2 hidden md:flex">
                            <a 
                                href="#section-excellence" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById('section-excellence');
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        const container = document.getElementById('pamoja-root-container');
                                        if (container) container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
                                    }
                                }} 
                                className="vertical-nav-link hover:text-[#E5B80B]"
                            >
                                Action Hub
                            </a>
                            <a 
                                href="#section-excellence" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById('section-excellence');
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        const container = document.getElementById('pamoja-root-container');
                                        if (container) container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
                                    }
                                }} 
                                className="vertical-nav-link hover:text-[#E5B80B]"
                            >
                                Peace &amp; Justice
                            </a>
                            <a 
                                href="#section-excellence" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById('section-excellence');
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        const container = document.getElementById('pamoja-root-container');
                                        if (container) container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
                                    }
                                }} 
                                className="vertical-nav-link hover:text-[#E5B80B]"
                            >
                                Initiatives
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-end w-full opacity-0 animate-fade-in-up z-40 mt-auto text-white" style={{ animationDelay: '500ms' }}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1" id="location-ticker">
                            <div className="text-[10px] md:text-[11px] font-mono font-bold tracking-widest text-black bg-[#E5B80B] px-2 py-0.5 w-fit uppercase" id="ticker-coords">01.29°S 36.82°E — NAIROBI</div>
                            <div className="text-[10px] md:text-[11px] font-bold tracking-wide text-gray-300 uppercase mt-1" id="ticker-info">PAMOJA16 • SECRETARIAT • HEADQUARTERS</div>
                        </div>
                        <p className="text-[11px] md:text-[12px] font-medium text-gray-200 max-w-[280px] md:max-w-[340px] leading-relaxed tracking-wide">
                            Real-time tracking of youth-led peacebuilding, civic resource allocation, and SDG 16 implementation across Kenya's 47 counties.
                        </p>
                        <div className="flex items-center gap-4">
                            <a 
                                href="#section-excellence" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById('section-excellence');
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        const container = document.getElementById('pamoja-root-container');
                                        if (container) container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
                                    }
                                }}
                                className="circle-scroll border-white text-white hover:text-[#E5B80B] hover:border-[#E5B80B] transition-colors"
                            >
                                <i className="fa-solid fa-arrow-down text-sm"></i>
                            </a>
                            <a 
                                href="#section-excellence" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById('section-excellence');
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        const container = document.getElementById('pamoja-root-container');
                                        if (container) container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
                                    }
                                }}
                                className="explore-pill bg-[#E5B80B] text-black hover:bg-black hover:text-[#E5B80B] border border-transparent hover:border-[#E5B80B] transition-colors"
                            >
                                <span className="text-[10px] font-bold">Explore Data</span>
                            </a>
                        </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-3">
                        <button id="map-lock-btn" onClick={toggleLock} className="lock-btn border-white text-white hover:text-[#E5B80B] hover:border-[#E5B80B] transition-colors"><i id="lock-icon" className="fa-solid fa-lock text-lg"></i></button>
                        <p id="lock-text" className="text-[10px] md:text-[11px] font-bold text-white opacity-80 tracking-[0.15em] uppercase leading-tight text-right">Click to interact <br/> with map</p>
                    </div>
                </div>
            </main>
        </div>
    );
};
