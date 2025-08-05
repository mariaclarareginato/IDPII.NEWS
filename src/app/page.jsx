'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "./components/Carousel/Carousel";
import { buscarNoticias } from "./services/noticiasService";
import { Roboto, Merriweather, Playfair_Display } from 'next/font/google';
import Accordion from "./components/Accordion/Accordion.js";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});

// Perguntas frequentes e respostas 
const faqItems = [
  {
    question: 'Todos podem criar, editar ou deletar notícias?',
    answer: 'Os alunos só podem visualizar as notícias, já os professores, a gestão e o grêmio têm a possibilidade de criar também. Somente a gestão pode deletar e atualizar notícias.',
  },
  {
    question: 'Como posso verificar meu email institucional?',
    answer: 'Entre em contato conosco para receber seu email institucional, caso você trabalhe ou estude em nosso colégio técnico.',
  },
  {
    question: 'De quanto em quanto tempo as notícias são atualizadas?',
    answer: 'As notícias deste portal são atualizadas diariamente.',
  },
  {
    question: 'Se eu não tenho email institucional, posso atualizar, criar ou deletar alguma notícia?',
    answer: 'Não. Se você não possui email institucional, não pode criar, deletar ou atualizar notícias, apenas visualizar. Além disso, não poderá atualizar sua senha no portal. Caso esqueça a senha, entre em contato ou vá até o colégio.',
  },
];






