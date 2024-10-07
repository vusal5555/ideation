import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import CreateDialog from "@/components/CreateDialog";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import Image from "next/image";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

type Props = object;

const Dashboard = async ({}: Props) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const notes = await db.select().from($notes).where(eq($notes.userId, userId));

  return (
    <>
      <div className="grainy min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <div className="h-14"></div>
          <div className="flex justify-center gap-3 lg:gap-5 items-center">
            <Link href={"/"}>
              <Button className="bg-green-600" size={"sm"}>
                <ArrowLeft className="mr-1 w-5 h-6" strokeWidth={3}></ArrowLeft>
                Back
              </Button>
            </Link>

            <h1 className="text-3xl lg:text-5xl font-bold">My Notes</h1>
            <UserButton></UserButton>
          </div>
          <div className="h-8"></div>
          <Separator />
          <div className="h-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center text-center">
            {notes.length === 0 && (
              <h2 className="text-xl text-gray-500 col-span-full">
                You have no notes yet
              </h2>
            )}

            <CreateDialog></CreateDialog>

            {notes.map((note) => {
              return (
                <a href={`/notebook/${note.id}`} key={note.id}>
                  <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                    <Image
                      width={400}
                      height={200}
                      alt={note.title}
                      src={note.imageUrl || ""}
                    />

                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {note.title}
                      </h3>
                      <div className="h-1"></div>
                      {/* <p className="text-sm text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p> */}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
