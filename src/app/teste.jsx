'use client';

import { useEffect, useState } from 'react';
import { buscarNoticias } from './services/noticiasService';

export default function TestePage() {
    const [noticias, setNoticias] = useState([]);
    const [erro, setErro] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function testarAPI() {
            try {
                console.log('Iniciando teste da API...');
                const dados = await buscarNoticias();
                console.log('Dados recebidos:', dados);
                setNoticias(dados);
                setLoading(false);
            } catch (error) {
                console.error('Erro no teste:', error);
                setErro(error.message);
                setLoading(false);
            }
        }

        testarAPI();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Teste de Conexão com a API</h1>
            
            {loading && <p>Carregando...</p>}
            
            {erro && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>Erro ao conectar com a API: {erro}</p>
                </div>
            )}

            {!loading && !erro && (
                <div>
                    <p className="text-green-600 mb-4">✅ API conectada com sucesso!</p>
                    <div className="bg-gray-100 p-4 rounded">
                        <h2 className="text-xl mb-2">Dados recebidos:</h2>
                        <pre className="bg-white p-4 rounded overflow-auto">
                            {JSON.stringify(noticias, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
} 