import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12 flex flex-col gap-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div className="max-w-md">
            <div className="text-3xl font-bold tracking-tighter mb-6">
              FELIDES<span className="text-zinc-500">.</span>
            </div>
            <p className="text-zinc-400 text-lg">
              Sınırları aşan dijital deneyimler tasarlıyoruz. Fikriniz mi var? Hadi konuşalım.
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-zinc-300 uppercase tracking-wider text-sm mb-2">İletişim</h4>
              <a href="mailto:hello@felides.com" className="text-zinc-400 hover:text-white transition-colors">hello@felides.com</a>
              <p className="text-zinc-400">+90 (555) 123 45 67</p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-zinc-300 uppercase tracking-wider text-sm mb-2">Sosyal</h4>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1">Instagram <ArrowUpRight size={14} /></a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1">Twitter <ArrowUpRight size={14} /></a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1">LinkedIn <ArrowUpRight size={14} /></a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1">Awwwards <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-sm border-t border-zinc-900 pt-8">
          <p>&copy; {new Date().getFullYear()} Felides Agency. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
