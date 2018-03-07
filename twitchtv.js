var streamList = ["brunofin","OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var callback = '?callback=?';
var results = '';
var urlStream = 'https://wind-bow.gomix.me/twitch-api/streams/';
var urlChannel = 'https://wind-bow.glitch.me/twitch-api/channels/';

$.each(streamList,function(i, value){
	$.getJSON(urlChannel + value + callback, function(chan){
		if(chan.status == 404){
			console.log("fail " + chan.status + chan.message)
			results += "<div class='remove'>";
			results += "<a href=http://www.twitch.tv/" + value + " target='_blank' style='text-decoration: none'>";
			results += "<div class='group'>";
			results += "<span>" + "Title:" + value + "</span><br/>";
			results += "<span>" + "Status: Account not valid" + "</span><br/>";
			results += "</div>";
			results += "</a>";
			results += "</div>";
			$(".remove").empty();
			$("body").append(results);
		}
		else{
			$.getJSON(urlStream + value + callback, function(res) {
				if(res.stream == null){
					results += "<div class='remove'>";
					results += "<a href=http://www.twitch.tv/" + value + " target='_blank' style='text-decoration: none'>";
					results += "<div class='group'>";
					results += "<img src='" + chan.logo + "' style='width:40px;height:40px;'>";
					results += "<span>" + "Title:" + value + "</span><br/>";
					results += "<span>" + "Status: Account offline" + "</span><br/>";
					results += "</div>";
					results += "</a>";
					results += "</div>";
					$(".remove").empty();
					$("body").append(results);	
				}
				else{
					console.log("Channel available" + value);
					results += "<div class='remove'>";
					results += "<a href=https://www.twitch.tv/" + value + " target='_blank' style='text-decoration: none'>";
					results += "<div class='group'>";
					results += "<img src='" + chan.logo + "' style='width:40px;height:40px;'>";
					results += "<span>" + "Title:" + value + "</span><br/>";
					results += "<span>" + "Status: Live" + "</span><br/>";
					results += "<span>" + "User Name:" + res.stream.channel.display_name + "</span><br/>";
					results += "</div>";
					results += "</a>";
					results += "</div>";
					$(".remove").empty();
					$("body").append(results);	
				}
			})
		} 		  		
	});
});