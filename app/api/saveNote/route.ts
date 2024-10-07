import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { noteId, editorState } = body;

    if (!noteId || !editorState) {
      return new Response("Missing noteId or editorState", { status: 400 });
    }

    const noteIdParsed = parseInt(noteId);

    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.id, noteIdParsed));

    if (notes.length !== 1) {
      return new Response("Failed to update note", { status: 500 });
    }

    const note = notes[0];

    if (note.editorState !== editorState) {
      await db
        .update($notes)
        .set({ editorState })
        .where(eq($notes.id, noteIdParsed));
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
