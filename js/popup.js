'use strict';

document.addEventListener('DOMContentLoaded', function() {

	chrome.cookies.get({"url": "https://api.vk.com", "name": "startTime"}, function(cookie) {
		if (cookie) {
			var start = new Date(cookie.value);
			var startVal =
                ("0" +  start.getHours()).substr(-2) + ':' +
                ("0" +  start.getMinutes()).substr(-2) + ':' +
                ("0" +  start.getSeconds()).substr(-2);
			$(".start_time_value").text(startVal).parent().show();

            chrome.cookies.get({"url": "https://api.vk.com", "name": "endTime"}, function(cookieEnd) {
                if (cookieEnd) {
                    if (cookieEnd.value) {
                        var end = new Date(cookieEnd.value);
                        var diff = ((end - start) / 1000 / 60).toFixed(2);

                        console.log(JSON.stringify((end - start)/1000, null, 4));

                        var endVal =
                            ("0" +  end.getHours()).substr(-2) + ':' +
                            ("0" +  end.getMinutes()).substr(-2) + ':' + ("0" +
                            end.getSeconds()).substr(-2);
                        $(".end_time_value").text(endVal).parent().show();
                        $(".all_time_value").text(diff).parent().show();
                    } else {
                        $(".end_time_value").parent().hide();
                        $(".all_time_value").parent().hide();
                    }
                }
            });
		}
	});
});




