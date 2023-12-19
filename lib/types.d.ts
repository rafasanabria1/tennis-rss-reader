export enum FeedId {
  USA,
  ESPN,
  UNIV,
  AUS
}

export interface Feed {
  id: FeedId
  url: string
  name: string
  active: boolean
  items: FeedItem[]
  loaded: boolean
}

export interface FeedItem {
  id: string
  title: string
  link: string
  img?: {
    url?: string
    alt?: string
  }
  date: Date
}

export interface USAFeed {
  '?xml': string;
  rss: {
    channel: {
      title: string;
      'atom:link': string;
      link: string;
      description: string;
      lastBuildDate: string;
      language: string;
      'sy:updatePeriod': string;
      'sy:updateFrequency': number;
      generator: string;
      image: {
        url: string;
        title: string;
        link: string;
        width: number;
        height: number;
      };
      item: {
        title: string;
        link: string;
        'dc:creator': string;
        pubDate: string;
        category: string[];
        guid: string;
        description: string;
        'content:encoded': string;
        'usat:excerpt': string;
        'media:thumbnail': string;
        'media:content': {
          'media:title': string;
        };
      }[];
    }
  }
}

export interface ESPNFeed {
  channel: {
    copyright:     string;
    description:   string;
    generator:     string;
    image:         {
      height: number;
      link:   string;
      title:  string;
      url:    string;
      width:  number;
    };
    item:          {
      "dc:creator": string;
      description:   string;
      enclosure:     string;
      guid:          string;
      link:          string;
      pubDate:       string;
      title:         string;
     }[];
    language:      string;
    lastBuildDate: string;
    link:          string;
    title:         string;
    ttl:           number;
  };
}
 
export interface UNIVFeed {
}

export interface AUSFeed {
}