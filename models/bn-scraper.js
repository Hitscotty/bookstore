const cheerio = require('cheerio');
const request = require('request');
const jsonfile = require('jsonfile');
const file = 'barnesandnobles.json';
const URL = 'http://www.barnesandnoble.com';
const NEW_RELEASE = '/b/new-releases/_/N-1oyg';

// gets data on new releases  

function newReleases() {
    request(URL + NEW_RELEASE, function(err, res, html){


        if(!err && res.statusCode == 200) {
            var $ = cheerio.load(html);
            $("div[class=product-info]").each(function(i, element){
                var buy_url = $(this).find('p[class=product-info-title] a').attr('href');
                scrapeUrl(URL + buy_url);
            });
        }
    });
}

// scrapes book data 
function scrapeUrl (url) { 
    request(url, (err, res, html) => {
        if(!err && res.statusCode == 200){
            var $ = cheerio.load(html);
            var title = $("h1").html();
            var author = $("span[itemprop=author]").html();
            var publisher = $("div[id=ProductDetailsTab] dl :nth-child(4) a").html();
            var pages = $("div[id=ProductDetailsTab] dl :nth-child(8)").html();
            var img_url = "http:" + $("img[itemprop=image]").attr('src');
            var description = $("div[id=truncatedOverview] b").html();
            var price = $("p[class=price] span").html();


            var bookdata = {
                title: title,
                author: author,
                publisher: publisher,
                pages: pages,
                img_url: img_url,
                description: description,
                price: price
            };
            
            jsonfile.writeFile(file, bookdata, {flag: 'a'}, function(err){
               if(err) throw err;
            })
        }
    });
}

newReleases();
