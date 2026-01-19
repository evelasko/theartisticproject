"use client";

import { useState, FormEvent } from "react";
import Button from "./elements/Button";
import { TextField, TextArea } from "./elements/TextInput";

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  className?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormState {
  status: FormStatus;
  message: string;
}

/**
 * ContactForm Component
 * 
 * A contact form with a responsive grid layout that adapts to screen size.
 * Features TextField and TextArea components with animated underlines.
 * 
 * Layout:
 * - Large screens (≥992px): 2 columns (name/email/phone on left, message on right)
 * - Small/Medium screens (<992px): 1 column (stacked vertically)
 * 
 * Features:
 * - Validates form data client-side
 * - Sends email via /api/contact endpoint using Resend
 * - Shows success/error messages
 * - Resets form after successful submission
 * 
 * @example
 * ```tsx
 * <ContactForm />
 * ```
 */
export default function ContactForm({ onSubmit, className }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formState.status === "submitting") return;
    
    setFormState({ status: "submitting", message: "" });
    
    try {
      if (onSubmit) {
        // If custom onSubmit handler is provided, use it
        await onSubmit(formData);
        setFormState({
          status: "success",
          message: "¡Mensaje enviado con éxito! Te responderemos pronto.",
        });
      } else {
        // Default behavior: Send email via API
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to send message");
        }

        // Success!
        setFormState({
          status: "success",
          message: "¡Mensaje enviado con éxito! Te responderemos pronto.",
        });
        
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormState({ status: "idle", message: "" });
        }, 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      });

      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormState({ status: "idle", message: "" });
      }, 5000);
    }
  };

  const isSubmitting = formState.status === "submitting";
  const showMessage = formState.status === "success" || formState.status === "error";

  return (
    <form 
      onSubmit={handleSubmit} 
      className={className}
    >
      {/* Responsive grid: 2 columns on large screens, 1 column on small/medium screens */}
      <div className="contact-form-grid">
        {/* Personal info fields column */}
        <div className="contact-form-column">
          <TextField
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isSubmitting}
          />
          <TextField
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={isSubmitting}
          />
          <TextField
            name="phone"
            type="tel"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        {/* Message field column */}
        <div className="contact-form-column">
          <TextArea
            name="message"
            placeholder="¿Cómo podemos ayudarte?"
            rows={8}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Status message */}
      {showMessage && (
        <div
          className={`mt-16 p-16 rounded-sm text-center transition-all duration-300 ${
            formState.status === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
          role="alert"
        >
          {formState.message}
        </div>
      )}

      {/* Submit button */}
      <div className="contact-form-submit mt-24">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar propuesta"}
        </Button>
      </div>
    </form>
  );
}