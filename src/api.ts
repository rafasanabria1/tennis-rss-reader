import type {API, AUSFeed, ESPNFeed, FeedItem, USAFeed} from "./types";

import {XMLParser} from "fast-xml-parser";
import {FeedId} from "@types";

const api: API = {
  feeds: [
    {
      id: FeedId.ESPN,
      url: "https://www.espn.com/espn/rss/tennis/news/",
      name: "ESPN - Tennis",
    },
    {
      id: FeedId.USA,
      url: "https://ftw.usatoday.com/category/tennis/feed",
      name: "USA Today - Tennis",
    },
    {
      id: FeedId.AUS,
      url: "https://feeds.feedburner.com/tennis-australia",
      name: "Tennis Australia",
    },
  ],
  getFeedItems: async (feedId) => {
    const feed = api.feeds.find((feed) => feed.id === feedId);

    if (feed === undefined) {
      return Promise.resolve([]);
    }

    const response = await fetch(feed.url, {
      headers: {
        "Content-Type": "text/xml",
      },
    });
    const xml = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
    });
    const xmlParsed = parser.parse(xml) as USAFeed | ESPNFeed | AUSFeed;

    let items: FeedItem[] = [];

    if (feed.id === FeedId.USA) {
      items = getItemsFromRawUSA(xmlParsed as USAFeed);
    } else if (feed.id === FeedId.ESPN) {
      items = getItemsFromRawESPN(xmlParsed as ESPNFeed);
    } else {
      items = getItemsFromRawAUS(xmlParsed as AUSFeed);
    }

    return items.sort((a, b) => (a.date > b.date ? -1 : 1));
  },
};

function getItemsFromRawUSA(xmlParsed: USAFeed): FeedItem[] {
  return xmlParsed.rss.channel.item.map((item, index): FeedItem => {
    const id = FeedId.USA + "-" + index;
    const title = item.title;
    const imgUrl = item["media:thumbnail"]["@_url"];
    const imgAlt = item.title;
    const link = item.link;
    const date = new Date(item.pubDate);

    return {id, title, link, img: {url: imgUrl, alt: imgAlt}, date};
  });
}

function getItemsFromRawESPN(xmlParsed: ESPNFeed): FeedItem[] {
  return xmlParsed.rss.channel.item.map((item, index): FeedItem => {
    const id = FeedId.ESPN + "-" + index;
    const title = item.title;
    const imgUrl = item.enclosure["@_url"];
    const imgAlt = item.title;
    const link = item.link;
    const date = new Date(item.pubDate);

    return {id, title, link, img: {url: imgUrl, alt: imgAlt}, date};
  });
}

function getItemsFromRawAUS(xmlParsed: AUSFeed): FeedItem[] {
  return xmlParsed.rss.channel.item.map((item, index): FeedItem => {
    const id = FeedId.AUS + "-" + index;
    const title = item.title;
    const matches =
      /<img[^>]* src="([^"]*)\??.*"[^>]* alt="([^"]*)"[^>]* srcset="([^"]*)"[^>]*>/.exec(
        item.description,
      );
    let imgUrl = "";
    let imgAlt = "";

    if (matches !== null) {
      if (matches[3].split(", ").length > 1) {
        const imagesBySize = matches[3].split(", ").map((value) => value.split(" "));
        const biggerImage = imagesBySize
          .sort((a, b) => (parseInt(a[1].slice(0, -1)) > parseInt(b[1].slice(0, -1)) ? -1 : 1))
          .shift();

        imgUrl = biggerImage !== undefined ? biggerImage[0] : "";
      } else {
        imgUrl = matches[1];
        imgAlt = matches[2].length !== 0 ? matches[2] : title;
      }
    }
    const link = item.link;
    const date = new Date(item.pubDate);

    return {id, title, link, img: {url: imgUrl, alt: imgAlt}, date};
  });
}

export default api;
