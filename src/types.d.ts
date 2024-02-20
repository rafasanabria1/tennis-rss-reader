export enum FeedId {
  USA = "USA",
  ESPN = "ESPN",
  AUS = "AUS",
}

export interface Feed {
  id: FeedId;
  url: string;
  name: string;
}

export interface FeedItem {
  id: string;
  title: string;
  link: string;
  img?: {
    url?: string;
    alt?: string;
  };
  date: Date;
}

export interface USAFeed {
  "?xml": string;
  rss: {
    channel: {
      lastBuildDate: string;
      item: {
        title: string;
        link: string;
        pubDate: string;
        category: string[];
        "media:thumbnail": {
          "@_url": string;
        };
      }[];
    };
  };
}

export interface ESPNFeed {
  "?xml": string;
  rss: {
    channel: {
      lastBuildDate: string;
      item: {
        title: string;
        link: string;
        pubDate: string;
        enclosure: {
          "@_url": string;
        };
      }[];
    };
  };
}

export interface AUSFeed {
  "?xml": string;
  rss: {
    channel: {
      lastBuildDate: string;
      item: {
        title: string;
        link: string;
        pubDate: string;
        category: string[];
        description: string;
      }[];
    };
  };
}

export interface API {
  feeds: Feed[];
  getFeedItems: (feedId: FeedId) => Promise<FeedItem[]>;
}
