"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = object;

const CreateDialog = ({}: Props) => {
  const router = useRouter();
  const [name, setName] = React.useState("");

  const uploadToFirebase = async (noteId: string) => {
    const res = await axios.post("/api/uploadToFirebase", {
      noteId: noteId,
    });
  };
  const createNoteBook = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/createNoteBook", {
        name: name,
      });

      return res.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create the note
    if (name === "") {
      window.alert("Please enter a name");
    }

    createNoteBook.mutate(undefined, {
      onSuccess: ({ note_id }) => {
        console.log("Note created" + note_id);
        uploadToFirebase(note_id);
        router.push(`/notebook/${note_id}`);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed border-2 flex items-center justify-center border-green-600 h-full rounded-lg  flex-col hover:shadow-xl transition hover:-translate-y-1 lg:flex-row p-4">
          <Plus className="w-6 h-6 text-green-600" strokeWidth={3}></Plus>
          <h2 className="font-semibold text-green-800 mt-2">New Note</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note Book</DialogTitle>
          <DialogDescription>Create your note here</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="h-4"></div>
          <Input
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex items-center mt-4 gap-2">
            <Button type="reset" variant={"secondary"}>
              Cancel
            </Button>
            <Button
              className="bg-green-600"
              disabled={createNoteBook.isPending}
            >
              {createNoteBook.isPending ? "Loading..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
