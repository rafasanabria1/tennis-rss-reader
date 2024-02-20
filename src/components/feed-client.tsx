"use client";

import type {Feed, FeedItem} from "@/types";

import {useEffect, useState} from "react";

const itemsPerpage = 6;

export default function FeedClient({feed, allItems}: {feed: Feed; allItems: FeedItem[]}) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allItems.length / itemsPerpage);

  const handlePreviousPage = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
  };
  const handleNextPage = () => {
    if (page === totalPages) return;
    setPage((page) => page + 1);
  };

  useEffect(() => {
    const start = (page - 1) * itemsPerpage;
    const end = start + itemsPerpage;

    setItems(allItems.slice(start, end));
  }, [allItems, page]);

  return (
    <article>
      <header className="">
        <h2 className="text-center text-xl font-bold underline underline-offset-4">{feed.name}</h2>
      </header>
      <main className="my-4">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            return (
              <li
                key={item.id}
                className="flex flex-col gap-2 rounded-lg border border-fuchsia-950 p-4"
              >
                {item.img?.url ? (
                  <img
                    alt={item.img.alt ?? item.title}
                    className="h-32 w-full object-cover md:h-64"
                    src={item.img.url}
                  />
                ) : null}
                <h3 className="flex-1 text-pretty text-sm font-bold">{item.title}</h3>
                <div className="mt-6 flex items-center justify-between text-xs">
                  <a
                    className="font-bold text-fuchsia-900 underline"
                    href={item.link}
                    rel="noreferrer"
                    target="_blank"
                    title={`Ver noticia ${item.title} en el portal externo`}
                  >
                    Read more outside
                  </a>
                  <span>
                    {item.date.toLocaleDateString("en", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <footer className="flex items-center justify-between gap-4 lg:justify-end ">
        <button
          aria-disabled={page <= 1}
          className="w-1/2 rounded-lg border border-fuchsia-950 bg-fuchsia-800 px-4 py-2 font-semibold transition-all hover:cursor-pointer hover:border-fuchsia-500 hover:bg-fuchsia-900 hover:text-white disabled:border-fuchsia-950 disabled:bg-fuchsia-950 disabled:opacity-10 disabled:hover:cursor-not-allowed md:w-1/4 lg:w-auto"
          disabled={page <= 1}
          type="button"
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <button
          aria-disabled
          className="w-1/2 rounded-lg border border-fuchsia-950 bg-fuchsia-800 px-4 py-2 font-semibold transition-all hover:cursor-pointer hover:border-fuchsia-500 hover:bg-fuchsia-900 hover:text-white disabled:border-fuchsia-950 disabled:bg-fuchsia-950 disabled:opacity-40 disabled:hover:cursor-not-allowed md:w-1/4 lg:w-auto"
          disabled={page >= totalPages}
          type="button"
          onClick={handleNextPage}
        >
          Next
        </button>
      </footer>
    </article>
  );
}
