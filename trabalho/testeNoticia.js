import { create } from './config/db.js';

const noticiaTest = {
    titulo: 'Notícia de Teste',
    descricao: 'Esta é uma notícia de teste para verificar a integração.',
    data: new Date().toISOString(),
    imagem: '/imgs/imgsteste/teste.jpg',
    usuario: 'admin',
    categoria: 'Teste'
};

async function inserirNoticiaTest() {
    try {
        const resultado = await create('Noticias', noticiaTest);
        console.log('Notícia de teste criada com sucesso:', resultado);
    } catch (error) {
        console.error('Erro ao criar notícia de teste:', error);
    }
}

inserirNoticiaTest(); 