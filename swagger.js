const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Products API',
    description: 'API for managing products'
  },
  host: 'localhost:3001',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js', './routes/products.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger JSON generated');
});