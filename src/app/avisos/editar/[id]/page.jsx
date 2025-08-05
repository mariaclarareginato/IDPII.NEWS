'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Roboto, Merriweather } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function EditarAviso({ params }) {
  const router = useRouter();
  const { id } = params;
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    data: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAviso();
  }, [id]);

  const fetchAviso = async () => {
    try {
      const response = await fetch(`http://localhost:3001/avisos/${id}`);
      if (!response.ok) {
        throw new Error('Aviso não encontrado');
      }
      const data = await response.json();
      setFormData({
        titulo: data.titulo,
        descricao: data.descricao,
        data: new Date(data.data).toISOString().split('T')[0]
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/avisos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || 'Erro ao atualizar aviso');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/avisos');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className={`${roboto.className} text-lg`}>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className={`${roboto.className} text-red-500 mb-4`}>{error}</p>
        <button
          onClick={() => router.push('/avisos')}
          className={`${roboto.className} text-blue-600 hover:text-blue-800`}
        >
          Voltar para Avisos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className={`${merriweather.className} text-3xl font-bold mb-8 text-center text-gray-800`}>
          Editar Aviso
        </h1>

        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            Aviso atualizado com sucesso! Redirecionando...
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Título */}
          <div>
            <label className={`${roboto.className} block text-sm font-medium text-gray-700 mb-1`}>
              Título
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className={`${roboto.className} block text-sm font-medium text-gray-700 mb-1`}>
              Descrição
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Data */}
          <div>
            <label className={`${roboto.className} block text-sm font-medium text-gray-700 mb-1`}>
              Data
            </label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/avisos')}
              className={`
                ${roboto.className}
                px-6 py-2 bg-gray-600 text-white rounded-md
                hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500
                transition duration-200
              `}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`
                ${roboto.className}
                px-6 py-2 bg-blue-600 text-white rounded-md
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                transition duration-200
              `}
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 