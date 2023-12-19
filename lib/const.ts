import { Feed, FeedId } from "@types";

export const feeds: Feed[] = [
   {
    id: FeedId.USA, 
    url: 'https://ftw.usatoday.com/category/tennis/feed', 
    name: 'USA Today - Tennis', 
    active: false, 
    items: [], 
    loaded: false
  },
   {
    id: FeedId.ESPN, 
    url: 'https://www.espn.com/espn/rss/tennis/news/', 
    name: 'ESPN - Tennis', 
    active: true, 
    items: [], 
    loaded: false
  },
  {
    id: FeedId.UNIV, 
    url: 'https://blog.universaltennis.com/feed/', 
    name: 'Universal Tennis', 
    active: false, 
    items: [], 
    loaded: false
  },
   {
    id: FeedId.AUS, 
    url: 'https://feeds.feedburner.com/tennis-australia', 
    name: 'Tennis Australia', 
    active: false, 
    items: [], 
    loaded: false
  }
]