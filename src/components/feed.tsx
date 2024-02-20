import {type Feed as FeedType} from "@types";

import api from "@/api";
import FeedClient from "@/components/feed-client";

//const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Feed({feed}: {feed: FeedType}) {
  // await wait(Math.floor(Math.random() * 5000) + 1000);

  const items = await api.getFeedItems(feed.id);

  return <FeedClient allItems={items} feed={feed} />;
}
