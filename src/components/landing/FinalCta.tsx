export default function FinalCta() {
  return (
    <section id="contacto" className="bg-[#0E2A47]">
      <div className="mx-auto max-w-6xl px-6 py-20 text-white md:py-24">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          Define el alcance. Elige bien. Controla la ejecución.
        </h2>
        <p className="mt-5 max-w-2xl text-slate-200">
          15 minutos para alinear objetivo y próximos pasos.
        </p>
        <a
          href="#contacto"
          className="mt-10 inline-flex rounded-md bg-[#13C4A3] px-8 py-4 text-base font-semibold text-[#0E2A47] transition hover:bg-[#0FB193] focus:ring-2 focus:ring-white focus:outline-none"
        >
          Reservar llamada (15 min)
        </a>
        <p className="mt-5 max-w-2xl text-slate-200">
          Confidencial. No compartimos tu información sin tu aprobación. Si encaja, te presentamos plan y partner en 72h.
        </p>
      </div>
    </section>
  );
}
