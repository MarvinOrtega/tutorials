var results;
var linkUrl = 'http://en.wikipedia.org/?curid=';
var url = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=search&indexpageids&prop=extracts&exintro=1&exlimit=20&explaintext&exsentences=2&gsrsearch=';
var searchItem;

$("#random").on("click",function(){
  window.open("https://en.wikipedia.org/wiki/Special:Random","_blank");
});

$("#search").on("keypress",function(event){
  if(event.which == 13){
    searchItem = $("#search").val();
    
    console.log("pressed enter " + searchItem );
  $.ajax({
    url: url + searchItem
  }).done(function(res){
        results = "";
        $('.remove').empty();
        $.each(res.query.pageids, function(i, value){
            results += "<div class='remove'>";
            results += "<a href=" + "'" + linkUrl + value + "'" + "target='_blank' style='text-decoration: none'>";
            results += "<div class='group'>";
            results += "<p>" + "Title:" + res.query.pages[value].title + "</p>";
            results += "<p>" + "Summary:" + res.query.pages[value].extract + "</p>";
            results += "</div>";
            results += "</a>";
            results += "</div>";
        });
        $('body').append(results);
    });
  }
});
        
        /*for (var i = 0; i < res.query.pageids.length; i++){
            results += "<a href=" + "'" + linkUrl + res.query.pageids[i] + "'" + ">";
            results += "<div class='group'>";
            results += "<p>" + "Title:" + res.query.pages[res.query.pageids[i]].title + "</p>";
            results += "<p>" + "Summary:" + res.query.pages[res.query.pageids[i]].extract + "</p>";
            results += "</div>";
            results += "</a>";
        }*/