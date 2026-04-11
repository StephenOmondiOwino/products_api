
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Products API',
    description: 'API for managing products and users' 
  },
  host: 'products-api-1-l2as.onrender.com',
  schemes: ['https']
  
};

const outputFile = './swagger-output.json';

const endpointsFiles = [
  './server.js',
  './routes/products.js',
  './routes/users.js'  
  
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger JSON generated');
});