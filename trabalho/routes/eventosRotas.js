import express from 'express';
import { listarEventosController, obterEventoPorIdController, criarEventoController, atualizarEventoController, excluirEventoController } from '../controllers/EventosController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Criar diretório de upload se não existir
const uploadDir = path.join(__dirname, '../upload/eventos');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Listar todos os eventos
router.get('/', listarEventosController);

// Obter um evento específico
router.get('/:id', obterEventoPorIdController);

// Criar um novo evento
router.post('/', upload.single('imagem'), criarEventoController);

// Atualizar um evento
router.put('/:id', upload.single('imagem'), atualizarEventoController);

// Excluir um evento
router.delete('/:id', excluirEventoController);

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.status(204).send();
});

export default router; 