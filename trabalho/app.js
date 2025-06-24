import express from 'express';
const app = express();
const port = 3001;
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import noticiasRotas from './routes/noticiasRotas.js';
// import authRotas from './routes/authRotas.js';
import avisosRotas from './routes/avisosRotas.js';
import eventosRotas from './routes/eventosRotas.js';

app.use(cors());
app.use(express.json());

// Configurar pasta de upload
const uploadDir = path.join(__dirname, 'upload');
const eventosDir = path.join(uploadDir, 'eventos');

// Criar pastas se não existirem
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
if (!fs.existsSync(eventosDir)) {
    fs.mkdirSync(eventosDir);
}

// Servir arquivos estáticos
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Rotas
app.use('/noticias', noticiasRotas);
// app.use('/auth', authRotas);
app.use('/avisos', avisosRotas);
app.use('/eventos', eventosRotas);

// Rota para testar se o arquivo existe
app.get('/check-image/:filename', (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);
    console.log('Verificando arquivo:', filePath);
    if (fs.existsSync(filePath)) {
        res.json({ exists: true, path: filePath });
    } else {
        res.json({ exists: false, path: filePath });
    }
});

app.get('/', (req, res) => {
    res.status(201).send('<h1>API de Noticias.</h1>')
});

app.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send();
});

app.use((req, res) => {
    res.status(404).json({ mensagem: 'Rota não encontrada.' })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});



