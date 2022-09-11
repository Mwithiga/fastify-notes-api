const NotesDAL = require("./notesDAL");
const { notesSchema } = require("./schemas");

module.exports = function (fastify, opts, next) {
  const notesDAL = NotesDAL(fastify.db);

  fastify.route({
    method: "GET",
    url: "/notes",
    schema: {
      tags: ["Notes"],
      description: "Get all notes",
      response: {
        200: {
          type: "array",
          items: notesSchema,
        },
      },
    },
    handler: async (request, reply) => {
      return notesDAL.getNotes();
    },
  });

  fastify.route({
    method: "POST",
    url: "/notes",
    schema: {
      tags: ["Notes"],
      description: "Create a  note",
      body: {
        type: "object",
        required: ["title", "body"],
        properties: {
          title: { type: "string" },
          body: { type: "string" },
        },
      },
      response: {
        200: notesSchema,
      },
    },
    handler: async (request, reply) => {
      const { title, body } = request.body;
      const newNote = await notesDAL.createNote(title, body);
      return newNote;
    },
  });

  fastify.route({
    method: "PUT",
    url: "/notes/:id",
    schema: {
      tags: ["Notes"],
      description: "Update a  note",
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
        required: ["id"],
      },
      body: {
        type: "object",
        required: ["title", "body"],
        properties: {
          title: { type: "string" },
          body: { type: "string" },
        },
      },
      response: {
        200: notesSchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const { title, body } = request.body;
      const updatedNote = await notesDAL.updateNote(id, title, body);
      return updatedNote;
    },
  });

  fastify.route({
    method: "DELETE",
    url: "/notes/:id",
    schema: {
      tags: ["Notes"],
      description: "Delet a  note- WARNING - PERMANENT",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
        },
      },

      response: {
        204: {
          type: "string",
          default: "No Content",
        },
      },
    },
    handler: async (request, reply) => {
      await notesDAL.deleteNote(request.params.id);
      reply.status(204);
    },
  });

  next();
};
