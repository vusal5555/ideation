import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { name } = body;
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const image_description = await generateImagePrompt(name);

  console.log(image_description);

  if (!image_description) {
    return NextResponse.json(
      { error: "Image description is required" },
      { status: 400 }
    );
  }

  const image_url = await generateImage(image_description);

  if (!image_url) {
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 401 }
    );
  }

  const note_ids = await db
    .insert($notes)
    .values({
      title: name,
      userId,
      imageUrl: image_url,
      content: "",
    })
    .returning({
      insertedId: $notes.id,
    });

  return NextResponse.json({
    note_id: note_ids[0].insertedId,
  });
}
