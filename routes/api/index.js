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
    notes = notes.filter((note) => {
      if (noteId != note.id) {
        return true;
      } else {
        return false;
      }
    });
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
  });
});

module.exports = router;
