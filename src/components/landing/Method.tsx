const steps = [
  "Llamada 15 min - Entendemos tu objetivo y contexto.",
  "Brief estratégico - Definimos alcance, requisitos y criterios de selección.",
  "Propuesta en 72h - Partner recomendado + plan + presupuesto estimado.",
  "Seguimiento de hitos - Supervisión estratégica sin ejecución directa.",
];

export default function Method() {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-2xl font-semibold text-[#0E2A47] md:text-3xl">Nuestro método</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step} className="rounded-md border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-[#0E2A47]">Paso {index + 1}</p>
              <p className="mt-2 text-slate-600">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
