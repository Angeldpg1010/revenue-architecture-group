export default function Hero() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="text-sm font-medium text-slate-500">Proceso estructurado · Partners verificados · Comparativa objetiva</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[#0E2A47] md:text-5xl">
          Evita elegir mal proveedor tecnológico y gana control desde el primer día.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          Definimos alcance y criterios de decisión, seleccionamos especialistas verificados y te presentamos una propuesta cerrada en 72 horas para avanzar con criterio.
        </p>
        <a
          href="#contacto"
          className="mt-10 inline-flex rounded-md bg-[#13C4A3] px-6 py-3 text-sm font-semibold text-[#0E2A47] transition hover:bg-[#0FB193] focus:ring-2 focus:ring-[#0E2A47] focus:outline-none"
        >
          Reservar llamada (15 min)
        </a>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Sin compromiso. Te diremos si merece la pena avanzar y con qué enfoque.
        </p>
      </div>
    </section>
  );
}
