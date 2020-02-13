var express = require("express");
var path = require("path");
var fs = require("fs");


// Sets up the Express App
var app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("assets")); 

var note = [];

//Routes====================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) { //add a note
    res.sendFile(path.join(__dirname, "notes.html"));
});

//-----------------------------------------------------
// Displays all notes
app.get("/api/notes", function (req, res) {
    return res.json(note)
});

app.post("/api/notes", function (req, res) {
    //var saveNote = fs.writeFileSync("/db/db.json", )
   var newNote = req.body;
   note.push(newNote);
   res.json(newNote);
});


//Delete note========================================================
app.delete("/api/notes/:id", function(req, res) {
    var remove = req.params.id;
});



// Starts the server to begin listening===============================
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
});
