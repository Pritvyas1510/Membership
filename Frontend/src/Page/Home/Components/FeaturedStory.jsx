import { TbArrowIteration } from "react-icons/tb";
import Logo from "../../../../Public/Image/Logo.png"

// src/components/FeaturedStory.jsx
const FeaturedStory = () => {
  return (
    <section className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-orange-200 dark:bg-orange-900/20 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-blue-100 dark:bg-blue-900/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Column */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl rotate-3 blur-sm" />
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200"
                alt="Volunteers installing solar panels in rural community"
                className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />

              {/* Floating Stat Box */}
              <div className="absolute -bottom-8 -right-8 md:bottom-8 md:-right-8 bg-white dark:bg-surface-dark p-6 rounded-xl shadow-xl border border-gray-100 dark:border-white/10 max-w-xs animate-bounce" style={{ animationDuration: "3s" }}>
                <div className="flex items-center gap-4 ">
                  <div className="size-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg"> <img src={Logo} className="rounded-full border-2 border-black" alt="Profile" /></span>
                  </div>
                  <div>
                    <p className="text-[#2c5466] text-lg uppercase font-bold">Monark Foundation</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest">Featured Impact Story</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white leading-tight mb-6">
              Lighting Up <br />
              <span className="text-primary">Rural Gujarat's Future</span>
            </h2>

            <p className="text-lg text-text-main/70 dark:text-white/70 mb-6 leading-relaxed">
              Access to reliable electricity is transforming lives in remote villages. In our latest project, 
              we partnered with local communities to install solar micro-grids in more than 12 villages.
            </p>

            <p className="text-base text-text-main/60 dark:text-white/60 mb-8 leading-relaxed">
              Children can now study in the evenings, small businesses are growing, and medical equipment 
              stays functional — all thanks to clean, sustainable energy.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="pl-4 border-l-4 border-primary/30">
                <h4 className="text-2xl font-bold text-text-main dark:text-white">1,800+</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">People impacted</p>
              </div>
              <div className="pl-4 border-l-4 border-primary/30">
                <h4 className="text-2xl font-bold text-text-main dark:text-white">24/7</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reliable power</p>
              </div>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-text-main dark:bg-orange-500 text-black dark:text-surface-dark rounded-lg font-bold hover:bg-primary hover:text-white dark:hover:bg-primary transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Read the full story
              <span className="material-symbols-outlined"><TbArrowIteration size={32}/></span>
            </a>
          </div>
        </div>
      </div>  
    </section>
  );
};

export default FeaturedStory;