const swaggerDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
function swaggerConfig(app) {
    const swaggerDocument = swaggerDoc({
        swaggerDefinition: {
            openapi: "3.1.1",
            info: {
                title: 'divar-backend',
                description: 'node js course',
                version: '1.0.0'
            }
        },
        apis: [process.cwd() + "/src/modules/**/*swagger.js"]
    })
    const swagger = swaggerUi.setup(swaggerDocument, {});
    app.use('/swagger', swaggerUi.serve, swagger)
}
module.exports = swaggerConfig