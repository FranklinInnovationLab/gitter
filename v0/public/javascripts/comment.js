function get_comments(){
	var lib = document.getElementById('_name').innerHTML;
	$.ajax({
		type: "GET",
        url: "/api/review/" + lib,
        success: function(data){
        	var response = data['response'];
        	populate_comments(response);
        	window.scrollTo(0, 0); //normally it overflows and the window gets scrolled down
    	},
    	error: function (request, status, error) {
    		console.log("Can't display comments. You are doomed");
   		}
    });
}

function populate_comments(reviewArr){
	for (var i = 0; i < reviewArr.length; i++){
		var review = reviewArr[i];
		var stars = review.stars;
		var content = review.content;
		var new_div = document.getElementsByClassName('_review-section')[0].cloneNode(true);
		new_div.style.display='block'; //make it visible
		new_div.getElementsByClassName('_review_num')[0].innerHTML = stars;
		new_div.getElementsByClassName('_review_content')[0].innerHTML = content;
		document.getElementById('_review-box').appendChild(new_div);
	}
}

function submit_review(){
	var lib = document.getElementById('_name').innerHTML;
	var stars = document.getElementById('new_review_stars').value;
	var content = document.getElementById('new_review_content').value;
	$.ajax({
		type: "POST",
		url: "/api/review/" + lib,
		data: {content: content, stars: stars},
		success: function(data){
			if(data['success']){
				location.reload();
			}else{
				alert("comments are broken. ur doomed. gg.");
			}
		},
		error: function (request, status, error) {
			console.log("Can't add review... rip.");
		}
	});
}

$(document).ready(function() {
	get_comments();
});