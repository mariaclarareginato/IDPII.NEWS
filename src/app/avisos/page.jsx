"use client";
import Header from "../components/Header/Header";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


const AnnouncementCard = ({ date, title, description }) => {
  return (
    <div className="bg-stone-100 shadow-md rounded-lg p-4 mb-4 hover:scale-108 transition-transform duration-300 ease-in-out">
      <p className="text-sm text-gray-500">{date}</p>
      <h3
        className={`${merriweather.className} text-lg font-semibold text-blue-600 mb-2 `}
      >
        {title}
      </h3>
      <p className={`${roboto.className} text-gray-700 text-sm`}>
        {description}
      </p>
    </div>
  );
};

export default function ListaAvisos() {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState('visitante');

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
      }
    }
  }, []);

  useEffect(() => {
    fetchAvisos();
  }, []);

  const fetchAvisos = async () => {
    try {
      const response = await fetch('http://localhost:3001/avisos');
      if (!response.ok) {
        throw new Error('Falha ao carregar avisos');
      }
      const data = await response.json();
      setAvisos(data);
    } catch (err) {
      setError('Erro ao carregar avisos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (id) => {
    router.push(`/avisos/editar/${id}`);
  };

  const handleDeletar = async (id) => {
    if (confirm('Tem certeza que deseja excluir este aviso?')) {
      try {
        const response = await fetch(`http://localhost:3001/avisos/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Falha ao excluir aviso');
        }

        // Atualiza a lista após excluir
        fetchAvisos();
      } catch (err) {
        console.error('Erro ao excluir aviso:', err);
        alert('Erro ao excluir aviso. Tente novamente.');
      }
    }
  };

  const formatarData = (data) => {
    try {
      return new Date(data).toLocaleDateString('pt-BR');
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data inválida';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className={`text-lg`}>Carregando avisos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className={`text-red-500 mb-4`}>{error}</p>
        <button
          onClick={() => router.push('/')}
          className={`text-blue-600 hover:text-blue-800`}
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-600/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-2 text-blue-100 text-sm mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>Sistema de Comunicados</span>
            </div>

            <h1 className={`text-5xl font-bold text-white mb-6`}>
              Avisos Institucionais
            </h1>
            
            <p className={`text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl`}>
              Mantenha-se informado sobre as últimas atualizações, comunicados importantes e informações essenciais da nossa instituição.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              {(tipoUsuario === 'gestao' || tipoUsuario === 'colaborador') && (
                <button
                  onClick={() => router.push('/Criar')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg flex items-center font-semibold group"
                >
                  <svg className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Publicar Novo Aviso
                </button>
              )}

              <div className="flex items-center space-x-8">
                <div className="flex items-center bg-blue-500/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-blue-100 mr-2">Total de Avisos:</span>
                  <span className="text-white font-bold text-lg">{avisos.length}</span>
                </div>
                <div className="flex items-center bg-blue-500/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-blue-100 mr-2">Recentes:</span>
                  <span className="text-white font-bold text-lg">
                    {avisos.filter(a => {
                      const dataAviso = new Date(a.data);
                      const hoje = new Date();
                      const umaSemanaAtras = new Date();
                      umaSemanaAtras.setDate(hoje.getDate() - 7);
                      return dataAviso >= umaSemanaAtras;
                    }).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-8 fill-current text-gray-100" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 -mt-4">
        {avisos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center border-t-4 border-blue-600">
            <svg className="w-16 h-16 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className={`text-gray-600 text-lg`}>
              Nenhum aviso disponível no momento.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {avisos.map((aviso) => (
              <div 
                key={aviso.id_Avisos} 
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h2 className={`text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300`}>
                        {aviso.titulo}
                      </h2>
                    </div>
                    <p className={`text-gray-600 mb-4 whitespace-pre-wrap leading-relaxed`}>
                      {aviso.descricao}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatarData(aviso.data)}
                    </div>
                  </div>

                  {(tipoUsuario === 'gestao' || tipoUsuario === 'colaborador') && (
                    <div className="flex space-x-3 ml-4">
                      <button
                        onClick={() => handleEditar(aviso.id_Avisos)}
                        className="text-blue-600 hover:text-blue-800 transition duration-300 flex items-center hover:scale-105"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeletar(aviso.id_Avisos)}
                        className="text-red-600 hover:text-red-800 transition duration-300 flex items-center hover:scale-105"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
