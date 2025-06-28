const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./models/Note");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/notesdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Add Note
app.post("/api/notes", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to add note" });
  }
});

// Get Notes
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
