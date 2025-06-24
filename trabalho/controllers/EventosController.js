import { listarEventos, obterEventoPorId, criarEvento, atualizarEvento, excluirEvento } from '../models/Eventos.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Listar todos os eventos
export const listarEventosController = async (req, res) => {
    try {
        const eventos = await listarEventos();
        res.json(eventos);
    } catch (error) {
        console.error('Erro ao listar eventos:', error);
        res.status(500).json({ mensagem: 'Erro ao listar eventos' });
    }
};

// Obter um evento específico
export const obterEventoPorIdController = async (req, res) => {
    try {
        const evento = await obterEventoPorId(`id_Eventos = ${req.params.id}`);
        if (!evento) {
            return res.status(404).json({ mensagem: 'Evento não encontrado' });
        }
        res.json(evento);
    } catch (error) {
        console.error('Erro ao obter evento:', error);
        res.status(500).json({ mensagem: 'Erro ao obter evento' });
    }
};

// Criar um novo evento
export const criarEventoController = async (req, res) => {
    try {
        console.log('Dados recebidos:', req.body);
        console.log('Arquivo recebido:', req.file);
        
        const { titulo, descricao, data_inicio, data_fim, local } = req.body;
        let imagemPath = null;
        
        if (req.file) {
            imagemPath = req.file.filename;
            console.log('Nome do arquivo:', imagemPath);
        }
        
        if (!titulo || !descricao || !data_inicio || !data_fim || !local) {
            console.log('Campos faltando:', { titulo, descricao, data_inicio, data_fim, local });
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        }

        const novoEvento = {
            titulo: Array.isArray(titulo) ? titulo[0] : titulo,
            texto: Array.isArray(descricao) ? descricao[0] : descricao,
            data_inicio: new Date(Array.isArray(data_inicio) ? data_inicio[0] : data_inicio),
            data_fim: new Date(Array.isArray(data_fim) ? data_fim[0] : data_fim),
            local: Array.isArray(local) ? local[0] : local,
            imagem: imagemPath
        };

        console.log('Tentando criar evento com dados:', novoEvento);
        const id = await criarEvento(novoEvento);
        console.log('Evento criado com sucesso. ID:', id);
        
        res.status(201).json({ 
            id, 
            mensagem: 'Evento criado com sucesso',
            evento: {
                id_Eventos: id,
                titulo,
                texto: descricao,
                data_inicio,
                data_fim,
                local,
                imagem: imagemPath ? `/upload/eventos/${imagemPath}` : null
            }
        });
    } catch (error) {
        console.error('Erro detalhado ao criar evento:', error);
        res.status(500).json({ mensagem: 'Erro ao criar evento', erro: error.message });
    }
};

// Atualizar um evento
export const atualizarEventoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, data_inicio, data_fim, local } = req.body;
        let imagemPath = null;
        
        if (req.file) {
            imagemPath = req.file.filename;
        }

        if (!titulo || !descricao || !data_inicio || !data_fim || !local) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        }

        const eventoAtualizado = {
            titulo,
            texto: descricao,
            data_inicio: new Date(data_inicio),
            data_fim: new Date(data_fim),
            local
        };

        if (imagemPath) {
            eventoAtualizado.imagem = imagemPath;
        }

        await atualizarEvento(id, eventoAtualizado);
        res.json({ 
            mensagem: 'Evento atualizado com sucesso',
            evento: {
                id_Eventos: id,
                ...eventoAtualizado,
                imagem: imagemPath ? `/upload/eventos/${imagemPath}` : null
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar evento:', error);
        res.status(500).json({ mensagem: 'Erro ao atualizar evento' });
    }
};

// Excluir um evento
export const excluirEventoController = async (req, res) => {
    try {
        const { id } = req.params;
        await excluirEvento(id, `id_Eventos = ${id}`);
        res.json({ mensagem: 'Evento excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir evento:', error);
        res.status(500).json({ mensagem: 'Erro ao excluir evento' });
    }
};