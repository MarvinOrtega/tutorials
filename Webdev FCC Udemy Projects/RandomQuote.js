var quote;
var url = 'https://twitter.com/intent/tweet?text=';
var twitter; 

random(); 

$("#request").on("click",random);

$(".twitter-share-button").on("click",function(){
    $(".twitter-share-button").attr("href",url + twitter);  
})

function random(){
    $.ajax({
    url: "http://quotes.stormconsultancy.co.uk/random.json"
  }).done(function(res){
    $("#container").empty();
    quote = '<h2><span id="quote">' + res.quote + '</span></h2><br/>';
    quote += '<span id="author">' + "-" + res.author + '</span>';
    twitter = encodeURI(res.quote + "-" + res.author);
    $("#container").append(quote);
    console.log(quote);
    console.log(twitter)
    });
}