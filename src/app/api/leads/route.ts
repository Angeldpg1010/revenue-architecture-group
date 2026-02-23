import { NextResponse } from "next/server";

type LeadPayload = {
  nombre?: string;
  empresa?: string;
  email?: string;
  tamanoEquipo?: string;
  problemaPrincipal?: string;
  rgpd?: boolean;
};

function validatePayload(payload: LeadPayload) {
  const fieldErrors: Record<string, string> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validTeamSizes = new Set(["2-5", "6-10", "11-20", "Más de 20"]);

  if (!payload.nombre || payload.nombre.trim().length < 2) {
    fieldErrors.nombre = "Introduce un nombre válido (mínimo 2 caracteres).";
  }

  if (!payload.empresa || payload.empresa.trim().length < 2) {
    fieldErrors.empresa = "Introduce una empresa válida (mínimo 2 caracteres).";
  }

  if (!payload.email || !emailRegex.test(payload.email.trim())) {
    fieldErrors.email = "Introduce un email válido.";
  }

  if (!payload.tamanoEquipo || !validTeamSizes.has(payload.tamanoEquipo)) {
    fieldErrors.tamanoEquipo = "Selecciona un tamaño de equipo válido.";
  }

  const problemLength = payload.problemaPrincipal?.trim().length ?? 0;
  if (problemLength < 10 || problemLength > 500) {
    fieldErrors.problemaPrincipal =
      "Describe el problema principal (entre 10 y 500 caracteres).";
  }

  if (payload.rgpd !== true) {
    fieldErrors.rgpd = "Debes aceptar la política de privacidad.";
  }

  return fieldErrors;
}

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "***";
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload;
    const fieldErrors = validatePayload(payload);

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Hay campos incompletos o no válidos.",
          fieldErrors,
        },
        { status: 400 },
      );
    }

    // Log mínimo para control operativo, sin exponer datos completos en texto plano.
    console.info("[lead] New lead captured", {
      empresa: payload.empresa?.trim(),
      teamSize: payload.tamanoEquipo,
      emailMasked: payload.email ? maskEmail(payload.email.trim()) : "***",
    });

    // TODO: Integrar envío del lead a CRM/automatización (Webhook/Make/Zapier/HubSpot).
    // Ejemplo: await fetch(process.env.LEAD_WEBHOOK_URL!, { method: "POST", body: JSON.stringify(payload) })

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "No hemos podido procesar la solicitud. Inténtalo de nuevo.",
      },
      { status: 400 },
    );
  }
}
