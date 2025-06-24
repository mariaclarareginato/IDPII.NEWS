import { create, readAll, read, update, deleteRecord } from '../config/db.js';

const listarAvisos = async () => {
    try {
        return await readAll('Avisos');
    } catch (err) {
        console.error('Erro ao listar avisos:', err);
        throw err;
    }
};

const obterAvisosPorId = async (avisosData) => {
    try {
        return await read('Avisos', avisosData);
    } catch (err) {
        console.error('Erro ao obter avisos por ID:', err);
        throw err;
    }
};

const criarAviso = async (avisosData) => {
    try {
        return await create('Avisos', avisosData);
    } catch (err) {
        console.error('Erro ao criar aviso:', err);
        throw err;
    }
};

const atualizarAviso = async (id, avisosData) => {
    try {
        await update('Avisos', avisosData, `id_Avisos = ${id}`);
    } catch (err) {
        console.error('Erro ao atualizar aviso:', err);
        throw err;
    }
};

const excluirAviso = async (id, avisosData) => {
    try {
        await deleteRecord('Avisos', avisosData, `id_Avisos = ${id}`);
    } catch (err) {
        console.error('Erro ao excluir noticia: ', err);
        throw err;
    }
};

export { listarAvisos, obterAvisosPorId, criarAviso, atualizarAviso, excluirAviso };