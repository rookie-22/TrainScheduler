// train scheduler javascript

// initialize my firebase
var config = {
    apiKey: "AIzaSyDJA1p8O_dqcWfLxyRXdya2P09oF0p2NBY",
    authDomain: "supertrainscheduler.firebaseapp.com",
    databaseURL: "https://supertrainscheduler.firebaseio.com",
    projectId: "supertrainscheduler",
    storageBucket: "supertrainscheduler.appspot.com",
    messagingSenderId: "567685745799"
};

firebase.initializeApp(config);

var database = firebase.database();

// submit button to add new trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // grab user inputs
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

    // database variables 
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Your train was successfully added");

    // clear boxes after submit
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

// add firebase record 
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    // time with moment
    var timeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(timeConverted);

    // time different
    var timeDifferent = moment().diff(moment(timeConverted), "minutes");
    console.log(timeDifferent);

    // time apart
    var timeRemainder = timeDifferent % trainFrequency;
    console.log(timeRemainder);

    // minutes away
    var trainAway = trainFrequency - timeRemainder;
    console.log(trainAway);

    // next train
    var arrival = moment().add(trainAway, "minutes");

    var trainArrival = moment(arrival).format("hh:mm A");

    // create the new rows
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(trainArrival),
        $("<td>").text(trainAway),
    );

    // append new row to top of list
    $("#train-table > tbody").prepend(newRow);
});