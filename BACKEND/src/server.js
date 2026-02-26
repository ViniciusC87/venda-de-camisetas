const express = require('express');
const cors = require('cors'); 
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(cors());

// Aumenta o limite para 10MB para que a imagem enviada pelo Angular passe sem erro
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(routes);

app.listen(PORT, () => {
    console.log('🚀 Servidor ativo e aceitando imagens pesadas! 🚀');
});