export default function Home() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarNoticias = async () => {
      try {
        const data = await buscarNoticias();
        setNoticias(data);
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
        setError('Falha ao carregar notícias. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    carregarNoticias();
  }, []);

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

  // Pega as imagens das 4 notícias mais recentes para o carrossel
  const carouselSlides = noticias
    .slice(0, 4)
    .map(noticia => ({
      image: getImageUrl(noticia),
      title: noticia.titulo,
      description: noticia.descricao,
      category: noticia.categoria,
      date: formatarData(noticia.data),
      id: noticia.id_noticias
    }));

  if (loading) {
    return (
      <div className="h-full min-h-48 flex items-center justify-center">
        <p className={`${roboto.className}`}>Carregando notícias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full min-h-48 flex items-center justify-center">
        <p className={`${roboto.className} text-red-500`}>{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Texto Principal */}
            <div className="md:col-span-7 space-y-6 relative">
              <h1 className={`${playfairDisplay.className} text-4xl md:text-5xl font-bold text-gray-900 leading-tight`}>
                <span className="text-blue-600">Educação</span> que transforma,<br />
                <span className="text-blue-600">Conhecimento</span> que inspira
              </h1>
              <p className={`${merriweather.className} text-lg text-gray-600 max-w-2xl`}>
                Descubra as últimas novidades, eventos e conquistas da nossa comunidade acadêmica. 
                Mantenha-se informado sobre tudo que acontece no Instituto Dom Pedro II.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="/noticias" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg group"
                >
                  Últimas Notícias
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/eventos" 
                  className="inline-flex items-center px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-lg border border-gray-200"
                >
                  Calendário de Eventos
                </Link>
              </div>

              {/* Decorative dots */}
              <div className="absolute -left-4 -bottom-4 w-24 h-24 opacity-20">
                <div className="absolute w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="absolute w-2 h-2 bg-blue-600 rounded-full" style={{ left: '12px', top: '12px' }}></div>
                <div className="absolute w-2 h-2 bg-blue-600 rounded-full" style={{ left: '24px', top: '24px' }}></div>
              </div>
            </div>

            {/* Cards Informativos */}
            <div className="md:col-span-5 grid grid-cols-2 gap-4 relative">
              <Link href="/noticias">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="text-blue-600 mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className={`${merriweather.className} font-bold text-gray-900`}>Notícias</h3>
                <p className="text-sm text-gray-600">Atualizações diárias sobre nossa instituição</p>
              </div>
              </Link>

              <Link href="/eventos">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="text-blue-600 mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className={`${merriweather.className} font-bold text-gray-900`}>Eventos</h3>
                <p className="text-sm text-gray-600">Programação de eventos e atividades</p>
              </div>
              </Link>

              <Link href="/avisos">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="text-blue-600 mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                
                <h3 className={`${merriweather.className} font-bold text-gray-900`}>Avisos</h3>
                <p className="text-sm text-gray-600">Comunicados importantes para alunos</p>
                
              </div>
              </Link>

              <Link href="/sobre">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="text-blue-600 mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className={`${merriweather.className} font-bold text-gray-900`}>Sobre Nós</h3>
                <p className="text-sm text-gray-600">Veja um pouco sobre nossa história</p>
              </div>
              </Link>

              {/* Decorative circle */}
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-600/5 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Principais Notícias */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-gray-900 mb-4`}>
              Principais Notícias
            </h2>
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
              <span className={`${merriweather.className} text-blue-600 font-semibold`}>Em Destaque</span>
              <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
            </div>
            <p className={`${merriweather.className} text-gray-600 max-w-2xl mx-auto`}>
              Fique por dentro das notícias mais relevantes e dos acontecimentos que estão movimentando nossa instituição
            </p>
          </div>

          {/* Carrossel com Indicadores */}
          <div className="relative">
            <Carousel 
              slides={carouselSlides.length > 0 ? carouselSlides : [
                {
                  image: "/imgs/imgsteste/futsal.jpeg",
                  title: "Campeonato de Futsal",
                  description: "Competição esportiva entre as turmas do Instituto",
                  category: "Esportes",
                  date: "01/01/2024"
                },
                {
                  image: "/imgs/imgsteste/junina.png",
                  title: "Festa Junina",
                  description: "Celebração das tradições juninas no Instituto",
                  category: "Eventos",
                  date: "01/01/2024"
                },
                {
                  image: "/imgs/imgsteste/exame.jpg",
                  title: "Período de Exames",
                  description: "Informações sobre as avaliações finais",
                  category: "Acadêmico",
                  date: "01/01/2024"
                },
                {
                  image: "/imgs/imgsteste/reuniao.png",
                  title: "Reunião de Pais",
                  description: "Encontro entre pais e professores",
                  category: "Comunicados",
                  date: "01/01/2024"
                }
              ]} 
            />
          </div>

          {/* Link para todas as notícias */}
          <div className="text-center mt-8">
            <Link 
              href="/noticias" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Ver todas as notícias
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Indicadores de Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-blue-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <div className={`${playfairDisplay.className} text-2xl font-bold text-gray-900 mb-1`}>
                {noticias.length}+
              </div>
              <p className="text-gray-600 text-sm">Notícias Publicadas</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-blue-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className={`${playfairDisplay.className} text-2xl font-bold text-gray-900 mb-1`}>
                24h
              </div>
              <p className="text-gray-600 text-sm">Atualização Diária</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-blue-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className={`${playfairDisplay.className} text-2xl font-bold text-gray-900 mb-1`}>
                1000+
              </div>
              <p className="text-gray-600 text-sm">Alunos Alcançados</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-blue-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2M7 7h10" />
                </svg>
              </div>
              <div className={`${playfairDisplay.className} text-2xl font-bold text-gray-900 mb-1`}>
                4
              </div>
              <p className="text-gray-600 text-sm">Categorias</p>
            </div>
          </div>
        </div>
      </div>

      <br className="bg-gray-100" />


      {/* Grid de Notícias */}

      <div className="flex w-full items-center justify-center p-3 bg-gray-100 text-black">
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
    {noticias.map((noticia) => (
      <Link 
        href={`/noticias/${noticia.id_noticias}`}
        key={noticia.id_noticias}
        className="group"
      >
        <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="relative">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={getImageUrl(noticia)}
                alt={noticia.titulo}
                width={400}
                height={300}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
            <span className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {noticia.categoria}
            </span>
    </div>

          <div className="p-4 flex flex-col flex-grow">
            <h2 className={`${merriweather.className} text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300`}>
              {noticia.titulo}
      </h2>
            <p className={`${roboto.className} text-sm text-gray-600 mb-2`}>
              {formatarData(noticia.data)}
            </p>
            <p className={`${roboto.className} text-sm text-gray-700 line-clamp-3 mb-4`}>
              {noticia.descricao}
            </p>
            <div className="mt-auto flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
              <span>Ler mais</span>
              <svg 
                className="w-5 h-5 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    ))}
      </div>
    </div>


{/* Accordion de perguntas frequentes */}

<div className="w-full flex justify-center bg-gray-100 py-10">
  <section className="w-full max-w-6xl px-4 text-gray-700">
    <div className="text-center mb-12">
      <h2 className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-gray-900 mb-4`}>
        Perguntas Frequentes
      </h2>
      <div className="flex justify-center items-center gap-4 mb-6">
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
        <span className={`${merriweather.className} text-blue-600 font-semibold`}>FAQ</span>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
      </div>
      <p className={`${merriweather.className} text-gray-600 max-w-2xl mx-auto mb-8`}>
        Encontre respostas para as dúvidas mais comuns sobre nosso portal de notícias
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Accordion items={faqItems.slice(0, Math.ceil(faqItems.length / 2))} />
      <Accordion items={faqItems.slice(Math.ceil(faqItems.length / 2))} />
  </div>
  </section>
</div>

</>
  );
}