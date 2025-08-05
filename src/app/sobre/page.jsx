'use client'
import React from 'react';
import { Roboto, Merriweather, Playfair_Display } from 'next/font/google';
import Image from 'next/image';

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

// Dados da equipe de gestão
const equipeGestao = [
  {
    nome: "Maria Silva",
    cargo: "Diretora Geral",
    foto: "/geral.imgs/diretora.png",
    descricao: "Mais de 20 anos de experiência em educação"
  },
  {
    nome: "João Santos",
    cargo: "Coordenador Pedagógico",
    foto: "/geral.imgs/pedagogico.png",
    descricao: "Especialista em metodologias ativas"
  },
  {
    nome: "Ana Oliveira",
    cargo: "Coordenadora de TI",
    foto: "/geral.imgs/coordTi.png",
    descricao: "Mestre em Tecnologia Educacional"
  }
];

// Marcos históricos
const marcosHistoricos = [
  {
    ano: "1995",
    titulo: "Fundação",
    descricao: "Início das atividades do Instituto Dom Pedro II"
  },
  {
    ano: "2005",
    titulo: "Expansão",
    descricao: "Inauguração do novo campus e laboratórios de tecnologia"
  },
  {
    ano: "2015",
    titulo: "Modernização",
    descricao: "Implementação do programa de educação digital"
  },
  {
    ano: "2020",
    titulo: "Inovação",
    descricao: "Lançamento da plataforma de ensino híbrido"
  }
];

// Números e estatísticas
const estatisticas = [
  {
    numero: "1000+",
    titulo: "Alunos",
    descricao: "Formando futuros líderes"
  },
  {
    numero: "50+",
    titulo: "Professores",
    descricao: "Equipe altamente qualificada"
  },
  {
    numero: "95%",
    titulo: "Aprovação",
    descricao: "Taxa de satisfação dos alunos"
  },
  {
    numero: "25+",
    titulo: "Anos",
    descricao: "De excelência em educação"
  }
];

export default function Sobre() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section com Parallax */}
      <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/geral.imgs/fundo.PNG"
            alt="Fachada do Instituto"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-3xl">
                <h1 className={`${playfairDisplay.className} text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight`}>
                  Transformando o Futuro através da Educação
                </h1>
                <p className={`${merriweather.className} text-xl text-blue-100 max-w-2xl`}>
                  Há mais de 25 anos formando líderes e inovadores com excelência acadêmica e valores sólidos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Nossa História */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className={`${playfairDisplay.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-6`}>
              Nossa História
            </h2>
            <p className={`${merriweather.className} text-lg text-gray-600`}>
              O Instituto Dom Pedro II nasceu do sonho de oferecer uma educação transformadora,
              que une tradição e inovação. Nossa jornada é marcada por conquistas e evolução constante.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marcosHistoricos.map((marco, index) => (
              <div key={index} className="relative p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 left-6 bg-blue-600 text-white px-4 py-2 rounded-full">
                  {marco.ano}
                </div>
                <h3 className={`${merriweather.className} text-xl font-bold text-gray-900 mt-4 mb-3`}>
                  {marco.titulo}
                </h3>
                <p className={`${roboto.className} text-gray-600`}>
                  {marco.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Missão, Visão e Valores com Cards Interativos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={`${merriweather.className} text-2xl font-bold text-gray-900 mb-4`}>
                Nossa Missão
              </h3>
              <p className={`${roboto.className} text-gray-600`}>
                Formar cidadãos críticos e inovadores, preparados para os desafios do século XXI,
                através de uma educação de excelência que integra tecnologia e valores humanos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className={`${merriweather.className} text-2xl font-bold text-gray-900 mb-4`}>
                Nossa Visão
              </h3>
              <p className={`${roboto.className} text-gray-600`}>
                Ser reconhecido como referência em educação tecnológica e inovação,
                formando líderes que impactam positivamente a sociedade através de soluções criativas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={`${merriweather.className} text-2xl font-bold text-gray-900 mb-4`}>
                Nossos Valores
              </h3>
              <ul className={`${roboto.className} text-gray-600 space-y-2`}>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Inovação e Criatividade
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Excelência Acadêmica
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Ética e Integridade
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Responsabilidade Social
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Números e Estatísticas */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {estatisticas.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`${playfairDisplay.className} text-4xl font-bold mb-2`}>
                  {stat.numero}
                </div>
                <div className={`${merriweather.className} text-xl mb-2`}>
                  {stat.titulo}
                </div>
                <div className={`${roboto.className} text-blue-100`}>
                  {stat.descricao}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Equipe de Gestão */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`${playfairDisplay.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-6`}>
              Nossa Equipe de Gestão
            </h2>
            <p className={`${merriweather.className} text-lg text-gray-600 max-w-2xl mx-auto`}>
              Conheça os profissionais dedicados que lideram nossa instituição com excelência e compromisso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipeGestao.map((membro, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={membro.foto}
                    alt={membro.nome}
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className={`${merriweather.className} text-xl font-bold text-gray-900 mb-2`}>
                  {membro.nome}
                </h3>
                <div className={`${roboto.className} text-blue-600 font-medium mb-2`}>
                  {membro.cargo}
                </div>
                <p className={`${roboto.className} text-gray-600`}>
                  {membro.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`${playfairDisplay.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-6`}>
            Faça Parte da Nossa História
          </h2>
          <p className={`${merriweather.className} text-lg text-gray-600 max-w-2xl mx-auto mb-8`}>
            Venha construir o futuro conosco. O Instituto Dom Pedro II está sempre de portas abertas para 
            novos talentos que desejam fazer a diferença através da educação.
          </p>
          <a
            href="/contato"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
          >
            Entre em Contato
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
} 