'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Roboto, Merriweather } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ListaEventos() {
  const [eventos, setEventos] = useState([]);
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
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await fetch('http://localhost:3001/eventos');
      if (!response.ok) {
        throw new Error('Falha ao carregar eventos');
      }
      const data = await response.json();
      setEventos(data);
    } catch (err) {
      setError('Erro ao carregar eventos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (id) => {
    router.push(`/eventos/editar/${id}`);
  };

  const handleDeletar = async (id) => {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        const response = await fetch(`http://localhost:3001/eventos/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Falha ao excluir evento');
        }

        // Atualiza a lista após excluir
        fetchEventos();
      } catch (err) {
        console.error('Erro ao excluir evento:', err);
        alert('Erro ao excluir evento. Tente novamente.');
      }
    }
  };

  const getImageUrl = (evento) => {
    if (!evento.imagem) return '/placeholder-event.jpg';
    return `http://localhost:3001${evento.imagem}`;
  };

  const formatarData = (data) => {
    if (!data) return 'Data não definida';
    try {
      return new Date(data).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data inválida';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className={`${roboto.className} text-lg`}>Carregando eventos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className={`${roboto.className} text-red-500 mb-4`}>{error}</p>
        <button
          onClick={() => router.push('/')}
          className={`${roboto.className} text-blue-600 hover:text-blue-800`}
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className={`${merriweather.className} text-4xl font-bold mb-4`}>
              Eventos
            </h1>
            <p className={`${roboto.className} text-lg text-blue-100 max-w-2xl mx-auto`}>
              Confira os próximos eventos e atividades da nossa instituição. Fique por dentro de todas as oportunidades de aprendizado e networking.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-1">{eventos.length}</div>
                <div className="text-blue-100">Eventos Ativos</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-1">
                  {eventos.filter(e => new Date(e.data_inicio) > new Date()).length}
                </div>
                <div className="text-blue-100">Próximos Eventos</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-1">
                  {eventos.filter(e => new Date(e.data_inicio) <= new Date() && new Date(e.data_fim) >= new Date()).length}
                </div>
                <div className="text-blue-100">Eventos em Andamento</div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {(tipoUsuario === 'gestao' || tipoUsuario === 'colaborador') && (
            <div className="text-center mt-8">
              <button
                onClick={() => router.push('/Criar')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-300 shadow-md flex items-center mx-auto font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Novo Evento
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {eventos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center border-l-4 border-blue-600">
            <svg className="w-16 h-16 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className={`${roboto.className} text-gray-600 text-lg`}>
              Nenhum evento disponível no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.map((evento) => (
              <div 
                key={evento.id_Eventos} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t border-blue-100"
              >
                <div className="relative h-48">
                  <Image
                    src={getImageUrl(evento)}
                    alt={evento.titulo}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h2 className={`${merriweather.className} text-xl font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-300`}>
                    {evento.titulo}
                  </h2>
                  <p className={`${roboto.className} text-gray-600 mb-4 line-clamp-3`}>
                    {evento.texto}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p className="flex items-center text-blue-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {evento.local}
                    </p>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Início: {formatarData(evento.data_inicio)}
                    </p>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Fim: {formatarData(evento.data_fim)}
                    </p>
                  </div>

                  {(tipoUsuario === 'gestao' || tipoUsuario === 'colaborador') && (
                    <div className="mt-4 flex justify-end space-x-3">
                      <button
                        onClick={() => handleEditar(evento.id_Eventos)}
                        className="text-blue-600 hover:text-blue-800 transition duration-300 flex items-center hover:scale-105"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletar(evento.id_Eventos)}
                        className="text-red-600 hover:text-red-800 transition duration-300 flex items-center hover:scale-105"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Excluir
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