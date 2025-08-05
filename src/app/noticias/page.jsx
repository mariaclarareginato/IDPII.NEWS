'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Merriweather, Roboto } from 'next/font/google';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ListaNoticias() {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [tipoUsuario, setTipoUsuario] = useState('visitante'); // visitante = padrão


    // De acordo com o tipo de usuário execulta certas funções (exemplo: alunos só podem criar notícias)
useEffect(() => {
  const dados = JSON.parse(localStorage.getItem('usuarioAutenticado'));
  if (dados?.email) {
    const email = dados.email;
    if (email.endsWith('@gestao.com')) {
      setTipoUsuario('gestao');
    } else if (email.endsWith('@professor.com') || email.endsWith('@gremio.com')) {
      setTipoUsuario('colaborador');
    } else if (email.endsWith('@aluno.com')) {
      setTipoUsuario('aluno');
    } else {
        setTipoUsuario('visitante')
    } 
  }
}, []);


    useEffect(() => {
        fetchNoticias();
    }, []);

    const fetchNoticias = async () => {
        try {
            const response = await fetch('http://localhost:3001/noticias');
            if (!response.ok) {
                throw new Error('Falha ao carregar notícias');
            }
            const data = await response.json();
            setNoticias(data);
        } catch (err) {
            setError('Erro ao carregar notícias');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditar = (id) => {
        router.push(`/Atualizar?id_noticias=${id}`);
    };

    const handleDeletar = async (id) => {
        if (confirm('Tem certeza que deseja excluir esta notícia?')) {
            try {
                const response = await fetch(`http://localhost:3001/noticias/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Falha ao excluir notícia');
                }

                // Atualiza a lista após excluir
                fetchNoticias();
            } catch (err) {
                console.error('Erro ao excluir notícia:', err);
                alert('Erro ao excluir notícia. Tente novamente.');
            }
        }
    };

    const getImageUrl = (imagem) => {
        if (!imagem) return '/placeholder.jpg';
        
        // Se a imagem começar com 'not' ou estiver no formato antigo
        if (imagem.startsWith('not') || imagem.startsWith('/noticias.imgs/')) {
            return `/noticias.imgs/${imagem.replace('/noticias.imgs/', '')}`;
        }
        
        // Caso contrário, é uma imagem nova do upload
        return `http://localhost:3001/upload/${imagem}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <p className="text-gray-600">Carregando notícias...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center text-red-600">
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1">
                            <h1 className={`${merriweather.className} text-4xl md:text-5xl font-bold mb-4`}>
                                Explore Nosso Acervo de Notícias
                            </h1>
                            <p className={`${roboto.className} text-xl text-blue-100 max-w-2xl`}>
                                Acompanhe as últimas atualizações, eventos e conquistas da nossa comunidade acadêmica
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-blue-100">
                            <div className="text-center px-8 py-4 border-r border-blue-400 last:border-0">
                                <div className={`${merriweather.className} text-3xl font-bold mb-1`}>{noticias.length}</div>
                                <div className="text-sm">Notícias</div>
                            </div>
                            <div className="text-center px-8 py-4 border-r border-blue-400 last:border-0">
                                <div className={`${merriweather.className} text-3xl font-bold mb-1`}>6</div>
                                <div className="text-sm">Categorias</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <div className="flex flex-col items-center text-center mb-8">
                        <h2 className={`${merriweather.className} text-3xl font-bold text-gray-800 mb-4`}>
                            {(tipoUsuario !== 'aluno' && tipoUsuario !== 'visitante') 
                                ? 'Gerenciar Notícias'
                                : 'Últimas Notícias'
                            }
                        </h2>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                            <span className={`${merriweather.className} text-blue-600 font-semibold`}>
                                Atualizações Recentes
                            </span>
                            <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                        </div>
                        <p className={`${roboto.className} text-gray-600 max-w-2xl`}>
                            Confira as notícias mais recentes e mantenha-se atualizado sobre os acontecimentos do Instituto
                        </p>
                    </div>

                    {(tipoUsuario !== 'aluno' && tipoUsuario !== 'visitante') && (
                        <div className="flex justify-center">
                            <button
                                onClick={() => router.push('/Criar')}
                                className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-all duration-300 hover:shadow-md flex items-center gap-2 text-lg"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Nova Notícia
                            </button>
                        </div>
                    )}
                </div>

                {/* Grid de Notícias */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {noticias.map((noticia) => (
                        <div key={noticia.id_noticias} className="group bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
                            <Link href={`/noticias/${noticia.id_noticias}`} className="cursor-pointer flex-grow">
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={getImageUrl(noticia.imagem)}
                                        alt={noticia.titulo}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="transform transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {noticia.categoria}
                                    </span>
                                </div>
                            </Link>

                            <div className="p-6 flex flex-col flex-grow">
                                <Link href={`/noticias/${noticia.id_noticias}`}>
                                    <h2 className={`${merriweather.className} text-xl font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300`}>
                                        {noticia.titulo}
                                    </h2>
                                </Link>
                                
                                <p className={`${roboto.className} text-gray-600 mb-4 line-clamp-3 flex-grow`}>
                                    {noticia.descricao}
                                </p>

                                <div className="flex justify-between items-center mt-auto">
                                    <span className={`${roboto.className} text-sm text-gray-500`}>
                                        {new Date(noticia.data).toLocaleDateString('pt-BR')}
                                    </span>

                                    <div className="flex items-center gap-3">
                                        <Link 
                                            href={`/noticias/${noticia.id_noticias}`}
                                            className="text-blue-600 font-semibold flex items-center gap-1 group-hover:text-blue-700 transition-colors duration-300"
                                        >
                                            Ler mais
                                            <svg 
                                                className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>

                                        {tipoUsuario === 'gestao' && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleEditar(noticia.id_noticias);
                                                    }}
                                                    className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-all duration-300 hover:shadow-md flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDeletar(noticia.id_noticias);
                                                    }}
                                                    className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition-all duration-300 hover:shadow-md flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Excluir
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 