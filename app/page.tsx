export default function Home() {
  return (
    <div className="min-h-screen text-[color:var(--foreground)]">
      <div className="relative overflow-visible">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,12,31,0.35),rgba(0,0,0,0))] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(122,12,31,0.2),rgba(0,0,0,0))] blur-3xl" />

        <main className="relative z-10">
          <section className="home-hero px-6 pt-20 sm:pt-24 lg:min-h-[calc(100vh-84px)] flex flex-col">
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col" />
          </section>
        </main>
      </div>
    </div>
  );
}
