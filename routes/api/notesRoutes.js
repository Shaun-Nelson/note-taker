const router = require("express").Router();
const fs = require("fs");

router.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

router.post("/", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    let newNote = req.body;
    let uniqueId = notes.length.toString();
    newNote.id = uniqueId;
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
  });
});

router.delete("/:id", (req, res) => {
  let noteId = req.params.id;
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    // filter out the deleted note
    // note.id is a string, so it has to be parsed
    notes = notes.filter((note) => noteId !== String(note.id));
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
  });
});

module.exports = router;
