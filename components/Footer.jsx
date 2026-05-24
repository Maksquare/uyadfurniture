'use client';

export default function Footer() {
  const socialLinks = [
    { name: 'Telegram', channel: 'UYAD Furniture', icon: 'ri-telegram-fill', color: 'hover:bg-[#229ED9]/10 hover:text-[#229ED9] dark:hover:bg-[#229ED9]/20', url: 'https://t.me/uyadfurniture' },
    { name: 'Instagram', channel: '@uyadfurniture', icon: 'ri-instagram-line', color: 'hover:bg-[#E1306C]/10 hover:text-[#E1306C] dark:hover:bg-[#E1306C]/20', url: 'https://instagram.com/uyadfurniture' },
    { name: 'TikTok', channel: '@uyadfurniture', icon: 'ri-tiktok-fill', color: 'hover:bg-black/5 hover:text-black dark:hover:bg-white/10 dark:hover:text-white', url: 'https://tiktok.com/@uyadfurniture' },
    { name: 'YouTube', channel: 'UYAD Showroom', icon: 'ri-youtube-fill', color: 'hover:bg-[#FF0000]/10 hover:text-[#FF0000] dark:hover:bg-[#FF0000]/20', url: 'https://youtube.com' }
  ];

  return (
    <div className="relative w-full bg-transparent overflow-visible">
      
      {/* ── THE ULTIMATE MASK ── 
          This element sits behind the curve and matches the exact background color of your website.
          It physically covers up any rogue sharp edges behind the footer container. */}
      <div className="absolute top-0 right-0 w-[220px] h-[220px] bg-[#f8fafc] dark:bg-[#071320] transition-colors duration-500 z-0 pointer-events-none" />

      <footer 
        id="contact" 
        className="isolate relative z-10 w-full overflow-hidden xl:rounded-tr-[200px] bg-[#143755] dark:bg-[#0b1b2b] transition-colors duration-500 font-[family:var(--font-jost)] select-none"
      >
        <div className="px-6 py-16 text-white">
          <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Identity Grid Column */}
            <div>
              <h3 className="font-[family:var(--font-dm-serif)] text-3xl text-[#f1ae2c] mb-4 tracking-wider">UYAD.</h3>
              <p className="max-w-xs text-sm font-light leading-relaxed text-slate-300 dark:text-slate-400">
                Elevating functional living modules through precision materials and striking minimalist profiles.
              </p>
            </div>

            {/* Dynamic Social Cards Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f1ae2c] mb-6">Connect Channels</h4>
              <div className="grid grid-cols-1 gap-3">
                {socialLinks.map((soc) => (
                  <a 
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 group ${soc.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <i className={`${soc.icon} text-xl text-white/70 group-hover:scale-105 transition-transform`} />
                      <div>
                        <p className="text-xs font-bold text-white/40">{soc.name}</p>
                        <p className="text-sm font-medium text-white group-hover:text-inherit transition-colors">{soc.channel}</p>
                      </div>
                    </div>
                    <i className="ri-arrow-right-s-line opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact/Showroom Booking Block */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f1ae2c] mb-6">Showroom Enquiries</h4>
              <p className="text-sm font-light text-slate-300 dark:text-slate-400 mb-6 leading-relaxed">
                Schedule a private layout presentation with our architectural consultants.
              </p>
              <a 
                href="https://wa.me/251912345678?text=Hello%20UYAD!%20I%27d%20like%20to%20book%20a%20showroom%20visit." 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f1ae2c] px-6 py-4 text-sm font-bold uppercase tracking-wider text-[#143755] transition-all duration-300 hover:bg-white hover:text-[#143755] dark:hover:bg-white dark:hover:text-[#0b1b2b] shadow-lg hover:shadow-xl"
              >
                <i className="ri-whatsapp-fill text-lg" /> Book Showroom via WhatsApp
              </a>
            </div>

          </div>

          <div className="mx-auto max-w-7xl mt-12 pt-8 border-t border-white/5 text-center text-xs font-light text-slate-400/60 dark:text-slate-500">
            &copy; {new Date().getFullYear()} UYAD Premium Furniture. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}