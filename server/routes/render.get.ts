import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { InputSchema, InvoiceSchema } from "#shared/validators";
import { toQueryString } from "#shared/utils";
import { construct } from "radash";

export default eventHandler(async (event) => {
  const query = await getValidatedQuery(event, (data) => {
    return InputSchema.parse(construct(data as any));
  });

  const google = useGoogle();
  const result = await generateObject({
    model: google("gemini-1.5-flash"),
    schema: InvoiceSchema.pick({
      title: true,
      items: true,
    }),
    prompt: `Generate an invoice based on the following information: ${query.prompt}`,
  });

  const invoice = {
    ...query,
    title: query.title ?? result.object.title,
    items: result.object.items,
  };

  const { page } = await hubBrowser();

  const url = getRequestURL(event);
  const qs = toQueryString(invoice);

  await page.goto(`${url.origin}/pdf?${qs}`, {
    waitUntil: "domcontentloaded",
  });

  setHeader(event, "content-type", "application/pdf");

  return page.pdf({
    format: "A4",
  });
});

export function useGoogle() {
  const config = useRuntimeConfig();

  return createGoogleGenerativeAI({
    baseURL: `https://gateway.ai.cloudflare.com/v1/${config.cloudflareAccountId}/${config.cloudflareGatewayId}/google-ai-studio/v1beta`,
    apiKey: config.googleAiToken,
  });
}
