"use client";

import { FormEvent, useMemo, useState } from "react";

type LeadFormData = {
  nombre: string;
  empresa: string;
  email: string;
  tamanoEquipo: string;
  problemaPrincipal: string;
  rgpd: boolean;
};

type FieldErrors = Partial<Record<keyof LeadFormData, string>>;

const initialData: LeadFormData = {
  nombre: "",
  empresa: "",
  email: "",
  tamanoEquipo: "",
  problemaPrincipal: "",
  rgpd: false,
};

function validateForm(data: LeadFormData): FieldErrors {
  const errors: FieldErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.nombre || data.nombre.trim().length < 2) {
    errors.nombre = "Introduce un nombre válido (mínimo 2 caracteres).";
  }

  if (!data.empresa || data.empresa.trim().length < 2) {
    errors.empresa = "Introduce una empresa válida (mínimo 2 caracteres).";
  }

  if (!emailRegex.test(data.email.trim())) {
    errors.email = "Introduce un email válido.";
  }

  if (!data.tamanoEquipo) {
    errors.tamanoEquipo = "Selecciona el tamaño de equipo.";
  }

  const problemLength = data.problemaPrincipal.trim().length;
  if (problemLength < 10 || problemLength > 500) {
    errors.problemaPrincipal =
      "Describe el problema principal (entre 10 y 500 caracteres).";
  }

  if (!data.rgpd) {
    errors.rgpd = "Debes aceptar la política de privacidad.";
  }

  return errors;
}

