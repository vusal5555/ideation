import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { uploadFileToFirebase } from "@/lib/firebase";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { noteId } = body;

    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.id, parseInt(noteId)));

    const note = notes[0];

    if (!note.imageUrl) {
      return new NextResponse("No image url", { status: 400 });
    }

    const firebase_url = await uploadFileToFirebase(note.imageUrl, note.title);

    await db
      .update($notes)
      .set({ imageUrl: firebase_url })
      .where(eq($notes.id, parseInt(noteId)));

    return NextResponse.json("ok", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
