"use client";

import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { Note } from "@/lib/db/schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  note: Note;
};

const DeleteNote = ({ note }: Props) => {
  const router = useRouter();
  const deleteNotes = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/deleteNote", {
        noteId: note.id,
      });

      return res.data;
    },
  });

  return (
    <Button
      variant="destructive"
      size={`sm`}
      onClick={() => {
        deleteNotes.mutate(undefined, {
          onSuccess: () => {
            router.push("/dashboard");
          },
        });
      }}
    >
      <Trash className="w-4 h-4"></Trash>
    </Button>
  );
};

export default DeleteNote;
