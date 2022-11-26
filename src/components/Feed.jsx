import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Feed = () => {
  return (
    <main className="container py-8 grid grid-cols-1 md:grid-cols-3 gap-x-4">
      <section className="md:col-span-2 ">
        <Stories />
        <Posts />
      </section>
      <section className="hidden md:block md:col-span-1">
        <MiniProfile />

        <Suggestions />
      </section>
    </main>
  );
};

export default Feed;
