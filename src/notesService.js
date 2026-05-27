const initialNotes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-01-10T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-01-10T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-01-10T19:20:14.298Z",
    important: true,
  },
];

let notes = [...initialNotes];

const getNotes = () => notes;

const setNotes = (nextNotes) => {
  notes = nextNotes;
};

const resetNotes = () => {
  notes = [...initialNotes];
};

const generateId = (items = notes) => {
  const maxId = items.length > 0 ? Math.max(...items.map((n) => n.id)) : 0;
  return maxId + 1;
};

const findNoteById = (id) => notes.find((note) => note.id === id);

const createNoteData = (body, items = notes) => {
  if (!body || !body.content) {
    return { error: "content missing" };
  }

  return {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(items),
  };
};

const addNote = (body) => {
  const note = createNoteData(body);
  if (note.error) {
    return note;
  }

  notes = notes.concat(note);
  return note;
};

const deleteNote = (id) => {
  notes = notes.filter((note) => note.id !== id);
};

module.exports = {
  initialNotes,
  getNotes,
  setNotes,
  resetNotes,
  generateId,
  findNoteById,
  createNoteData,
  addNote,
  deleteNote,
};
