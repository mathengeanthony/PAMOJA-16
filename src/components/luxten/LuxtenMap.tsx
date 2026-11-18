import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LuxtenMapProps {
    isLightMode?: boolean;
}

export const LuxtenMap: React.FC<LuxtenMapProps> = ({ isLightMode = false }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const tileLayerRef = useRef<L.TileLayer | null>(null);
    const hasFlownRef = useRef<boolean>(false);
    const tilesReadyRef = useRef<boolean>(false);

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        // Dataset
        const listingData = [
            { loc: "Nairobi-Kilimani", lat: -1.2902, lng: 36.7904, size: 'md', growth: '2.1%', price: '14.5M' },
            { loc: "Nairobi-Westlands", lat: -1.2684, lng: 36.8044, size: 'md', growth: '5.4%', price: '18.0M' },
            { loc: "Nairobi-Kibera Hub", lat: -1.3127, lng: 36.7885, size: 'lg', growth: '4.2%', price: '85.0M' },
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

        // Prefetch initial Nairobi (z=10) and full Kenya overview (z=6) OSM tiles immediately on mount
        const prefetchCoords = [
            { z: 10, x: 616, y: 515 }, { z: 10, x: 616, y: 516 },
            { z: 10, x: 617, y: 515 }, { z: 10, x: 617, y: 516 },
            { z: 6, x: 37, y: 31 }, { z: 6, x: 38, y: 31 }, { z: 6, x: 39, y: 31 },
            { z: 6, x: 37, y: 32 }, { z: 6, x: 38, y: 32 }, { z: 6, x: 39, y: 32 },
            { z: 6, x: 37, y: 30 }, { z: 6, x: 38, y: 30 }, { z: 6, x: 39, y: 30 },
        ];
        prefetchCoords.forEach(({ z, x, y }) => {
            const img = new Image();
            img.src = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
        });

        const map = L.map(mapRef.current, { 
            zoomControl: false, scrollWheelZoom: false, 
            doubleClickZoom: false, dragging: false, attributionControl: false,
            zoomAnimation: true, fadeAnimation: true, markerZoomAnimation: true
        }).setView([-1.2921, 36.8219], 10);
        mapInstance.current = map;

        const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            updateWhenIdle: false,
            updateWhenZooming: true,
            keepBuffer: 6,
            attribution: '&copy; OpenStreetMap contributors',
        });
        osmLayer.on('load', () => {
            tilesReadyRef.current = true;
        });
        osmLayer.addTo(map);
        tileLayerRef.current = osmLayer;

        let flyToTimeout: ReturnType<typeof setTimeout> | null = null;
        let fallbackTimeout: ReturnType<typeof setTimeout> | null = null;

        const runFlyTo = () => {
            if (!mapInstance.current) return;
            mapInstance.current.invalidateSize({ animate: false });
            mapInstance.current.flyTo([0.3, 37.0], 6, {
                animate: true,
                duration: 2.2,
                easeLinearity: 0.28,
            });
            mapInstance.current.once('moveend', () => {
                mapInstance.current?.invalidateSize({ animate: false });
            });
        };

        const triggerZoomOut = () => {
            if (hasFlownRef.current || !mapInstance.current) return;
            hasFlownRef.current = true;
            mapInstance.current.invalidateSize({ animate: false });

            if (tilesReadyRef.current) {
                flyToTimeout = setTimeout(runFlyTo, 280);
            } else {
                let launched = false;
                const launchOnce = () => {
                    if (launched) return;
                    launched = true;
                    if (fallbackTimeout) clearTimeout(fallbackTimeout);
                    flyToTimeout = setTimeout(runFlyTo, 200);
                };
                osmLayer.once('load', launchOnce);
                fallbackTimeout = setTimeout(launchOnce, 750);
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        triggerZoomOut();
                    }
                });
            },
            { threshold: 0.35 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        function createStarIcon(sizeClass: string) {
            let px = sizeClass === 'lg' ? 16 : sizeClass === 'md' ? 11 : 8;
            let delay = -(Math.random() * 3).toFixed(2);
            return L.divIcon({
                className: 'custom-star-icon',
                html: `<div style="width:${px}px; height:${px}px; animation-delay: ${delay}s; background: radial-gradient(circle, #ffffff 15%, #FFE600 55%, #E5B80B 100%); border: 1.5px solid #050a14; border-radius: 50%; box-shadow: 0 0 14px rgba(255, 230, 0, 0.95), 0 0 4px rgba(255, 255, 255, 0.8);" class="animate-pulse"></div>`,
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
            observer.disconnect();
            if (flyToTimeout) clearTimeout(flyToTimeout);
            if (fallbackTimeout) clearTimeout(fallbackTimeout);
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
            tileLayerRef.current = null;
        };
    }, []);

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
        <div ref={sectionRef} className="snap-section relative transition-colors duration-700 z-10 h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between" id="section-map" style={{ backgroundColor: isLightMode ? '#f1f5f9' : '#0a1729' }}>
            <style>{`
                .custom-map-hud {
                    background: rgba(6, 12, 22, 0.96) !important;
                    backdrop-filter: blur(10px) !important;
                    border: 1px solid rgba(0, 196, 204, 0.45) !important;
                    border-left: 4px solid #E5B80B !important;
                    border-radius: 8px !important;
                    padding: 12px 16px !important;
                    color: #ffffff !important;
                    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.85) !important;
                }
                .leaflet-tooltip-pane { z-index: 1000 !important; }
                .leaflet-marker-pane { z-index: 900 !important; }
                .leaflet-tooltip-left:before, .leaflet-tooltip-right:before, .leaflet-tooltip-top:before, .leaflet-tooltip-bottom:before { display: none; }
                #section-map .leaflet-tile-pane {
                    filter: ${isLightMode
                        ? 'saturate(0.65) hue-rotate(8deg) contrast(1.06) brightness(0.98)'
                        : 'invert(1) hue-rotate(195deg) brightness(0.88) contrast(1.18) saturate(1.45)'};
                    transition: filter 0.5s ease;
                }
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
                
                {/* EDGE-ONLY VIGNETTE (Keeps center markers and popups completely untinted and vivid) */}
                <div
                    className="absolute inset-0 pointer-events-none z-10 transition-colors duration-700"
                    style={{
                        background: isLightMode
                            ? 'linear-gradient(to bottom, rgba(0, 51, 85, 0.52) 0%, rgba(0, 51, 85, 0) 24%, rgba(248, 250, 252, 0) 76%, rgba(244, 247, 251, 0.85) 100%)'
                            : 'linear-gradient(to bottom, rgba(10, 23, 41, 0.78) 0%, rgba(10, 23, 41, 0) 24%, rgba(5, 5, 5, 0) 76%, rgba(5, 5, 5, 0.9) 100%)'
                    }}
                ></div>
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
                                <div className="block text-white">PAMOJA 16</div>
                                <div className="block text-white my-2">CIVIC</div>
                                <div className="block text-white">COMMAND</div>
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
                                <span className="text-[10px] font-bold">Explore Platform</span>
                            </a>
                        </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-3">
                        <button id="map-lock-btn" onClick={toggleLock} className="lock-btn border-white text-white hover:text-[#E5B80B] hover:border-[#E5B80B] transition-colors"><i id="lock-icon" className="fa-solid fa-lock text-lg"></i></button>
                        <p id="lock-text" className="text-[10px] md:text-[11px] font-bold text-white opacity-80 tracking-[0.15em] uppercase leading-tight text-right">Click to interact <br/> with map</p>
                        <a
                            href="https://www.openstreetmap.org/copyright"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[9px] font-mono text-white/60 hover:text-[#E5B80B] transition-colors"
                        >
                            &copy; OpenStreetMap contributors
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};
