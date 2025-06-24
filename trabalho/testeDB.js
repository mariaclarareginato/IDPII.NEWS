import { readAll } from './config/db.js';

async function testarConexao() {
    try {
        console.log('Tentando conectar ao banco de dados...');
        const noticias = await readAll('Noticias');
        console.log('Conexão bem sucedida!');
        console.log('Número de notícias encontradas:', noticias.length);
        console.log('Primeira notícia:', noticias[0]);
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
    }
}

testarConexao(); 