const express = require("express");
const notesService = require("./notesService");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.post("/api/notes", (request, response) => {
  const note = notesService.addNote(request.body);

  if (note.error) {
    return response.status(400).json(note);
  }

  return response.json(note);
});

app.get("/api/notes", (req, res) => {
  res.json(notesService.getNotes());
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notesService.deleteNote(id);
  response.status(204).end();
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notesService.findNoteById(id);

  if (note) {
    return response.json(note);
  }

  return response.status(404).end();
});

module.exports = app;
