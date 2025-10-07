import { db } from "@/db";
import { usersTable } from "@/db/schema/users";
import { WebhookEvent } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: NextRequest) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SIGNING_SECRET to .env");
  }

  const webhook = new Webhook(SIGNING_SECRET);

  // get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const payload = JSON.stringify(body);

  let event: WebhookEvent;

  try {
    event = webhook.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.log("Could not verify webhook: ", err);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  console.log(`Clerk webhook received: ${event.type}`);

  if (event.type === "user.created") {
    const data = event.data;
    await db.insert(usersTable).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    });
  }

  if (event.type === "user.deleted") {
    const data = event.data;

    if (!data.id) {
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });
    }

    await db.delete(usersTable).where(eq(usersTable.clerkId, data.id));
  }

  if (event.type === "user.updated") {
    const data = event.data;

    await db
      .update(usersTable)
      .set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      })
      .where(eq(usersTable.clerkId, data.id));
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
