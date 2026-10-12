import { useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  CircleAlert,
  CircleCheck,
  Globe,
  LoaderCircle,
  Mail,
  Send,
} from "lucide-react";

import FormField from "../components/FormField";
import SectionHeading from "../components/SectionHeading";
import { site } from "../data/content";
import { validateContact, type ContactErrors } from "../lib/validateContact";
import type { ContactFormValues } from "../types";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as
  | string
  | undefined;

const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as
  | string
  | undefined;

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as
  | string
  | undefined;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);

  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    if (status === "error" || status === "success") {
      setStatus("idle");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const foundErrors = validateContact(values);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) {
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error(
        "Missing EmailJS configuration. Check your .env.local file.",
      );

      setStatus("error");
      return;
    }

    // Honeypot field to help detect automated spam submissions.
    const honeypot = form.elements.namedItem("_gotcha");

    if (honeypot instanceof HTMLInputElement && honeypot.value.trim() !== "") {
      setValues(initialValues);
      setStatus("success");
      return;
    }

    setStatus("submitting");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: values.name,
          email: values.email,
          message: values.message,
        },
        {
          publicKey: PUBLIC_KEY,
        },
      );

      setValues(initialValues);
      setErrors({});
      setStatus("success");
    } catch (error) {
      console.error("Failed to send contact message:", error);
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24">
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          title="Contact"
          description="Have a project in mind? Send us a message and we'll get back to you."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-5">
          {/* Contact information */}
          <ul className="space-y-6 lg:col-span-2">
            <li className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 text-primary" aria-hidden="true" />

              <div>
                <p className="font-medium text-text">Email</p>

                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors hover:text-primary"
                >
                  {site.email}
                </a>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <Globe className="mt-1 h-5 w-5 text-primary" aria-hidden="true" />

              <div>
                <p className="font-medium text-text">Availability</p>

                <p>Remote, working with clients worldwide</p>
              </div>
            </li>
          </ul>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 rounded-xl border border-border bg-surface p-6 shadow-md lg:col-span-3"
          >
            <FormField
              id="name"
              name="name"
              label="Name"
              autoComplete="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
            />

            <FormField
              id="email"
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />

            <FormField
              id="message"
              name="message"
              label="Message"
              multiline
              value={values.message}
              onChange={handleChange}
              error={errors.message}
            />

            {/* Honeypot: hidden from normal visitors */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-on-primary shadow-glow transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <LoaderCircle
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}

              {isSubmitting ? "Sending…" : "Send message"}
            </button>

            <div aria-live="polite" className="min-h-6 text-sm">
              {status === "success" && (
                <p className="flex items-center gap-2 text-success">
                  <CircleCheck
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  Thanks! Your message is on its way.
                </p>
              )}

              {status === "error" && (
                <p className="flex items-center gap-2 text-error">
                  <CircleAlert
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
