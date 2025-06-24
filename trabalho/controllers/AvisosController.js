import { listarAvisos, obterAvisosPorId, criarAviso, atualizarAviso, excluirAviso } from '../models/Avisos.js';

// Listar todos os avisos
export const listarAvisosController = async (req, res) => {
    try {
        const avisos = await listarAvisos();
        res.json(avisos);
    } catch (error) {
        console.error('Erro ao listar avisos:', error);
        res.status(500).json({ mensagem: 'Erro ao listar avisos' });
    }
};

// Obter um aviso específico
export const obterAvisoPorIdController = async (req, res) => {
    try {
        const aviso = await obterAvisosPorId(`id_Avisos = ${req.params.id}`);
        if (!aviso) {
            return res.status(404).json({ mensagem: 'Aviso não encontrado' });
        }
        res.json(aviso);
    } catch (error) {
        console.error('Erro ao obter aviso:', error);
        res.status(500).json({ mensagem: 'Erro ao obter aviso' });
    }
};

// Criar um novo aviso
export const criarAvisoController = async (req, res) => {
    try {
        console.log('Dados recebidos:', req.body);
        const { titulo, descricao, data } = req.body;
        
        if (!titulo || !descricao || !data) {
            console.log('Campos faltando:', { titulo, descricao, data });
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        }

        const novoAviso = {
            titulo,
            descricao,
            data: new Date(data)
        };

        console.log('Tentando criar aviso com dados:', novoAviso);
        const id = await criarAviso(novoAviso);
        console.log('Aviso criado com sucesso. ID:', id);
        
        res.status(201).json({ id, mensagem: 'Aviso criado com sucesso' });
    } catch (error) {
        console.error('Erro detalhado ao criar aviso:', error);
        res.status(500).json({ mensagem: 'Erro ao criar aviso', erro: error.message });
    }
};

// Atualizar um aviso
export const atualizarAvisoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, data } = req.body;

        if (!titulo || !descricao || !data) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        }

        const avisoAtualizado = {
            titulo,
            descricao,
            data: new Date(data)
        };

        await atualizarAviso(id, avisoAtualizado);
        res.json({ mensagem: 'Aviso atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar aviso:', error);
        res.status(500).json({ mensagem: 'Erro ao atualizar aviso' });
    }
};

// Excluir um aviso
export const excluirAvisoController = async (req, res) => {
    try {
        const { id } = req.params;
        await excluirAviso(id, `id_Avisos = ${id}`);
        res.json({ mensagem: 'Aviso excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir aviso:', error);
        res.status(500).json({ mensagem: 'Erro ao excluir aviso' });
    }
};