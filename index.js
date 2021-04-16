/*
 * Copyright (c) 2021 Nico Finkernagel
 * This code is licensed under MIT license (see LICENSE for details)
 */

const Parser = require("rss-parser");
const parser = new Parser();

const path = require("path");
const fs = require("fs");

const sources = [
  { name: "engorsdereblick", url: "https://engorsdereblick.wordpress.com/feed" },
  { name: "seanchuigoesrlyeh", url: "https://seanchuigoesrlyeh.wordpress.com/feed" },
  { name: "weltenraum", url: "https://www.weltenraum.at/category/spiele/rollenspiele/feed" },
];

(async () => {
  for (const source of sources) {
    console.log(`Downloading: ${source.name}`);
    const feed = await parser.parseURL(source.url);
    let output = "name; url";

    feed.items.forEach((item) => {
      output += "\n" + item.title + ";" + item.link;
    });

    const filename = path.resolve(__dirname, "csv", source.name + ".csv");
    if (fs.existsSync(filename)) fs.unlinkSync(filename);

    fs.writeFileSync(filename, output);
  }
})();
