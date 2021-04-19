/*
 * Copyright (c) 2021 Nico Finkernagel
 * This code is licensed under MIT license (see LICENSE for details)
 */

const Parser = require("rss-parser");
const parser = new Parser();

const path = require("path");
const fs = require("fs");

// https://jeffkeeling.github.io/youtube_rss_extractor/
const sources = [
  { name: "engorsdereblick", url: "https://engorsdereblick.wordpress.com/feed" },
  { name: "seanchuigoesrlyeh", url: "https://seanchuigoesrlyeh.wordpress.com/category/rezensionen/feed" },
  { name: "weltenraum", url: "https://www.weltenraum.at/category/spiele/rollenspiele/feed" },
  { name: "orkenspaltertv", url: "https://www.youtube.com/feeds/videos.xml?playlist_id=PL9lrD0EiOevQWJEMMy1551GZdMtjqVCeQ" },
  { name: "frostypenandpaper", url: "https://frostypenandpaper.de/category/rezensionen/feed/" },
  { name: "frostypenandpaper-youtube", url: "https://www.youtube.com/feeds/videos.xml?playlist_id=PLJdf5CrImXUn_tZ4u9vjEyb15yzZTFKNG" },
  { name: "nandurion", url: "https://rezensionen.nandurion.de/feed/" },
  { name: "würfelheld", url: "https://wuerfelheld.wordpress.com/category/rezi-rollenspiel/feed" },
  { name: "schlachtenwüter", url: "https://www.youtube.com/feeds/videos.xml?playlist_id=PLMHDsyqp0PG20bXEabQJuRviLbBuZ9zdv" },
  { name: "fantasykritik", url: "https://fantasykritik.wordpress.com/category/rezension/feed/" },
  { name: "neueabenteuer", url: "https://neueabenteuer.com/category/rezensionen/feed/" },
];

(async () => {
  for (const source of sources) {
    console.log(`Downloading: ${source.name}`);
    const feed = await parser.parseURL(source.url);
    let output = "name;url;datum";

    feed.items.forEach((item) => {
      output += "\n" + item.title + ";" + item.link + ";" + item.isoDate;
    });

    const filename = path.resolve(process.cwd(), "csv", source.name + ".csv");
    if (!fs.existsSync(path.resolve(path.dirname(process.execPath), "csv"))) fs.mkdirSync(path.resolve(path.dirname(process.execPath), "csv"));
    if (fs.existsSync(filename)) fs.unlinkSync(filename);

    fs.writeFileSync(filename, output);
  }
})();
