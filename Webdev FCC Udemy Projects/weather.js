function getWeather() {

  var loc = $('#loc').val();

  if (!loc) alert('enter a location dumbass')

  var yql = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="{{loc}}")';  
  yql = yql.replace('{{loc}}', loc);
  
  
  var url = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURI(yql) + '&format=json';
  
  $.ajax(url)
  	.done(function(result) {
    	var forecasts = []; console.log(result);
      for (var i = 0; i < result.query.results.channel.item.forecast.length; i++) {
      	var f = result.query.results.channel.item.forecast[i];
        var fl = '<li>' + f.date + ' ' + f.text + '</li>';
        forecasts.push(fl);
      }
      
      $('#results').html(forecasts.join(''));
    });
}
