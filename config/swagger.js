const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description: "API documentation for Task Manager"
        }
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = {swaggerUi, swaggerSpec };