import React from "react";
import Card from "@/components/card/card";

export default function Home() {
  return (
    <div>
      <div className="flex gap-4 container m-auto mt-7 flex-wrap">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
