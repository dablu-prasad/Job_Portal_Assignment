export const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Portal API',
            description: 'Job Portal API Information',
            contact: {
                name: 'Sagi Weizmann'
            },
            version:'1.0.0'
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
    },
    apis: ['../routes/*.ts']
}