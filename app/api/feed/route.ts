import { FeedId, USAFeed, ESPNFeed, FeedItem, UNIVFeed, AUSFeed} from "@types";
import { feeds } from "@const";
import { NextRequest, NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export async function GET (request: NextRequest) {
  
  const test = await Promise.all (feeds.filter(feed => feed.active).map (async (feed) => {
    const response = await fetch(feed.url,{
      headers: {
        'Content-Type': 'text/xml'
      }
    })
    const xml = await response.text();
    const parser = new XMLParser()
    
    const xmlParsed = parser.parse(xml)
    return {
      feed,
      items: getItemsFromRaw(feed.id, xmlParsed)
    }
  }))

  return NextResponse.json(test)
}

function getItemsFromRaw (feedId: FeedId.AUS, xmlParsed: AUSFeed): FeedItem[];
function getItemsFromRaw (feedId: FeedId.ESPN, xmlParsed: ESPNFeed): FeedItem[];
function getItemsFromRaw (feedId: FeedId.UNIV, xmlParsed: UNIVFeed): FeedItem[];
function getItemsFromRaw (feedId: FeedId.USA, xmlParsed: USAFeed): FeedItem[];
function getItemsFromRaw (feedId: FeedId, xmlParsed: any): any {

  switch (feedId) {
    case FeedId.USA:

      return xmlParsed.rss.channel.item.map((item, index) : FeedItem => {
        
        let id = feedId + '-' + index;  
        let title = item.title;
        let img_url = item['media:thumbnail'];
        let img_alt = item['media:content']['media:title'];
        let link = item.link;
        let date = new Date(item.pubDate)
        return {id, title, link, img: {url: img_url, alt: img_alt}, date};
      })

    case FeedId.ESPN:
      break;
    
    case FeedId.UNIV:
      break;
  
    case FeedId.AUS:
      break;
    
    default:
      throw new Error("Invalid FeedId");
  }
}

    /*
  return itemsRaw.map ( (item, index2) => {
        
    let id = feed.id + '-' + index2;  

    let title = item.querySelector ("title").textContent;
    
    let img_url = '', img_alt = '';
    if (feed.id === FeedId.USA) {

      let img_obj = item.getElementsByTagName ("media:content");
      if (img_obj[0]) {
        img_url     = img_obj[0].getAttribute ('url');
        img_alt     = title;
      }
      
    } else if (feed.id === FeedId.ESPN) {

      if (item.querySelector ("enclosure")) {

        let img_obj = item.querySelector ("enclosure");
        
        img_url     = img_obj.getAttribute ('url');
        img_alt     = item.querySelector ("description").textContent;
      }

    } else if (feed.id === FeedId.UNIV) {

      let description_html = item.querySelector ("description").textContent;
      let matches          = description_html.match (/<img[^>]* src="([^"]*)\?.*"[^>]* alt="([^"]*)"[^>]*>/);
      img_url     = matches[1];
      img_alt     = matches[2] ? matches[2] : title;

    } else if (feed.id === FeedId.AUS) {

      let description_html = item.querySelector ("description").textContent;
      let matches          = description_html.match (/<img[^>]* src="([^"]*)\??.*"[^>]* alt="([^"]*)"[^>]* srcset="([^"]*)"[^>]*>/);
      
      img_url     = matches[1];
      img_alt     = matches[2] ? matches[2] : title;
      
      if (matches[3]) {

        let images_by_size = matches[3].trim().split (', ').map (value => value.split (" "));
        let bigger_image   = images_by_size.sort ( (a,b) => parseInt(a[1].slice(0,-1)) > parseInt(b[1].slice(0,-1)) ? -1 : 1).shift ();
        img_url = bigger_image[0];
      }

    }
    let link = item.querySelector ("link").textContent;

    let date          = item.querySelector ("pubDate").textContent;
    let date_moment   = moment (date).utc ();
    let date_modified = date_moment.format ('MM/DD/YYYY HH:mm') + ' UTC';

    return {id, title, link, img: {url: img_url, alt: img_alt}, date_moment, date: date_modified, site_name: feed.name, bookmark: false};
  })
};*/