'use client';

// Importações 

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Funcionalidade (Confirmação de senha, Verificação email institucional, entre outros)

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [csenha, setCsenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmSenha, setMostrarConfirmSenha] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== csenha) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      const resposta = await axios.post('http://localhost:3004/login', {
        email,
        senha,
      });

      alert(resposta.data.mensagem);

      localStorage.setItem('usuarioAutenticado', JSON.stringify({
        email: resposta.data.email
      }));

      const emailUsuario = resposta.data.email || email;

      if (emailUsuario.endsWith('@aluno.com')) {
        router.push('/');
      } else if (emailUsuario.endsWith('@gestao.com')) {
        router.push('/noticias');
      } else if (
        emailUsuario.endsWith('@gremio.com') ||
        emailUsuario.endsWith('@professor.com')
      ) {
        router.push('/');
      } else {
        router.push('/');
      }

    } catch (erro) {
      if (erro.response) {
        alert(erro.response.data.mensagem);
      } else {
        alert('Erro ao fazer login.');
      }
    }
  };


  // Formulário

  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 bg-no-repeat z-0"
        style={{backgroundImage: "url('/geral.imgs/fundo.png')"}}
      ></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-3">
              Bem-vindo de volta!
            </h1>
            <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-center text-gray-600">
              Acesse sua conta para explorar as novidades do<br />
              <span className="font-semibold text-blue-800">Instituto Dom Pedro II</span>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email institucional
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  placeholder="seu.email@dominio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {mostrarSenha ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirme sua senha
              </label>
              <div className="relative">
                <input
                  type={mostrarConfirmSenha ? "text" : "password"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  placeholder="••••••••"
                  value={csenha}
                  onChange={(e) => setCsenha(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmSenha(!mostrarConfirmSenha)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {mostrarConfirmSenha ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2 font-medium"
            >
              <span>Entrar</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="h-px flex-1 bg-gray-300"></span>
              <span className="text-sm text-gray-500 font-medium">ou</span>
              <span className="h-px flex-1 bg-gray-300"></span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-sm">
              <button
                onClick={() => router.push('/cadastro')}
                className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
              >
                Não tem conta? Cadastre-se aqui
              </button>
              <button
                onClick={() => router.push('/esquecisenha')}
                className="text-gray-600 hover:text-gray-800 transition duration-200"
              >
                Esqueceu sua senha?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}









