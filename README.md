# IDP News – Portal de Notícias do Instituto Dom Pedro II

![logoofc](https://github.com/user-attachments/assets/7bf05b81-5ff1-4d13-bf1c-fca4bf6f2733)


**IDP News** é um portal institucional desenvolvido com o objetivo de centralizar e divulgar notícias, eventos, avisos e informações relevantes do Instituto Dom Pedro II de forma acessível, moderna e organizada.

---

## Objetivo do Projeto

Criar um ambiente digital onde:

- Estudantes, professores, pais e responsáveis possam acompanhar as atividades do colégio.
- O setor administrativo tenha uma interface segura e prática para publicar, editar e deletar conteúdos.

---

## História do Projeto

O projeto nasceu de uma necessidade real: o Instituto Dom Pedro II enfrentava dificuldades na comunicação de suas atividades. As informações eram fixadas em murais físicos ou postadas em redes sociais por professores, o que gerava desinformação.

A coordenadora pedagógica **Profa. Mariana Souza** sugeriu a criação de um portal institucional de notícias, transformando a ideia em uma oportunidade pedagógica. A proposta foi abraçada pelos alunos do curso técnico de **Desenvolvimento de Sistemas**, que desenvolveram a plataforma como parte de um **projeto integrador**.

---

## Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript, Next.js
- **Backend:** Node.js, Express, Cors, Path, Inputmask
- **Banco de Dados:** MySQL

---

## Funcionalidades

### Área Pública (Visitantes)

- Visualização de notícias, eventos e comunicados.
- Busca por palavra-chave ou categoria.

### Área Administrativa (Privada)

- Login com autenticação por tipo de usuário.
- Publicação, edição e exclusão de conteúdos.
- Gerenciamento de posts por ID.
- Recuperação de senha no próprio site (para e-mails institucionais).

---

## Como Executar o Projeto Localmente

### 1. No CMD (Windows)

**Acesse a pasta do backend:**
```bash
cd C:\Users\Windows\Downloads\IDP.news\trabalho
```

**Inicie o servidor Node:**

```bash
node --watch app.js
```

### 2. No MySQL

**Importe o banco de dados:**

Use o arquivo MER_Noticias.sql, localizado na pasta trabalho, para criar o banco de dados no MySQL.



### 3. No Terminal/Bash


**Clone o repositório:**

```bash
git clone https://github.com/mariaclarareginatoe/IDP.news.git
```


**Acesse a pasta do backend:**

```bash
cd IDP.news/src/app/backend
```


**Inicie o servidor do backend:**

```bash
node --watch server.js
```



**Volte à pasta app do projeto:**

```bash
cd ..
```


**Instale as dependências:**

```bash
npm install express cors path inputmask 
```



Inicie o servidor de desenvolvimento:

```bash
npm run dev
```


## Desenvolvido por:

Maria Clara Reginato

Richard Sousa Garcia

Vinicius Santana Moreira
