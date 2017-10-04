var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var reservations = [
	{
		name: "Looker",
		phone: "9081234567",
		email: "looker@gmail.com",
		ID: "12345"
	}];

var waitList = [];

app.get("/", function (req, res){
	res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res){
	res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res){
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/apiTable", function (req, res){
	res.json(reservations);
});

app.get("/apiWait", function (req, res){
	res.json(waitList);
});

app.post("/clear", function(req,res){
	reservations = [];
	waitList = [];
});

app.post("/api/new", function(req, res){
	var newRes = req.body;
	if (reservations.length === 5){
		waitList.push(newRes);
	} else {
		reservations.push(newRes);
	}

	res.json(newRes);
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
