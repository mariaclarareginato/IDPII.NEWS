import express from 'express';
import { listarNoticiasController, obterNoticiaPorIdController, criarNoticiaController, atualizarNoticiaController, excluirNoticiaController } from '../controllers/NoticiasController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// salva o arquivo enviado para o disco do computador
const storage = multer.diskStorage({
// diz onde salvar os arquivos, que é na pasta upload
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../upload'));
    },
// defini o nome do arquivo
    filename: (req, file, cb) => {
        const nomeArquivo = `${Date.now()}-${file.originalname}`;
        cb(null, nomeArquivo);
    }
});
// cria o local onde irá ser armazendado os arquivos
const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', listarNoticiasController);
router.get('/:id', obterNoticiaPorIdController);

router.post('/', upload.single('imagem'), criarNoticiaController);

router.put('/:id', upload.single('imagem'), atualizarNoticiaController);

router.delete('/:id', excluirNoticiaController);

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.status(204).send();
});

export default router;