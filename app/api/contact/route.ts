import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const EMAIL_CONFIG = {
  from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev", // Sender email
  to: "info@theartistic-project.com", // Your company email
  replyTo: "", // Will be set to the form submitter's email
} as const;

// Type definitions for form data
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * Validates the contact form data
 * @param data - The form data to validate
 * @returns Object with isValid boolean and error message if invalid
 */
function validateFormData(data: unknown): {
  isValid: boolean;
  error?: string;
  data?: ContactFormData;
} {
  if (!data || typeof data !== "object") {
    return { isValid: false, error: "Invalid request body" };
  }

  const formData = data as Partial<ContactFormData>;

  // Validate required fields
  if (!formData.name || typeof formData.name !== "string" || formData.name.trim().length === 0) {
    return { isValid: false, error: "Name is required" };
  }

  if (!formData.email || typeof formData.email !== "string") {
    return { isValid: false, error: "Email is required" };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return { isValid: false, error: "Invalid email address" };
  }

  if (!formData.message || typeof formData.message !== "string" || formData.message.trim().length === 0) {
    return { isValid: false, error: "Message is required" };
  }

  // Phone is optional but validate format if provided
  if (formData.phone && typeof formData.phone !== "string") {
    return { isValid: false, error: "Invalid phone number format" };
  }

  return {
    isValid: true,
    data: {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || "",
      message: formData.message.trim(),
    },
  };
}

/**
 * Generates the HTML email template
 */
function generateEmailHTML(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Consulta de Contacto</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px; border-bottom: 3px solid #000000;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #000000;">
                Nueva Consulta de Contacto
              </h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #666666;">
                Recibido desde el formulario de contacto web
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <!-- Name -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #666666;">
                      Nombre
                    </p>
                    <p style="margin: 0; font-size: 16px; color: #000000;">
                      ${data.name}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Email -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #666666;">
                      Email
                    </p>
                    <p style="margin: 0; font-size: 16px;">
                      <a href="mailto:${data.email}" style="color: #0066cc; text-decoration: none;">
                        ${data.email}
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
              
              ${
                data.phone
                  ? `
              <!-- Phone -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #666666;">
                      Teléfono
                    </p>
                    <p style="margin: 0; font-size: 16px;">
                      <a href="tel:${data.phone}" style="color: #0066cc; text-decoration: none;">
                        ${data.phone}
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
              `
                  : ""
              }
              
              <!-- Message -->
              <table role="presentation" style="width: 100%; margin-bottom: 0;">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #666666;">
                      Mensaje
                    </p>
                    <div style="margin: 0; padding: 16px; background-color: #f9f9f9; border-radius: 4px; border-left: 4px solid #000000;">
                      <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #333333; white-space: pre-wrap;">
${data.message}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f9f9f9; border-top: 1px solid #e5e5e5; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; font-size: 12px; color: #999999; text-align: center;">
                Este mensaje fue enviado desde el formulario de contacto de The Artistic Project
              </p>
              <p style="margin: 8px 0 0; font-size: 12px; color: #999999; text-align: center;">
                Fecha: ${new Date().toLocaleString("es-ES", {
                  timeZone: "Europe/Madrid",
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generates the plain text version of the email
 */
function generateEmailText(data: ContactFormData): string {
  return `
NUEVA CONSULTA DE CONTACTO
=========================

Nombre: ${data.name}
Email: ${data.email}
${data.phone ? `Teléfono: ${data.phone}` : ""}

Mensaje:
--------
${data.message}

---
Este mensaje fue enviado desde el formulario de contacto de The Artistic Project
Fecha: ${new Date().toLocaleString("es-ES", {
    timeZone: "Europe/Madrid",
    dateStyle: "full",
    timeStyle: "short",
  })}
  `.trim();
}

/**
 * POST /api/contact
 * Handles contact form submissions and sends email via Resend
 */
export async function POST(request: NextRequest) {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured. Please contact the administrator.",
        },
        { status: 500 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    // Validate form data
    const validation = validateFormData(body);
    if (!validation.isValid || !validation.data) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error || "Invalid form data",
        },
        { status: 400 }
      );
    }

    const formData = validation.data;

    // Send email using Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.to,
      replyTo: formData.email, // Set reply-to as the form submitter's email
      subject: `Nueva consulta de contacto de ${formData.name}`,
      html: generateEmailHTML(formData),
      text: generateEmailText(formData),
    });

    // Handle email sending errors
    if (emailError) {
      console.error("Resend API error:", emailError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send email. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Success response
    console.log("Email sent successfully:", emailData?.id);
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
        emailId: emailData?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    // Catch any unexpected errors
    console.error("Unexpected error in contact API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/contact
 * Handles CORS preflight requests
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
