import { create, readAll, read, update, deleteRecord } from '../config/db.js';

const formatarEvento = (evento) => {
    if (!evento) return null;
    return {
        id_Eventos: evento.id_Eventos,
        titulo: evento.titulo,
        texto: evento.texto,
        data_inicio: evento.data_inicio,
        data_fim: evento.data_fim,
        local: evento.local,
        imagem: evento.imagem ? `/upload/eventos/${evento.imagem}` : null
    };
};

const listarEventos = async () => {
    try {
        const eventos = await readAll('Eventos');
        return eventos.map(formatarEvento);
    } catch (err) {
        console.error('Erro ao listar eventos:', err);
        throw err;
    }
};

const obterEventoPorId = async (where) => {
    try {
        const evento = await read('Eventos', where);
        return formatarEvento(evento);
    } catch (err) {
        console.error('Erro ao obter evento por ID:', err);
        throw err;
    }
};

const criarEvento = async (eventoData) => {
    try {
        const id = await create('Eventos', eventoData);
        const novoEvento = await obterEventoPorId(`id_Eventos = ${id}`);
        return id;
    } catch (err) {
        console.error('Erro ao criar evento:', err);
        throw err;
    }
};

const atualizarEvento = async (id, eventoData) => {
    try {
        await update('Eventos', eventoData, `id_Eventos = ${id}`);
        return await obterEventoPorId(`id_Eventos = ${id}`);
    } catch (err) {
        console.error('Erro ao atualizar evento:', err);
        throw err;
    }
};

const excluirEvento = async (id) => {
    try {
        await deleteRecord('Eventos', `id_Eventos = ${id}`);
    } catch (err) {
        console.error('Erro ao excluir evento:', err);
        throw err;
    }
};

export { listarEventos, obterEventoPorId, criarEvento, atualizarEvento, excluirEvento };