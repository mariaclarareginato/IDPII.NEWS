'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { buscarNoticiaPorId } from '../../services/noticiasService';
import { Roboto, Merriweather } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function NoticiaDetalhes() {
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const carregarNoticia = async () => {
      try {
        const data = await buscarNoticiaPorId(params.id);
        setNoticia(data);
      } catch (error) {
        console.error('Erro ao carregar notícia:', error);
        setError('Falha ao carregar a notícia. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    carregarNoticia();
  }, [params.id]);

  // Função para formatar a data
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para pegar a imagem (com fallback)
  const getImageUrl = (noticia) => {
    if (!noticia.imagem) return '/noticias.imgs/default.png';
    
    // Se a imagem começar com 'not' ou estiver no formato antigo
    if (noticia.imagem.startsWith('not') || noticia.imagem.startsWith('/noticias.imgs/')) {
      return `/noticias.imgs/${noticia.imagem.replace('/noticias.imgs/', '')}`;
    }
    
    // Caso contrário, é uma imagem nova do upload
    return `http://localhost:3001/upload/${noticia.imagem}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className={`${roboto.className} text-lg`}>Carregando notícia...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className={`${roboto.className} text-red-500 mb-4`}>{error}</p>
        <Link 
          href="/"
          className={`${roboto.className} text-blue-600 hover:text-blue-800`}
        >
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className={`${roboto.className} text-lg mb-4`}>Notícia não encontrada.</p>
        <Link 
          href="/"
          className={`${roboto.className} text-blue-600 hover:text-blue-800`}
        >
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Botão Voltar */}
        <Link 
          href="/"
          className={`${roboto.className} text-blue-600 hover:text-blue-800 mb-6 inline-block`}
        >
          ← Voltar para a página inicial
        </Link>

        {/* Cabeçalho da Notícia */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="relative h-96">
            <Image
              src={getImageUrl(noticia)}
              alt={noticia.titulo}
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
              priority
            />
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`${roboto.className} text-sm text-gray-600`}>
                {formatarData(noticia.data)}
              </span>
              <span className={`${roboto.className} px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium`}>
                {noticia.categoria}
              </span>
            </div>

            <h1 className={`${merriweather.className} text-3xl font-bold mb-4 text-gray-900`}>
              {noticia.titulo}
            </h1>

            <div className={`${roboto.className} text-gray-700 leading-relaxed space-y-4`}>
              {noticia.descricao.split('\n').map((paragrafo, index) => (
                <p key={index}>{paragrafo}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 