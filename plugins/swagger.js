const fp = require("fastify-plugin");

module.exports = fp(function (fastify, opts, next) {
  fastify.register(require("@fastify/swagger"), {
    routePrefix: "/swagger",
    swagger: {
      info: {
        title: "Notes API",
        description: " CRUD Notes",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      host: "127.0.0.1:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: header => header,
    exposeRoute: true,
  });
  next();
});
