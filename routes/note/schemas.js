const notesSchema = {
  type: "object",
  properties: {
    id: {
      type: "number",
      description: "Unique identifier for the note",
    },
    title: { type: "string" },
    body: { type: "string", description: "main content of the note" },
  },
};

module.exports = { notesSchema };
