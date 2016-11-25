const cheerio = require('cheerio');
const request = require('request');
const promise = require('promise');
const jsonfile = require('jsonfile');
const mongoose = require('mongoose');
const file = 'barnesandnobles.json';
const URL = 'http://www.barnesandnoble.com';
const NEW_RELEASE = '/b/new-releases/_/N-1oyg?Nrpp=40';

Book = require('./book');
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;
// gets data on new releases  

function newReleases(){

    request(URL + NEW_RELEASE, function(err, res, html){


	if(!err && res.statusCode == 200) {
	    var $ = cheerio.load(html);
	   return $("div[class=product-info]").each(function(i, element){
		var buy_url = $(this).find('p[class=product-info-title] a').attr('href');
		scrapeUrl(URL + buy_url);
	    }).next(console.log("finsihed"));
	}
    });

}

// scrapes book data 
function scrapeUrl (url) { 
    request(url, (err, res, html) => {
	if(!err && res.statusCode == 200){
	    var $ = cheerio.load(html);
	    var title = $("h1").text();
	    var author = $("span[itemprop=author]").text();
	    var publisher = $("div[id=ProductDetailsTab] dl :nth-child(4) a").text();
	    var pages = $("div[id=ProductDetailsTab] dl :nth-child(8)").text();
	    var img_url = "http:" + $("img[itemprop=image]").attr('src');
	    var description = $("div[id=truncatedOverview] b").text();
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

            console.log("updating new releases...");
	    Book.addBook(bookdata);
	}
    });
}

function closedb(){
 db.close();
}


newReleases();
