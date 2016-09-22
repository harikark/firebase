
  // Initialize Firebase
   var config = {
    apiKey: "AIzaSyCaycHoEHgVZGo7pSjYxFVqNht3vWlq_-g",
    authDomain: "train-1816d.firebaseapp.com",
    databaseURL: "https://train-1816d.firebaseio.com",
    storageBucket: "train-1816d.appspot.com",
    messagingSenderId: "1079259489075"
  };
  firebase.initializeApp(config);


var database = firebase.database();


$("#addTrainBtn").on("click", function(){

	
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firsttrain = moment($("#firsttrainInput").val().trim(), "HH:MM").format("X");
	var frequency = $("#frequencyInput").val().trim();

	
	var nextTrain = {
		name:  trainName,
		role: destination,
		start: firsttrain,
		rate: frequency
	}


	database.ref().push(nextTrain);

	
	console.log(nextTrain.trainName);
	console.log(nextTrain.destination);
	console.log(nextTrain.firsttrain);
	console.log(nextTrain.frequency)

	
	alert("Next Train Time Posted");

	
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firsttrainInput").val("");
	$("#frequencyInput").val("");

	
	return false;
});


database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().trainName;
	var tdestination = childSnapshot.val().destination;
	var tfirsttrain = childSnapshot.val().firsttrain;
	var tfrequency = childSnapshot.val().frequency;

	
	console.log(trainName);
	console.log(destination);
	console.log(firsttrain);
	console.log(frequency);

	
	var trainStartPretty = moment.unix(trainStart).format("HH:MM");
	
	var nextarrival = moment().diff(moment.unix(trainStart, 'X'), "minutes");
	console.log(nextarrival);

	var minutesaway = nextarrival * frequency;
	console.log(minutesaway);

	$("#TrainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainStartPretty + "</td><td>" + nextarrival + "</td><td>" + frequency + "</td><td>" + minutesaway + "</td></tr>");

});
