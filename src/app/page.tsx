import {Suspense} from "react";

import api from "@/api";
import Feed from "@/components/feed";
import FeedLoading from "@/components/feed-loading";

export default function HomePage() {
  return (
    <section>
      <ul className="flex flex-col gap-8">
        {api.feeds.map((feed) => {
          return (
            <li key={feed.id}>
              <Suspense fallback={<FeedLoading />}>
                <Feed feed={feed} />
              </Suspense>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
