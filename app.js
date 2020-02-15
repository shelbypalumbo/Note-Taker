//------------Dependencies----------------------
var express = require("express");
var path = require("path");
var fs = require("fs");
var uuid = require("uuid");
//---------Sets up the Express App--------------
var app = express();
const PORT = process.env.PORT || 3000;

//--Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("assets"));

var note = [];

//----------HTML Routes------------------------
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) { //add a note
    res.sendFile(path.join(__dirname, "notes.html"));
});

//-----------Get/Post Notes-------------------
app.get("/api/notes", function (req, res) {
    return res.json(note);
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    newNote.id = uuid();
    note.push(newNote);
    res.json(newNote);
});

//---------------Delete Note------------------------

app.delete("/api/notes/:id", function (req, res) {
   for( i = 0; i < note.length; i++){
       if (req.params.id == note[i].id){
           note.splice(i,1)
       }
       res.json(req.body);
   } 
});


//-----Starts the server to begin listening---------
app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});
