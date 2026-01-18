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
 * @example
 * ```tsx
 * <ContactForm onSubmit={async (data) => {
 *   await sendEmail(data);
 * }} />
 * ```
 */
export default function ContactForm({ onSubmit, className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior: log to console
        console.log("Form submitted:", formData);
      }
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Submit button */}
      <div className="contact-form-submit mt-24">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar propuesta"}
        </Button>
      </div>
    </form>
  );
}