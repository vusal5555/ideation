"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = object;

function TypeWriteTitle({}: Props) {
  return (
    <Typewriter
      options={{
        autoStart: true,
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Supercharged Productivity.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("AI-Powered Insights.")
          .start();
      }}
    ></Typewriter>
  );
}

export default TypeWriteTitle;
