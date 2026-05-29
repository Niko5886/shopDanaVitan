const cards = [
  { title: 'ЕТНО' },
  { title: 'Афро' },
  { title: 'КЕЖУАЛ' },
];

export default function PhilosophySection() {
  return (
    <section className="py-20 px-8 md:px-16 bg-[#0a0a0a]">
      <h2 className="text-center text-[#8B1A2F] uppercase tracking-widest text-sm font-medium mb-12">
        НАШАТА ФИЛОСОФИЯ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-[#111111] border border-[#8B1A2F]/20 rounded-lg p-8 flex flex-col gap-4 hover:border-[#8B1A2F]/60 transition-colors duration-300"
          >
            <span className="text-[#8B1A2F] text-3xl">✦</span>
            <h3 className="text-white text-lg font-semibold tracking-wide">{card.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
