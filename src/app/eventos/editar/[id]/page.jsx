'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



export default function EditarEvento({ params }) {
  const router = useRouter();
  const { id } = params;
  const [formData, setFormData] = useState({
    titulo: '',
    texto: '',
    data_inicio: '',
    data_fim: '',
    local: '',
    imagem: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchEvento();
  }, [id]);

  const fetchEvento = async () => {
    try {
      const response = await fetch(`http://localhost:3001/eventos/${id}`);
      if (!response.ok) {
        throw new Error('Evento não encontrado');
      }
      const data = await response.json();
      setFormData({
        titulo: data.titulo,
        texto: data.texto,
        data_inicio: new Date(data.data_inicio).toISOString().slice(0, 16),
        data_fim: new Date(data.data_fim).toISOString().slice(0, 16),
        local: data.local,
        imagem: null
      });
      if (data.imagem) {
        setPreview(`http://localhost:3001/upload/eventos/${data.imagem}`);
      }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imagem: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'imagem') {
          if (formData[key]) {
            formDataToSend.append(key, formData[key]);
          }
        } else if (key === 'texto') {
          formDataToSend.append('descricao', formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch(`http://localhost:3001/eventos/${id}`, {
        method: 'PUT',
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || 'Erro ao atualizar evento');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/eventos');
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
        <p className={`text-lg`}>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className={`text-red-500 mb-4`}>{error}</p>
        <button
          onClick={() => router.push('/eventos')}
          className={`text-blue-600 hover:text-blue-800`}
        >
          Voltar para Eventos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 text-center text-gray-800`}>
          Editar Evento
        </h1>

        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            Evento atualizado com sucesso! Redirecionando...
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Título */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
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
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              Descrição do Evento
            </label>
            <textarea
              name="texto"
              value={formData.texto}
              onChange={handleInputChange}
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Data de Início */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              Data de Início
            </label>
            <input
              type="datetime-local"
              name="data_inicio"
              value={formData.data_inicio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Data de Fim */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              Data de Fim
            </label>
            <input
              type="datetime-local"
              name="data_fim"
              value={formData.data_fim}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Local */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              Local
            </label>
            <input
              type="text"
              name="local"
              value={formData.local}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Imagem */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              Imagem do Evento
            </label>
            <input
              type="file"
              name="imagem"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg"
                  style={{ maxHeight: '200px' }}
                />
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/eventos')}
              className={`
                
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