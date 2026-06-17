import { validateUIMessages } from "ai";
import { ZodError } from "zod";

import {
  DEFAULT_CHAT_MODEL,
  chatModelOptions,
} from "@/features/chat/application/chat-models";
import {
  chatCompletionRequestSchema,
  normalizeChatMessages,
} from "@/features/chat/application/chat-request.schema";
import { buildStreamChatCompletion } from "@/features/chat/composition/chat-container";

export const maxDuration = 30;

const MISSING_GROQ_API_KEY_MESSAGE =
  "GROQ_API_KEY nao esta configurada no ambiente do servidor.";

export function GET(): Response {
  return Response.json({
    defaultModel: DEFAULT_CHAT_MODEL,
    models: chatModelOptions,
  });
}

export async function POST(request: Request): Promise<Response> {
  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { error: MISSING_GROQ_API_KEY_MESSAGE },
      { status: 503 }
    );
  }

  try {
    const body: unknown = await request.json();
    const parsedBody = chatCompletionRequestSchema.parse(body);
    const messages = normalizeChatMessages(parsedBody.messages);
    const validatedMessages = await validateUIMessages({ messages });
    const model = parsedBody.model ?? DEFAULT_CHAT_MODEL;
    const streamChatCompletion = buildStreamChatCompletion();

    return streamChatCompletion.execute({
      messages: validatedMessages,
      model,
    });
  } catch (error) {
    return handleChatRouteError(error);
  }
}

function handleChatRouteError(error: unknown): Response {
  if (error instanceof SyntaxError) {
    return Response.json(
      { error: "Corpo JSON invalido para o chat." },
      { status: 400 }
    );
  }

  if (error instanceof ZodError) {
    return Response.json(
      {
        error: "Requisicao invalida para o chat.",
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  return Response.json(
    { error: "Nao foi possivel processar a mensagem do chat." },
    { status: 500 }
  );
}
