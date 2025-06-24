const API_URL = 'http://localhost:3001';

export async function buscarNoticias() {
    try {
        const response = await fetch(`${API_URL}/noticias`);
        if (!response.ok) {
            throw new Error('Falha ao buscar notícias');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
        throw error;
    }
}

export async function buscarNoticiaPorId(id) {
    try {
        const response = await fetch(`${API_URL}/noticias/${id}`);
        if (!response.ok) {
            throw new Error('Notícia não encontrada');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar notícia:', error);
        throw error;
    }
} 