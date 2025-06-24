"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem('usuarioAutenticado'));
        setUsuarioAutenticado(dados);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('usuarioAutenticado');
        setUsuarioAutenticado(null);
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        router.push('/');
    };

    const getNomeUsuario = () => {
        if (!usuarioAutenticado?.email) return '';
        return usuarioAutenticado.email.split('@')[0];
    };

    return (
        <>
            <nav className={`bg-blue-600 border-t-2 border-b-2`}>
                <div className="w-full px-4">
                    <div className="flex justify-between h-20 items-center">
                        {/* Logo e Nome */}
                        <div className="flex items-center space-x-3">
                            <img 
                                src="/geral.imgs/logo2.PNG" 
                                alt="Logo IDP" 
                                className="h-16 w-auto object-contain"
                            />
                            <Link href="/" className="text-white hover:text-gray-200 transition-colors text-2xl font-bold">
                                IDP NEWS
                            </Link>
                        </div>

                        {/* Menu de navegação centralizado - visível apenas em desktop */}
                        <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
                            <div className="flex space-x-12">
                                <Link href="/noticias" className="text-white hover:text-gray-200 transition-colors text-lg">
                                    Notícias
                                </Link>
                                <Link href="/avisos" className="text-white hover:text-gray-200 transition-colors text-lg">
                                    Avisos
                                </Link>
                                <Link href="/eventos" className="text-white hover:text-gray-200 transition-colors text-lg">
                                    Eventos
                                </Link>
                            </div>
                        </div>

                        {/* Área do usuário */}
                        <div className="hidden md:flex items-center">
                            {usuarioAutenticado ? (
                                <div>
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-blue-600 font-bold py-2.5 px-5 rounded-lg transition-colors text-lg"
                                    >
                                        <span>{getNomeUsuario()}</span>
                                        <svg
                                            className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute right-4 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                                            >
                                                Sair
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <Link 
                                        href="/login"
                                        className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2.5 px-5 rounded-lg transition-colors text-lg"
                                    >
                                        Entrar
                                    </Link>
                                    <Link 
                                        href="/cadastro"
                                        className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2.5 px-5 rounded-lg transition-colors text-lg"
                                    >
                                        Cadastre-se
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Botão do menu mobile */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-white hover:text-gray-200 focus:outline-none"
                            >
                                <svg
                                    className="h-8 w-8"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {isMobileMenuOpen ? (
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu mobile */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-blue-700">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link
                                href="/noticias"
                                className="block px-3 py-2.5 text-white hover:bg-blue-800 rounded-md transition-colors text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Notícias
                            </Link>
                            <Link
                                href="/avisos"
                                className="block px-3 py-2.5 text-white hover:bg-blue-800 rounded-md transition-colors text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Avisos
                            </Link>
                            <Link
                                href="/eventos"
                                className="block px-3 py-2.5 text-white hover:bg-blue-800 rounded-md transition-colors text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Eventos
                            </Link>

                            {usuarioAutenticado ? (
                                <div className="border-t border-blue-800 pt-2">
                                    <div className="px-3 py-2.5 text-white font-medium text-lg">
                                        {getNomeUsuario()}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-3 py-2.5 text-white hover:bg-blue-800 rounded-md transition-colors text-lg"
                                    >
                                        Sair
                                    </button>
                                </div>
                            ) : (
                                <div className="border-t border-blue-800 pt-2 space-y-1">
                                    <Link
                                        href="/login"
                                        className="block px-3 py-2.5 text-white hover:bg-blue-800 rounded-md transition-colors text-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        href="/cadastro"
                                        className="block px-3 py-2.5 text-white hover:bg-blue-800 rounded-md transition-colors text-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Cadastre-se
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}