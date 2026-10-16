export default function Home() {
  return (
    <main className="relative isolate flex flex-1 flex-col overflow-hidden px-4 text-center">
      {/* Soft Arizona sky backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50"
      />
      <svg
        aria-hidden
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 -z-10 h-72 w-full fill-[#f3e6d4] sm:h-80"
      >
        <path d="M0 220V150l120-30 60 10 40-60h120l30 50 90 20 110-40 70 10 50-70h160l40 60 120 30 90-20 80 40 110-30 150 20v100z" />
      </svg>

      <section className="flex flex-1 flex-col items-center justify-center py-16">
        <p className="mb-6 rounded-full border border-sky-200 bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-sky-700">
          Coming Soon
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-800 sm:text-6xl">
          Injury Payout <span className="text-sky-600">Arizona</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-slate-600 sm:text-lg">
          We&apos;re building something to help Arizona residents understand
          what their injury claim could be worth. Check back soon.
        </p>
      </section>

      <footer className="mx-auto max-w-2xl space-y-2 pb-8 text-xs leading-relaxed text-slate-600">
        <p className="font-semibold uppercase tracking-[0.25em] text-slate-700">
          Coming Soon
        </p>
        <p>
          Injury Payout Arizona is a trading name of Above All Enterprises,
          LLC, a limited liability company registered in the State of Wyoming,
          United States.
        </p>
        <p>Company Registration Number: 2025-001683244</p>
        <p>
          Registered Address: 1712 Pioneer Ave., Suite 115, Cheyenne, WY 82001,
          USA.
        </p>
        <p>&copy; 2026 Injury Payout Arizona. All rights reserved.</p>
      </footer>
    </main>
  );
}
