import DeleteNote from "@/components/DeleteNote";
import TipTap from "@/components/TipTap";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    noteId: string;
  };
};

const page = async ({ params: { noteId } }: Props) => {
  const { userId } = await auth();

  const user = await currentUser();

  console.log(user);

  if (!userId) {
    return redirect("/dashboard");
  }

  // Check if noteId is a valid integer
  const noteIdInt = parseInt(noteId);
  if (isNaN(noteIdInt)) {
    return redirect("/dashboard");
  }

  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, noteIdInt), eq($notes.userId, userId)));

  console.log(notes);

  if (notes.length !== 1) {
    return redirect("/dashboard");
  }

  const note = notes[0];
  return (
    <div className="min-h-screen .grainy p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border border-stone-200 shadow-xl rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button className="bg-green-600" size="sm">
              Go back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{note.title}</span>
          <div className="ml-auto">
            <DeleteNote note={note}></DeleteNote>
          </div>
        </div>

        <div className="h-4"></div>

        <div className="border border-stone-200 shadow-xl rounded-lg px-16 py-8 w-full">
          <TipTap note={note}></TipTap>
        </div>
      </div>
    </div>
  );
};

export default page;
