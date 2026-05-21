import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/50 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter">
          FELIDES<span className="text-zinc-500">.</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <a href="#" className="hover:text-zinc-400 transition-colors">HİZMETLER</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">REFERANSLAR</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">İLETİŞİM</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-t border-zinc-800 flex flex-col p-6 gap-6">
          <a href="#" className="text-lg font-medium tracking-wide">HİZMETLER</a>
          <a href="#" className="text-lg font-medium tracking-wide">REFERANSLAR</a>
          <a href="#" className="text-lg font-medium tracking-wide">İLETİŞİM</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
