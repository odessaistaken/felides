const clients = [
  "Acme Corp", "GlobalTech", "Nexus Industries", "Stark Industries", "Wayne Enterprises", "Oscorp", "Cyberdyne", "Umbrella Corp"
];

const Clients = () => {
  return (
    <section className="py-24 bg-zinc-950 overflow-hidden relative border-y border-zinc-900">
      {/* Gradient Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>
      
      <div className="flex w-full">
        {/* Animated Marquee Track */}
        <div className="flex whitespace-nowrap animate-marquee">
          {clients.map((client, i) => (
            <div key={i} className="flex items-center justify-center min-w-[250px] mx-8">
              <span className="text-2xl md:text-4xl font-black text-zinc-800 uppercase tracking-widest hover:text-white transition-colors duration-500 cursor-default">
                {client}
              </span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {clients.map((client, i) => (
            <div key={`dup-${i}`} className="flex items-center justify-center min-w-[250px] mx-8">
              <span className="text-2xl md:text-4xl font-black text-zinc-800 uppercase tracking-widest hover:text-white transition-colors duration-500 cursor-default">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
