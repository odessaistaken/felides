import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Clients from './components/Clients';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Clients />
      </main>
      <Footer />
    </div>
  );
}

export default App;
