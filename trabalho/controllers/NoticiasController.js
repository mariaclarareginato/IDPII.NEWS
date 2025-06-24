import { listarNoticias, obterNoticiaPorId, criarNoticia, atualizarNoticia, excluirNoticia } from '../models/Noticias.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const listarNoticiasController = async (req, res) => {
    try {
        const noticias = await listarNoticias();
        // Log para debug
        console.log('Notícias retornadas do banco:', noticias);
        res.status(200).json(noticias);
    } catch (err) {
        console.error('Erro ao listar noticias: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar noticias.' });
    }
};

const obterNoticiaPorIdController = async (req, res) => {
    try {
        const noticia = await obterNoticiaPorId(req.params.id);
        // Log para debug
        console.log('Notícia retornada do banco:', noticia);
        if (noticia) {
            res.status(200).json(noticia)
        } else {
            res.status(404).json({ mensagem: 'Noticia não encontrada.' })
        }
    } catch (err) {
        console.error('Erro ao obter noticia por ID: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter noticia por ID' })
    }
};

const criarNoticiaController = async (req, res) => {
    try {
        console.log('Corpo da requisição recebido:', req.body);
        console.log('Arquivo recebido:', req.file);
        
        const { titulo, descricao, data, usuario, categoria } = req.body;
        let imagemPath = null;
        
        if (req.file) {
            imagemPath = req.file.filename;
            console.log('Nome do arquivo:', imagemPath);
            console.log('Caminho completo:', path.join(__dirname, '../upload', imagemPath));
        }
        
        const noticiaData = {
            titulo,
            descricao,
            data,
            imagem: imagemPath,
            usuario,
            categoria
        };

        console.log('Dados da notícia a ser criada:', noticiaData);

        const noticiaId = await criarNoticia(noticiaData);
        console.log('Notícia criada com sucesso. ID:', noticiaId);
        
        res.status(201).json({ mensagem: 'Noticia criada com sucesso', noticiaId, noticia: noticiaData });
    } catch (err) {
        console.error('Erro detalhado ao criar a noticia:', err);
        res.status(500).json({ mensagem: 'Erro ao criar noticia', erro: err.message });
    }
};

const atualizarNoticiaController = async (req, res) => {
    try {
        const noticiaId = req.params.id;
        const { id_noticias, titulo, descricao, data, imagem, usuario, categoria } = req.body;
        let imagemPath = null;
        
        if (req.file) {
            // Salva apenas o nome do arquivo
            imagemPath = req.file.filename;
        }
        
        const noticiaData = {
            id_noticias,
            titulo,
            descricao,
            data,
            imagem: imagemPath,
            usuario,
            categoria
        };

        await atualizarNoticia(noticiaId, noticiaData);
        res.status(201).json({ mensagem: 'Noticia atualizada com sucesso.' });
    } catch (err) {
        console.error('Erro ao atualizar noticia: ', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar noticia.' });
    }
};

const excluirNoticiaController = async (req, res) => {
    try {
        const noticiaId = req.params.id;
        await excluirNoticia(noticiaId);
        res.status(200).json({ mensagem: 'Noticia excluida com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir noticia: ', err);
        res.atatus(500).json({ mensagem: 'Erro ao excluir noticia.' });
    }
}

export { listarNoticiasController, obterNoticiaPorIdController, criarNoticiaController, atualizarNoticiaController, excluirNoticiaController };