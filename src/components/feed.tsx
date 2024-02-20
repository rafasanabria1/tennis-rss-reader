import {type Feed as FeedType} from "@types";

import api from "@/api";
import FeedClient from "@/components/feed-client";

export default async function Feed({feed}: {feed: FeedType}) {
  const items = await api.getFeedItems(feed.id);

  return <FeedClient allItems={items} feed={feed} />;
}
