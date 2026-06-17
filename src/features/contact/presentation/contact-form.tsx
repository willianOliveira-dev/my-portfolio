"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button as StatefulButton } from "@/components/ui/stateful-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { ContactFormValues } from "../contact.types";
import { getContactSchema } from "../contact.schema";
import { useCurrentLocale } from "@/hooks/use-current-locale";
import * as m from "@/paraglide/messages";
import { formatPhone } from "@/shared/utils/format-phone";

export function ContactForm() {
  const { locale } = useCurrentLocale();
  const contactSchema = getContactSchema(locale);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitStatus("loading");
    setErrorMessage(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Você atingiu o limite de mensagens. Tente novamente mais tarde.");
        }
        throw new Error("Ocorreu um erro ao enviar a mensagem.");
      }

      setSubmitStatus("success");
      form.reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setSubmitStatus("error");
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      setTimeout(() => {
        setSubmitStatus("idle");
        setErrorMessage(null);
      }, 5000);
    }
  }


  return (
    <div className="relative w-full overflow-hidden rounded-2xl border bg-background/50 p-6 shadow-xl backdrop-blur-md sm:p-10">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{m.contact_first_name_label({}, { locale })}</FormLabel>
                  <FormControl>
                    <Input placeholder={m.contact_first_name_placeholder({}, { locale })} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{m.contact_last_name_label({}, { locale })}</FormLabel>
                  <FormControl>
                    <Input placeholder={m.contact_last_name_placeholder({}, { locale })} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{m.contact_email_label({}, { locale })}</FormLabel>
                  <FormControl>
                    <Input placeholder={m.contact_email_placeholder({}, { locale })} type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{m.contact_phone_label({}, { locale })}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={m.contact_phone_placeholder({}, { locale })} 
                      {...field} 
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value, locale);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{m.contact_message_label({}, { locale })}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={m.contact_message_placeholder({}, { locale })}
                    className="min-h-[120px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errorMessage && (
            <div className="text-destructive text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <StatefulButton
              type="submit"
              status={submitStatus}
            >
              {m.contact_submit_button({}, { locale })}
            </StatefulButton>
          </div>
        </form>
      </Form>

      <BorderBeam
        size={300}
        duration={5}
        delay={2}
        className="from-transparent via-red-600 to-transparent dark:via-red-500"
      />
    </div>
  );
}
