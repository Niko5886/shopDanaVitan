import AboutEditorialSection from "../../components/AboutEditorialSection";

export const metadata = {
  title: "За нас",
  description:
    "Историята зад Dana Vitan — отдаденост към детайла, стил и духа на българската шевица в съвременна бутикова мода.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen text-[color:var(--foreground)]">
      <main className="relative z-10 px-6 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl">
          <AboutEditorialSection headingLevel="h1" />
        </div>
      </main>
    </div>
  );
}
