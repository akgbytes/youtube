import { db } from "@/db";
import { videosTable } from "@/db/schema/videos";
import { mux } from "@/lib/mux";
import {
  VideoAssetCreatedWebhookEvent,
  VideoAssetErroredWebhookEvent,
  VideoAssetReadyWebhookEvent,
  VideoAssetTrackReadyWebhookEvent,
} from "@mux/mux-node/resources/webhooks";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

const SIGNING_SECRET = process.env.MUX_WEBHOOK_SIGNING_SECRET;

type WebhookEvent =
  | VideoAssetCreatedWebhookEvent
  | VideoAssetErroredWebhookEvent
  | VideoAssetReadyWebhookEvent
  | VideoAssetTrackReadyWebhookEvent;

export const POST = async (request: Request) => {
  if (!SIGNING_SECRET) {
    throw new Error("MUX_WEBHOOK_SIGNING_SECRET is missing");
  }

  const headersPayload = await headers();
  const muxSignature = headersPayload.get("mux-signature");

  if (!muxSignature) {
    return new Response("No signature found", { status: 401 });
  }

  const rawBody = await request.text();
  try {
    mux.webhooks.verifySignature(
      rawBody,
      { "mux-signature": muxSignature },
      SIGNING_SECRET
    );
  } catch {
    return new Response("Invalid signature", { status: 401 });
  }
  const payload = JSON.parse(rawBody);

  switch (payload.type as WebhookEvent["type"]) {
    case "video.asset.created": {
      const data = payload.data as VideoAssetCreatedWebhookEvent["data"];

      if (!data.upload_id) {
        return new Response("No upload ID found", { status: 400 });
      }

      await db
        .update(videosTable)
        .set({
          muxAssetId: data.id,
          muxStatus: data.status,
        })
        .where(eq(videosTable.muxUploadId, data.upload_id));
      break;
    }
  }

  return new Response("Webhook received", { status: 200 });
};
