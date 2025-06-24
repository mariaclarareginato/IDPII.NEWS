import { create, readAll, read, update, deleteRecord } from '../config/db.js';

const listarNoticias = async () => {
    try {
        return await readAll('Noticias');
    } catch (err) {
        console.error('Erro ao listar noticias: ', err);
    }
};

const obterNoticiaPorId = async (id) => {
    try {
        return await read('Noticias', `id_noticias = ${id}`);
    } catch (err) {
        console.error('Erro ao obter noticia por ID: ', err);
        throw err;
    }
};

const criarNoticia = async (noticiaData) => {
    try {
        return await create('Noticias', noticiaData);
    } catch (err) {
        console.error('Erro ao criar a noticia: ', err);
        throw err;
    }
};

const atualizarNoticia = async (id, noticiaData) => {
    try {
        await update('Noticias', noticiaData, `id_noticias = ${id}`);
    } catch (err) {
        console.error('Erro ao atualizar noticia: ', err);
        throw err;
    }
};

const excluirNoticia = async (id) => {
    try {
        await deleteRecord('Noticias', `id_noticias = ${id}`);
    } catch (err) {
        console.error('Erro ao excluir noticia: ', err);
        throw err;
    }
}

export { listarNoticias, obterNoticiaPorId, criarNoticia, atualizarNoticia, excluirNoticia };