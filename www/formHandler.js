$(document).ready(function() {

	$("#send").click(function(e) {
	e.preventDefault();
	var text = {};
	text = {
		email : $('#input_216').val()
	};

			console.log(text);


	$.post("/api/send", text).then(function(data){
		console.log(data);

		if ( data === "sent") {
			console.log('messageSent');
		}
		reset();

	});



});

	$("#doIt").click(function(e) {
	e.preventDefault();
	var text = {};
	text = {
		email : $('#theEmail').val()
		};

			console.log(text);

	$.post("/api/send", text).then(function(data){
		console.log(data);
		if ( data === "sent") {
			console.log('messageSent');
		}
		reset();

	});

});

function reset() {
	console.log("reset");
//  document.getElementById("form_1924").reset();
$("form").trigger("reset");
}



});
