'use client';


// Importaçãoes 


import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";



// Funcionalidade (Verificação se email é institucional e confirmação/redefinição de senha) 

export default function EsqueciSenha() {

  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [csenha, setCsenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmSenha, setMostrarConfirmSenha] = useState(false);
  const router = useRouter();

  const handleRedefinirSenha = async (e) => {
    e.preventDefault();
  
    
    if (csenha !== novaSenha) {
      alert('As senhas não coincidem.');
      return;
    }
  
 
    const dominiosPermitidos = ["@aluno.com", "@gestao.com", "@gremio.com", "@professor.com"];
    const emailValido = dominiosPermitidos.some((dominio) => email.endsWith(dominio));
  
    if (!emailValido) {
      alert("Apenas e-mails institucionais podem trocar de senha. Se você não tem um, por favor, entre em contato conosco.");
      return;
    }
  
    try {
     
      const resposta = await axios.post("http://localhost:3004/esquecisenha", {
        email,
        novaSenha,
      });
  
      alert(resposta.data.mensagem || "Senha atualizada com sucesso!");
      router.push("/login");
  
    } catch (err) {
      alert(err.response?.data?.mensagem || "Erro ao redefinir a senha.");
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
              Recupere sua senha
            </h1>
            <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-center text-gray-600">
              Digite seu email institucional para<br />
              redefinir sua senha
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleRedefinirSenha}>
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
                Nova senha
              </label>
              <div className="relative">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  placeholder="••••••••"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
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
                Confirme a nova senha
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
              <span>Redefinir senha</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="h-px flex-1 bg-gray-300"></span>
              <span className="text-sm text-gray-500 font-medium">ou</span>
              <span className="h-px flex-1 bg-gray-300"></span>
            </div>
            <div className="text-center">
              <button
                onClick={() => router.push('/login')}
                className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
              >
                Voltar para o login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


  