'use client'

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";



const CATEGORIAS = [
    'Educação',
    'Esporte',
    'Tecnologia',
    'Sustentabilidade',
    'Economia',
    'Cultura'
];

export default function Atualizar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const noticiaId = searchParams.get('id_noticias');

    const [formData, setFormData] = useState({
        id_noticias: '',
        titulo: '',
        descricao: '',
        data: '',
        imagem: null,
        usuario: '',
        categoria: ''
    });

    const [preview, setPreview] = useState(null);
    const [responseContent, setResponseContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!noticiaId) return;

        setFormData(prev => ({ ...prev, id_noticias: noticiaId }));
        setIsLoading(true);

        fetch(`http://localhost:3001/noticias/${noticiaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Notícia não encontrada');
            }
            return response.json();
        })
        .then(data => {
            setFormData({
                id_noticias: noticiaId,
                titulo: data.titulo || '',
                descricao: data.descricao || '',
                data: data.data?.substring(0, 10) || '',
                imagem: null,
                usuario: data.usuario || '',
                categoria: data.categoria || ''
            });
        })
        .catch(error => {
            console.error('Erro ao carregar a notícia:', error);
            setResponseContent('Erro ao carregar as informações da notícia.');
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [noticiaId]);

    function handleChange(e) {
        const { name, value, files } = e.target;

        if (name === 'imagem' && files?.length > 0) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
            
            // Criar preview da imagem
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
      
        const formElement = e.target;
        const formDataToSend = new FormData(formElement);
      
        try {
            const response = await fetch(`http://localhost:3001/noticias/${formData.id_noticias}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'SEGREDO'
                },
                body: formDataToSend
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ${response.status}: ${errorText}`);
            } 
      
            setResponseContent('Notícia atualizada com sucesso!');
            
            // Redireciona após 2 segundos
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            console.error('Erro ao atualizar notícia:', error);
            setResponseContent('Erro ao atualizar notícia. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!noticiaId) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl">
                    <h1 className={`text-2xl font-bold text-gray-800 text-center mb-4`}>
                        Acesso Inválido
                    </h1>
                    <p className={`text-gray-600 text-center`}>
                        Você precisa selecionar uma notícia para editar.
                    </p>
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => router.push('/')}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Voltar para Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen py-10 bg-gray-50">
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
                <h1 className={`text-3xl font-bold mb-6 text-gray-800 text-center`}>
                    Editar Notícia
                </h1>

                {isLoading ? (
                    <div className="text-center py-8">
                        <p className={`text-gray-600`}>Carregando...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="hidden" name="id_noticias" value={formData.id_noticias} />

                        {/* Título */}
                        <div>
                            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
                                Título
                            </label>
                            <input
                                type="text"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                required
                            />
                        </div>

                        {/* Descrição */}
                        <div>
                            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
                                Descrição
                            </label>
                            <textarea
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 h-32"
                                required
                            />
                        </div>

                        {/* Data */}
                        <div>
                            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
                                Data da Postagem
                            </label>
                            <input
                                type="date"
                                name="data"
                                value={formData.data}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                required
                            />
                        </div>

                        {/* Imagem */}
                        <div>
                            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
                                Nova Imagem
                            </label>
                            <input
                                type="file"
                                name="imagem"
                                onChange={handleChange}
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            />
                            <p className={`mt-1 text-sm text-gray-500`}>
                                Deixe em branco para manter a imagem atual
                            </p>
                            {preview && (
                                <div className="mt-4">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full max-h-64 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Usuário */}
                        <div>
                            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
                                ID do Usuário
                            </label>
                            <input
                                type="number"
                                name="usuario"
                                value={formData.usuario}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                required
                            />
                        </div>

                        {/* Categoria */}
                        <div>
                            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
                                Categoria
                            </label>
                            <select
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                required
                            >
                                <option value="">Selecione uma categoria</option>
                                {CATEGORIAS.map(categoria => (
                                    <option key={categoria} value={categoria}>
                                        {categoria}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Botão Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`
                                
                                w-full bg-blue-600 text-white py-2 px-4 rounded-lg 
                                hover:bg-blue-700 transition duration-300 
                                disabled:opacity-50 disabled:cursor-not-allowed
                            `}
                        >
                            {isLoading ? 'Atualizando...' : 'Atualizar Notícia'}
                        </button>
                    </form>
                )}

                {responseContent && (
                    <div className={`mt-6 p-4 rounded-lg ${responseContent.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        <p className={``}>{responseContent}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