export default function FinalCta() {
  const [formData, setFormData] = useState<LeadFormData>(initialData);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [formMessage, setFormMessage] = useState("");

  const isLoading = status === "loading";
  const textAreaCount = useMemo(
    () => formData.problemaPrincipal.trim().length,
    [formData.problemaPrincipal],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage("");
    setStatus("idle");

    const clientErrors = validateForm(formData);
    setFieldErrors(clientErrors);

    if (Object.keys(clientErrors).length > 0) {
      setStatus("error");
      setFormMessage("Revisa los campos marcados antes de enviar.");
      return;
    }

    try {
      setStatus("loading");
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as {
        ok: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setFieldErrors(result.fieldErrors ?? {});
        setFormMessage(
          result.error ?? "No hemos podido enviar tu solicitud. Inténtalo de nuevo.",
        );
        return;
      }

      setStatus("success");
      setFieldErrors({});
      setFormMessage("Listo. Te contactaremos en breve para agendar.");
      setFormData(initialData);
      (window as { trackEvent?: (event: string, params?: Record<string, string>) => void })
        .trackEvent?.("lead_submit", { team_size: formData.tamanoEquipo });
    } catch {
      setStatus("error");
      setFormMessage(
        "Ha ocurrido un error de conexión. Vuelve a intentarlo en unos minutos.",
      );
    }
  }

  return (
    <section id="diagnostico" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="rounded-2xl bg-[#0E2A47] p-8 text-white md:p-12">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Si tenéis leads pero no tenéis control, es momento de estructurar
            el sistema.
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-200">
            Revisamos vuestro proceso actual y os diremos exactamente qué
            optimizar.
          </p>
          <a
            href="#diagnostico"
            aria-label="Reservar diagnóstico gratuito"
            className="mt-8 inline-flex rounded-md bg-[#00B8F5] px-6 py-3 font-semibold text-[#0A1B2E] transition hover:bg-[#20C6FC] focus:ring-2 focus:ring-white focus:outline-none"
          >
            Reservar diagnóstico gratuito
          </a>

          <form className="mt-8 grid gap-5" onSubmit={onSubmit} noValidate>
            <div className="grid gap-2">
              <label htmlFor="nombre" className="text-sm font-medium text-zinc-100">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                minLength={2}
                value={formData.nombre}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, nombre: event.target.value }))
                }
                aria-invalid={Boolean(fieldErrors.nombre)}
                className="rounded-md border border-zinc-500 bg-white px-4 py-3 text-[#0A1B2E] outline-none transition focus:ring-2 focus:ring-[#00B8F5]"
              />
              {fieldErrors.nombre ? (
                <p className="text-sm text-red-300" role="alert">
                  {fieldErrors.nombre}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <label htmlFor="empresa" className="text-sm font-medium text-zinc-100">
                Empresa
              </label>
              <input
                id="empresa"
                name="empresa"
                type="text"
                required
                minLength={2}
                value={formData.empresa}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, empresa: event.target.value }))
                }
                aria-invalid={Boolean(fieldErrors.empresa)}
                className="rounded-md border border-zinc-500 bg-white px-4 py-3 text-[#0A1B2E] outline-none transition focus:ring-2 focus:ring-[#00B8F5]"
              />
              {fieldErrors.empresa ? (
                <p className="text-sm text-red-300" role="alert">
                  {fieldErrors.empresa}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-100">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, email: event.target.value }))
                }
                aria-invalid={Boolean(fieldErrors.email)}
                className="rounded-md border border-zinc-500 bg-white px-4 py-3 text-[#0A1B2E] outline-none transition focus:ring-2 focus:ring-[#00B8F5]"
              />
              {fieldErrors.email ? (
                <p className="text-sm text-red-300" role="alert">
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <label htmlFor="tamanoEquipo" className="text-sm font-medium text-zinc-100">
                Tamaño del equipo comercial
              </label>
              <select
                id="tamanoEquipo"
                name="tamanoEquipo"
                required
                value={formData.tamanoEquipo}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, tamanoEquipo: event.target.value }))
                }
                aria-invalid={Boolean(fieldErrors.tamanoEquipo)}
                className="rounded-md border border-zinc-500 bg-white px-4 py-3 text-[#0A1B2E] outline-none transition focus:ring-2 focus:ring-[#00B8F5]"
              >
                <option value="">Selecciona una opción</option>
                <option value="2-5">2-5</option>
                <option value="6-10">6-10</option>
                <option value="11-20">11-20</option>
                <option value="Más de 20">Más de 20</option>
              </select>
              {fieldErrors.tamanoEquipo ? (
                <p className="text-sm text-red-300" role="alert">
                  {fieldErrors.tamanoEquipo}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="problemaPrincipal"
                className="text-sm font-medium text-zinc-100"
              >
                Problema principal
              </label>
              <textarea
                id="problemaPrincipal"
                name="problemaPrincipal"
                required
                minLength={10}
                maxLength={500}
                rows={5}
                value={formData.problemaPrincipal}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    problemaPrincipal: event.target.value,
                  }))
                }
                aria-invalid={Boolean(fieldErrors.problemaPrincipal)}
                className="rounded-md border border-zinc-500 bg-white px-4 py-3 text-[#0A1B2E] outline-none transition focus:ring-2 focus:ring-[#00B8F5]"
              />
              <p className="text-xs text-zinc-300">{textAreaCount}/500</p>
              {fieldErrors.problemaPrincipal ? (
                <p className="text-sm text-red-300" role="alert">
                  {fieldErrors.problemaPrincipal}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <label className="inline-flex items-center gap-3 text-sm text-zinc-100">
                <input
                  id="rgpd"
                  name="rgpd"
                  type="checkbox"
                  required
                  checked={formData.rgpd}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, rgpd: event.target.checked }))
                  }
                  aria-invalid={Boolean(fieldErrors.rgpd)}
                  className="h-4 w-4 rounded border-zinc-400 text-[#00B8F5] focus:ring-2 focus:ring-[#00B8F5]"
                />
                Acepto la política de privacidad.
              </label>
              {fieldErrors.rgpd ? (
                <p className="text-sm text-red-300" role="alert">
                  {fieldErrors.rgpd}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-fit rounded-md bg-[#00B8F5] px-6 py-3 font-semibold text-[#0A1B2E] transition hover:bg-[#20C6FC] focus:ring-2 focus:ring-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Enviando…" : "Enviar y reservar diagnóstico"}
            </button>

            {formMessage ? (
              <p
                className={status === "success" ? "text-green-300" : "text-red-300"}
                role="alert"
              >
                {formMessage}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
