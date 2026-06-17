import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

export default function ContactEmail({
  firstName,
  lastName,
  email,
  phone,
  message,
}: ContactEmailProps) {
  const previewText = `Nova mensagem de ${firstName} ${lastName} via Portfólio`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Heading style={headerTitle}>Nova Mensagem de Contato</Heading>
            <Text style={headerSubtitle}>Recebida através do seu portfólio</Text>
          </Section>

          <Section style={contentSection}>
            <Text style={label}>Detalhes do Remetente</Text>
            <div style={infoBox}>
              <Text style={infoText}>
                <strong>Nome:</strong> {firstName} {lastName}
              </Text>
              <Text style={infoText}>
                <strong>E-mail:</strong> <a href={`mailto:${email}`} style={link}>{email}</a>
              </Text>
              {phone && (
                <Text style={infoText}>
                  <strong>Telefone:</strong> <a href={`tel:${phone}`} style={link}>{phone}</a>
                </Text>
              )}
            </div>

            <Hr style={divider} />

            <Text style={label}>Mensagem</Text>
            <div style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </div>
          </Section>

          <Section style={footerSection}>
            <Text style={footerText}>
              Este e-mail foi gerado automaticamente pelo seu Portfólio.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Estilos
const main = {
  backgroundColor: "#f4f4f5",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "40px auto",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  maxWidth: "600px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  border: "1px solid #e4e4e7",
};

const headerSection = {
  backgroundColor: "#09090b",
  padding: "32px 40px",
  textAlign: "center" as const,
};

const headerTitle = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0",
  padding: "0",
};

const headerSubtitle = {
  color: "#a1a1aa",
  fontSize: "14px",
  marginTop: "8px",
};

const contentSection = {
  padding: "40px",
};

const label = {
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  color: "#71717a",
  marginBottom: "12px",
};

const infoBox = {
  backgroundColor: "#fafafa",
  borderRadius: "8px",
  padding: "16px 20px",
  border: "1px solid #f4f4f5",
};

const infoText = {
  fontSize: "15px",
  color: "#27272a",
  margin: "8px 0",
  lineHeight: "1.5",
};

const link = {
  color: "#2563eb",
  textDecoration: "none",
};

const divider = {
  borderColor: "#e4e4e7",
  margin: "32px 0",
};

const messageBox = {
  backgroundColor: "#fafafa",
  borderRadius: "8px",
  padding: "20px",
  border: "1px solid #f4f4f5",
};

const messageText = {
  fontSize: "15px",
  color: "#27272a",
  lineHeight: "1.6",
  whiteSpace: "pre-wrap" as const,
  margin: "0",
};

const footerSection = {
  backgroundColor: "#fafafa",
  padding: "24px 40px",
  textAlign: "center" as const,
  borderTop: "1px solid #e4e4e7",
};

const footerText = {
  fontSize: "12px",
  color: "#a1a1aa",
  margin: "0",
};
