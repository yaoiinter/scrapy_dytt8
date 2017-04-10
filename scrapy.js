var cheerio = require('cheerio'),
	request = require('request'),
	  iconv = require('iconv-lite'),
	     fs = require('fs'),
	hostname = 'http://www.dytt8.net',
	//hostname = 'http://www.zhibo8.cc',
		url =  '/index.htm',
  searchUrl = "http://s.dydytt.net/plus/search.php?kwtype=0&searchtype=title&keyword=",
	   html = '';

request({
	url:hostname+url,
	encoding:null
},function(err,sres,body){
	var html = iconv.decode(body,"gb2312");
	var $ = cheerio.load(html);
	var filmList = $('.co_content2 a');
	console.log(filmList.length);
	var j = 0;
    for (var i = 1; i < filmList.length-1 ;i++) {
		//console.log($(filmList[i]).attr('href'));
		try {
			var next_url = hostname + $(filmList[i]).attr('href');//$('.co_content2 a').eq(1).attr('href');
			//console.log(next_url);
			request({
				url:next_url
				,encoding:null
			},function(err,sres,body){
				var reshtml = iconv.decode(body,"gb2312");	
				var next_$ = cheerio.load(reshtml);
				console.log(next_$('a:contains("ftp://")').text());
			});
			j++;
		} catch (error) {
			continue;			
		}
	}
	console.log('总共抓取了'+j+'下载地址!');
});

function queryFilm(filmName){
	request({
		url:searchUrl+encodeURIComponent_GBK(filmName),
		encoding:null
	},function(err,sres,body){
		var html = iconv.decode(body,"gb2312");
		var $ = cheerio.load(html);
		var next_url = 'http://www.ygdy8.com' + $(".co_content8 a").eq(0).attr('href');
		//console.log(next_url);
		request({
			url:next_url
			,encoding:null
		},function(err,sres,body){
			var reshtml = iconv.decode(body,"gb2312");	
          	//console.log(reshtml);
			var next_$ = cheerio.load(reshtml);
			console.log(next_$('a:contains("ftp://")').text());
		});
	});
}

function encodeURIComponent_GBK(str){
  if(str==null || typeof(str)=='undefined' || str=='') 
    return '';
  
  var a = str.toString().split('');
  
  for(var i=0; i<a.length; i++) {
    var ai = a[i];
    if( (ai>='0' && ai<='9') || (ai>='A' && ai<='Z') || (ai>='a' && ai<='z') || ai==='.' || ai==='-' || ai==='_') continue;
    var b = iconv.encode(ai, 'gbk');
    var e = ['']; // 注意先放个空字符串，最保证前面有一个%
    for(var j = 0; j<b.length; j++) 
      e.push( b.toString('hex', j, j+1).toUpperCase() );
    a[i] = e.join('%');
  }
  return a.join('');
}
//queryFilm('生化危机');

/**
 * 下面是爬zhibo8的
 */

/*
request({
	url:hostname,
	encoding:null
},function(err,sres,body){
	var html = iconv.decode(body,"utf-8");
	var $ = cheerio.load(html, {decodeEntities:false});
	var EpSoccer = "";
	$('.content b:contains("欧冠")').each(function(){
		EpSoccer += '||' + $(this).html();	
	});
	console.log(EpSoccer);
});
*/

/*request('GET',hostname+url).done(function(res){
	var $ = cheerio.load(res.getBody('utf-8'));
	var next_url = hostname + $('.co_content2 a').eq(1).attr('href');
	console.log(next_url);
	request('GET',next_url).done(function(next_res){
		console.log(next_res);
		var next_$ = cheerio.load(next_res.getBody('utf-8'));
		console.log(next_$('.tpc_content td a').attr());
	});
});
*/
