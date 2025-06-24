'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Deletar() {
    const [responseContent, setResponseContent] = useState('');
    const [noticiaId, setNoticiaId] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!noticiaId) {
            setResponseContent('ID da notícia inexistente ou errado.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/noticias/${noticiaId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'SEGREDO'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ${response.status}`);
            }

            const data = await response.json();
            setResponseContent('Notícia excluída com sucesso!');
            
            // Limpa o campo após sucesso
            setNoticiaId('');
            
            // Redireciona após 2 segundos
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            console.error('Erro:', error);
            setResponseContent('Erro ao excluir notícia. Por favor, tente novamente.');
        }
    };

    return (
        <div className="min-h-screen py-10 bg-gray-50">
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Excluir Notícia</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <p className="text-gray-600 mb-4">Insira o ID da notícia que deseja excluir.</p>
                        <label htmlFor="noticiaId" className="block text-sm font-medium text-gray-700">
                            ID da notícia:
                        </label>
                        <input 
                            type="text" 
                            id="noticiaId" 
                            value={noticiaId}
                            onChange={(e) => setNoticiaId(e.target.value)}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            required 
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                        Excluir Notícia
                    </button>
                </form>

                {responseContent && (
                    <div className="mt-6 p-4 rounded-lg bg-gray-100 border border-gray-200">
                        <p className="text-gray-700">{responseContent}</p>
                    </div>
                )}
            </div>
        </div>
    );
}