'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation';



const CATEGORIAS = [
  'Educação',
  'Esporte',
  'Tecnologia',
  'Sustentabilidade',
  'Economia',
  'Cultura'
];

const TIPOS_CONTEUDO = [
  { id: 'noticia', nome: 'Notícia' },
  { id: 'aviso', nome: 'Aviso' },
  { id: 'evento', nome: 'Evento' }
];

export default function Criar() {
  const router = useRouter();
  const [tipoConteudo, setTipoConteudo] = useState('noticia');
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    data: new Date().toISOString().split('T')[0],
    imagem: null,
    usuario: '',
    categoria: '',
    // Campos específicos para eventos
    data_inicio: new Date().toISOString().split('T')[0],
    data_fim: new Date().toISOString().split('T')[0],
    local: ''
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  const handleTipoConteudoChange = (e) => {
    setTipoConteudo(e.target.value);
    // Limpar campos específicos ao mudar o tipo
    setFormData(prev => ({
      ...prev,
      imagem: null,
      categoria: '',
      data_inicio: new Date().toISOString().split('T')[0],
      data_fim: new Date().toISOString().split('T')[0],
      local: ''
    }));
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const formDataToSend = new FormData();
      const endpoint = tipoConteudo === 'noticia' 
        ? 'noticias' 
        : tipoConteudo === 'aviso' 
          ? 'avisos' 
          : 'eventos';

      // Campos comuns
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('descricao', formData.descricao);

      // Campos específicos por tipo
      if (tipoConteudo === 'noticia') {
        formDataToSend.append('data', formData.data);
        formDataToSend.append('categoria', formData.categoria);
        formDataToSend.append('usuario', '1'); // ID do usuário admin
        if (formData.imagem) {
          formDataToSend.append('imagem', formData.imagem);
        }
      } else if (tipoConteudo === 'evento') {
        formDataToSend.append('titulo', formData.titulo);
        formDataToSend.append('descricao', formData.descricao);
        formDataToSend.append('data_inicio', new Date(formData.data_inicio).toISOString());
        formDataToSend.append('data_fim', new Date(formData.data_fim).toISOString());
        formDataToSend.append('local', formData.local);
        if (formData.imagem) {
          formDataToSend.append('imagem', formData.imagem);
        }
      } else {
        // Para avisos
        const dataFormatada = new Date(formData.data).toISOString().split('T')[0];
        formDataToSend.append('titulo', formData.titulo);
        formDataToSend.append('descricao', formData.descricao);
        formDataToSend.append('data', dataFormatada);
      }

      console.log('Dados sendo enviados:', {
        tipo: tipoConteudo,
        dados: Object.fromEntries(formDataToSend)
      });

      const headers = {};
      if (tipoConteudo === 'aviso') {
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(`http://localhost:3001/${endpoint}`, {
        method: 'POST',
        headers,
        body: tipoConteudo === 'aviso' ? JSON.stringify({
          titulo: formData.titulo,
          descricao: formData.descricao,
          data: new Date(formData.data).toISOString().split('T')[0]
        }) : formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Resposta do servidor:', errorData);
        try {
          const jsonError = JSON.parse(errorData);
          throw new Error(jsonError.mensagem || `Falha ao criar ${tipoConteudo}`);
        } catch (e) {
          throw new Error(`Falha ao criar ${tipoConteudo}: ${errorData}`);
        }
      }

      const data = await response.json();
      setSuccess(true);
      
      setTimeout(() => {
        router.push(tipoConteudo === 'noticia' ? '/' : `/${tipoConteudo}s`);
      }, 2000);

    } catch (err) {
      console.error('Erro detalhado:', err);
      setError(err.message || `Falha ao criar ${tipoConteudo}. Tente novamente.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 text-center text-gray-800`}>
          Criar Novo Conteúdo
        </h1>

        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            {tipoConteudo.charAt(0).toUpperCase() + tipoConteudo.slice(1)} criado(a) com sucesso! Redirecionando...
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Seleção do Tipo de Conteúdo */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1`}>
              Tipo de Conteúdo
            </label>
            <select
              value={tipoConteudo}
              onChange={handleTipoConteudoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              {TIPOS_CONTEUDO.map(tipo => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </option>
              ))}
            </select>
          </div>

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
              {tipoConteudo === 'evento' ? 'Descrição do Evento' : 'Descrição'}
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

          {/* Campos específicos para cada tipo */}
          {tipoConteudo === 'noticia' && (
            <>
              {/* Data */}
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1`}>
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

              {/* Categoria */}
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1`}>
                  Categoria
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
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

              {/* Imagem */}
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1`}>
                  Imagem
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
            </>
          )}

          {tipoConteudo === 'evento' && (
            <>
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
            </>
          )}

          {tipoConteudo === 'aviso' && (
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-1`}>
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
          )}

          {/* Botão Submit */}
          <div className="flex justify-end">
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
              {loading ? 'Criando...' : `Criar ${tipoConteudo.charAt(0).toUpperCase() + tipoConteudo.slice(1)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}