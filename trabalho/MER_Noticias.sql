CREATE DATABASE Site_noticias;

USE Site_noticias;

CREATE TABLE Noticias (
	id_noticias INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	titulo TEXT(65535) NOT NULL,
	descricao TEXT(65535) NOT NULL,
	data DATE NOT NULL,
	imagem BLOB,
	usuario INT NOT NULL,
	categoria VARCHAR(255) NOT NULL
);

CREATE TABLE Usuarios (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	senha INT NOT NULL,
	cargo VARCHAR(255) NOT NULL
);

CREATE TABLE Avisos (
id_Avisos INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
titulo VARCHAR(255) NOT NULL,
descricao TEXT NOT NULL,
data DATE NOT NULL
);

CREATE TABLE Eventos (
id_Eventos INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
titulo TEXT NOT NULL,
texto TEXT NOT NULL,
data_inicio DATETIME NOT NULL,
data_fim DATETIME NOT NULL,
local VARCHAR(255) NOT NULL,
imagem VARCHAR(255)
);

INSERT INTO Usuarios (nome, email, senha, cargo) 
VALUES
    ('Ana Silva', 'ana.silva@gestao.com', 784512, 'adm'),
    ('Carlos Oliveira', 'carlos.oliveira@gestao.com', 965823, 'adm'),

    ('Mariana Costa', 'mariana.costa@professor.com', 147258, 'professor'),
    ('Pedro Santos', 'pedro.santos@professor.com', 258369, 'professor'),
    ('Juliana Pereira', 'juliana.pereira@professor.com', 369147, 'professor'),
    ('Ricardo Almeida', 'ricardo.almeida@professor.com', 482573, 'professor'),
    ('Fernanda Lima', 'fernanda.lima@professor.com', 573684, 'professor'),
    ('Roberto Souza', 'roberto.souza@professor.com', 684795, 'professor'),
    ('Patricia Rocha', 'patricia.rocha@professor.com', 795816, 'professor'),
    ('Marcos Ferreira', 'marcos.ferreira@professor.com', 816927, 'professor'),
    ('Lucia Mendes', 'lucia.mendes@professor.com', 927138, 'professor'),
    ('Gustavo Barbosa', 'gustavo.barbosa@professor.com', 138249, 'professor'),

    ('João Gomes', 'joao.gomes@gremio.com', 451267, 'gremio'),
    ('Maria Ribeiro', 'maria.ribeiro@gremio.com', 562378, 'gremio'),
    ('Lucas Martins', 'lucas.martins@gremio.com', 673489, 'gremio'),
    ('Sofia Cardoso', 'sofia.cardoso@gremio.com', 784591, 'gremio'),
    ('Mateus Dias', 'mateus.dias@gremio.com', 895612, 'gremio'),
    ('Laura Teixeira', 'laura.teixeira@gremio.com', 916723, 'gremio'),
    ('Enzo Moreira', 'enzo.moreira@gremio.com', 127834, 'gremio'),
    ('Valentina Nunes', 'valentina.nunes@gremio.com', 238945, 'gremio'),
    ('Gabriel Castro', 'gabriel.castro@gremio.com', 349156, 'gremio'),
    ('Helena Carvalho', 'helena.carvalho@gremio.com', 451267, 'gremio'),

    ('Rafael Pinto', 'rafael.pinto@aluno.com', 567812, 'aluno'),
    ('Beatriz Ramos', 'beatriz.ramos@aluno.com', 678923, 'aluno'),
    ('Bruno Azevedo', 'bruno.azevedo@aluno.com', 789134, 'aluno'),
    ('Isabela Correia', 'isabela.correia@aluno.com', 891245, 'aluno'),
    ('Diego Gonçalves', 'diego.goncalves@aluno.com', 912356, 'aluno'),
    ('Larissa Lopes', 'larissa.lopes@aluno.com', 123467, 'aluno'),
    ('Thiago Monteiro', 'thiago.monteiro@aluno.com', 234578, 'aluno'),
    ('Yasmin Barros', 'yasmin.barros@aluno.com', 345689, 'aluno'),
    ('Eduardo Freitas', 'eduardo.freitas@aluno.com', 456791, 'aluno'),
    ('Clara Andrade', 'clara.andrade@aluno.com', 567812, 'aluno'),
    ('Felipe Vasconcelos', 'felipe.vasconcelos@aluno.com', 678923, 'aluno'),
    ('Marina Magalhães', 'marina.magalhaes@aluno.com', 789134, 'aluno'),
    ('Vinícius Peixoto', 'vinicius.peixoto@aluno.com', 891245, 'aluno'),
    ('Luiza Tavares', 'luiza.tavares@aluno.com', 912356, 'aluno'),
    ('Igor Fonseca', 'igor.fonseca@aluno.com', 123467, 'aluno'),
    ('Manuela Menezes', 'manuela.menezes@aluno.com', 234578, 'aluno'),
    ('Daniel Brito', 'daniel.brito@aluno.com', 345689, 'aluno'),
    ('Giovanna Leal', 'giovanna.leal@aluno.com', 456791, 'aluno'),
    ('Leonardo Cunha', 'leonardo.cunha@aluno.com', 567812, 'aluno'),
    ('Camila Rezende', 'camila.rezende@aluno.com', 678923, 'aluno'),
    ('André Silveira', 'andre.silveira@aluno.com', 789134, 'aluno'),
    ('Bruna Figueiredo', 'bruna.figueiredo@aluno.com', 891245, 'aluno'),
    ('Otávio Prado', 'otavio.prado@aluno.com', 912356, 'aluno'),
    ('Natalia Souza', 'natalia.souza@aluno.com', 123467, 'aluno'),
    ('Henrique Rocha', 'henrique.rocha@aluno.com', 234578, 'aluno'),
    ('Letícia Fernandes', 'leticia.fernandes@aluno.com', 345689, 'aluno'),
    ('Caio Almeida', 'caio.almeida@aluno.com', 456791, 'aluno'),
    ('Lorena Pires', 'lorena.pires@aluno.com', 567812, 'aluno'),
    ('Alexandre Cruz', 'alexandre.cruz@aluno.com', 678923, 'aluno'),
    ('Aline Santana', 'aline.santana@aluno.com', 789134, 'aluno'),
    ('Hugo Batista', 'hugo.batista@aluno.com', 891245, 'aluno'),
    ('Rafaela Dias', 'rafaela.dias@aluno.com', 912356, 'aluno'),
    ('Vitor Neves', 'vitor.neves@aluno.com', 123467, 'aluno'),
    ('Melissa Lopes', 'melissa.lopes@aluno.com', 234578, 'aluno'),
    ('Renan Queiroz', 'renan.queiroz@aluno.com', 345689, 'aluno'),
    ('Tatiane Moura', 'tatiane.moura@aluno.com', 456791, 'aluno');
        
INSERT INTO Noticias (titulo, descricao, data, imagem, usuario, categoria) VALUES
(
    'Instituto Dom Pedro II Celebra 50 Anos de História: Meio Século de Educação e Legado',
    'Em um evento emocionante e repleto de significado, o Instituto Dom Pedro II celebrou um marco memorável: seus 50 anos de fundação. A comemoração reuniu gerações de ex-alunos, professores que dedicaram suas vidas à instituição, funcionários, pais e diversas autoridades locais, em uma demonstração da força e do legado construídos ao longo de meio século. A cerimônia foi um misto de nostalgia e celebração, com homenagens emocionantes a personalidades que contribuíram de forma significativa para a trajetória da escola. Momentos musicais encantaram a todos, com apresentações que ressaltaram o talento dos alunos e o espírito festivo. Um dos pontos altos do evento foi a exposição de fotos históricas, que conduziu os presentes por uma viagem no tempo, mostrando a evolução da escola desde seus primeiros dias até os dias atuais. "Celebrar 50 anos é mais do que apenas um número; é celebrar meio século de dedicação à educação, de formação de cidadãos e de construção de um futuro melhor", discursou a diretora, emocionada. A celebração dos 50 anos não foi apenas um momento de recordar o passado glorioso, mas também de reafirmar o compromisso do Instituto Dom Pedro II com a excelência educacional e a formação de novas gerações, preparando-as para os desafios do mundo com os valores e o conhecimento que são a marca da instituição.',
    '2025-05-10',
    '/noticias.imgs/not1.png',
    1,
    'Educação'
),
(
    'Equipe do IDP Vence Torneio Regional de Futsal: Garra e Talento Levam o Time à Glória',
    'O Instituto Dom Pedro II está em festa com a gloriosa vitória de sua equipe masculina sub-17 de futsal! Em uma performance espetacular, o time do IDP demonstrou uma combinação impecável de garra, técnica e trabalho em equipe ao vencer o torneio regional, garantindo sua classificação para a tão esperada etapa estadual. A final foi um jogo emocionante, com momentos de tensão e jogadas de tirar o fôlego, onde os atletas do IDP superaram seus adversários com determinação e habilidade. A vitória é o resultado de meses de treinos intensos, disciplina e um espírito de equipe invejável, forjados sob a orientação do Professor e técnico, Carlos Eduardo. "Eles treinaram muito e se dedicaram de corpo e alma. Essa vitória é merecida e reflete todo o esforço e a união do grupo", celebrou o técnico. A conquista gerou um clima de euforia na escola, com os colegas de turma e a diretoria aplaudindo o feito dos atletas. Além de elevar o nome do Instituto no cenário esportivo regional, essa vitória serve como um poderoso incentivo para todos os alunos, mostrando que a perseverança e o trabalho em equipe podem levar a grandes triunfos. A expectativa agora é pela etapa estadual, onde o time do IDP buscará mais um título para a escola.',
    '2025-05-12',
    '/noticias.imgs/not2.png',
    2,
    'Esporte'
),
(
    'Feira de Ciências do IDP atrai visitantes e premia ideias inovadoras',
    'A tradicional Feira de Ciências do Instituto Dom Pedro II superou todas as expectativas em 2025, registrando um recorde de público e apresentando uma impressionante variedade de projetos inovadores que demonstraram o potencial criativo e científico dos alunos. O ginásio da escola se transformou em um verdadeiro laboratório de ideias, onde estudantes de todas as séries exibiram suas pesquisas, protótipos e invenções. Entre os destaques, chamaram a atenção uma maquete detalhada de uma cidade inteligente, equipada com soluções para mobilidade urbana, energia sustentável e gestão de resíduos, e um engenhoso sistema de captação e reutilização de água da chuva, desenvolvido para otimizar o uso de recursos hídricos. A feira não apenas atraiu a atenção de pais, professores e membros da comunidade, mas também serviu como um palco para o reconhecimento do talento estudantil. Os projetos foram avaliados por uma banca de especialistas, que premiou as ideias mais criativas, com maior potencial de impacto e com o melhor embasamento científico. "É inspirador ver a paixão e a inteligência dos nossos alunos. Eles não apenas aprendem ciência, mas a aplicam para criar soluções para o mundo real", comentou a coordenadora da feira, Professora Juliana Costa. A Feira de Ciências do IDP reafirma seu papel como um evento crucial para o desenvolvimento do pensamento crítico, da pesquisa e da inovação entre os jovens cientistas da escola.',
    '2025-05-15',
    '/noticias.imgs/not3.png',
    3,
    'Educação'
),
(
    'Alunos desenvolvem aplicativo para organizar rotina escolar',
    'Pensando em otimizar a vida acadêmica de seus colegas, um grupo de estudantes do Instituto Dom Pedro II, com o apoio e a orientação dos professores de tecnologia, deu vida a uma ideia inovadora: um aplicativo para organizar a rotina escolar. Lançado experimentalmente para algumas turmas do Ensino Médio, o app é uma ferramenta completa que promete revolucionar a forma como os alunos gerenciam seus compromissos. Com ele, é possível planejar horários de aulas, agendar provas, cadastrar e acompanhar prazos de tarefas e projetos, e receber lembretes importantes para nunca perder um compromisso. A iniciativa surgiu da percepção dos próprios alunos sobre a necessidade de uma ferramenta centralizada para auxiliar na organização em meio à rotina intensa de estudos. "Queríamos algo que realmente nos ajudasse a controlar tudo, desde a próxima prova até o prazo de entrega de um trabalho. O app foi a nossa solução", explicou um dos desenvolvedores, Miguel Santos. O desenvolvimento do aplicativo não apenas demonstrou o talento dos alunos em programação e design, mas também o compromisso do IDP em fomentar a criatividade, a resolução de problemas práticos e o uso da tecnologia como aliada do aprendizado. O sucesso inicial do app já indica que ele será uma ferramenta valiosa para toda a comunidade estudantil, tornando o dia a dia na escola mais organizado e produtivo.',
    '2025-04-30',
    '/noticias.imgs/not4.png',
    4,
    'Tecnologia'
),
(
    'IDP Conquista 1º Lugar em Olimpíada de Matemática Estadual: Uma Celebração da Excelência Acadêmica',
    'A comunidade do Instituto Dom Pedro II está em êxtase com a notícia de que seus talentosos estudantes do 9º ano conquistaram o primeiro lugar na fase final da Olimpíada de Matemática Estadual. Este feito notável coloca o IDP no topo de uma competição que reuniu mais de 150 escolas públicas e privadas de todo o estado, um verdadeiro testemunho da excelência acadêmica e do empenho de seus alunos. A vitória não foi por acaso; é o resultado de meses de dedicação intensiva, com os alunos participando de aulas extras, simulados e sessões de estudo aprofundado sob a orientação incansável dos professores de matemática. O coordenador pedagógico do Ensino Fundamental II, Professor Ricardo Almeida, expressou seu orgulho: "Nossos alunos demonstraram não apenas um domínio excepcional da matemática, mas também uma capacidade de raciocínio lógico e resiliência admiráveis. Esta conquista é a prova de que, com trabalho duro e o apoio de uma equipe pedagógica dedicada, não há limites para o que podemos alcançar." A vitória foi celebrada com aplausos e reconhecimento durante a assembleia escolar da semana seguinte, onde os estudantes foram homenageados e incentivados a continuar explorando seu potencial. Este resultado não só eleva o prestígio do Instituto, mas também inspira os alunos mais jovens a se dedicarem aos estudos e a perseguirem seus próprios sonhos acadêmicos.',
    '2025-04-27',
    '/noticias.imgs/not5.png',
    5,
    'Educação'
),
(
    'Grêmio Estudantil promove Semana Cultural com oficinas e talentos',
    'Os corredores do Instituto Dom Pedro II vibraram com uma energia contagiante durante a Semana Cultural, um evento cuidadosamente planejado e executado pelo atuante Grêmio Estudantil. De 10 a 14 de março, a escola se transformou em um verdadeiro caldeirão de criatividade e debate, com uma programação diversificada que celebrou a arte, a expressão e o pensamento crítico. As apresentações artísticas incluíram desde números musicais emocionantes e coreografias de dança envolventes até peças teatrais que abordaram temas relevantes para a juventude.\n\nAlém das performances, a Semana Cultural ofereceu uma série de oficinas criativas, permitindo que os alunos explorassem talentos em pintura, escrita, artesanato e outras expressões artísticas. O ponto alto do evento foram os debates enriquecedores com convidados especiais, que discutiram temas cruciais como juventude, arte e cidadania. Esses painéis estimularam a reflexão, o diálogo e a formação de opiniões críticas entre os estudantes. "A Semana Cultural é um espaço essencial para que os alunos se expressem, descubram novos talentos e, acima de tudo, pensem sobre o mundo ao seu redor", afirmou a presidente do Grêmio Estudantil, Sofia Mendes. O sucesso do evento reafirmou a importância de iniciativas que promovam não apenas o conhecimento acadêmico, mas também a formação cultural e cidadã dos jovens.',
    '2025-05-15',
    '/noticias.imgs/not6.png',
    6,
    'Educação'
),
(
    'Novo laboratório de ciências é inaugurado com tecnologia de ponta',
    'Em um movimento estratégico para impulsionar a educação prática e imersiva, o Instituto Dom Pedro II inaugurou seu novo e moderno laboratório multidisciplinar de ciências. Este espaço de vanguarda está equipado com tecnologia de ponta para as disciplinas de química, física e biologia, oferecendo aos alunos uma experiência de aprendizado verdadeiramente transformadora. Na cerimônia de inauguração, a diretora do IDP, Dra. Ana Clara Guedes, destacou a importância do investimento: "Este laboratório é um testemunho do nosso compromisso em proporcionar uma educação de excelência, que não apenas transmite conhecimento, mas também incentiva a curiosidade, a experimentação e o pensamento crítico. Nossos alunos agora terão acesso a recursos que os prepararão para os desafios científicos e tecnológicos do futuro. O novo ambiente conta com microscópios de última geração, bancadas de laboratório ergonômicas, sistemas de segurança avançados e uma vasta gama de equipamentos para experimentos complexos, desde análises químicas detalhadas até dissecções biológicas e estudos de circuitos elétricos. Professores e alunos expressaram entusiasmo com as novas possibilidades. "Com esses equipamentos, podemos ir muito além da teoria. As aulas práticas se tornarão mais dinâmicas e os alunos poderão realmente ver e tocar a ciência", comentou a professora de Biologia, Laura Santos. A expectativa é que o laboratório estimule o interesse dos alunos por carreiras nas áreas STEM (Ciência, Tecnologia, Engenharia e Matemática), fomentando a próxima geração de inovadores e pesquisadores.',
    '2025-05-25',
    '/noticias.imgs/not7.png',
    7,
    'Tecnologia'
),
(
    'Ex-aluno do IDP se forma em Medicina e retorna para palestra motivacional',
    'Um ar de admiração e inspiração preencheu o auditório do Instituto Dom Pedro II com o retorno de João Pedro Martins, um ex-aluno que se tornou um exemplo de dedicação e sucesso. Após anos de uma jornada acadêmica desafiadora, João Pedro concluiu sua graduação em Medicina e fez questão de voltar à sua antiga escola para compartilhar sua trajetória inspiradora em uma palestra motivacional. Diante de uma plateia atenta de estudantes, ele narrou os desafios enfrentados durante o vestibular e a faculdade, as horas de estudo, as renúncias e as pequenas vitórias que o levaram a realizar seu sonho. "Lembro-me das aulas aqui no IDP, dos professores que me incentivaram e dos amigos que fiz. Foi a base que recebi aqui que me deu a força para não desistir", disse João Pedro, emocionado. Sua história de perseverança, que incluiu momentos de dúvida e superação, ressoou profundamente com os jovens, que fizeram diversas perguntas sobre a vida universitária e a carreira médica. A palestra de João Pedro não foi apenas um relato de sucesso, mas um poderoso lembrete de que a dedicação e a resiliência são fundamentais para alcançar grandes objetivos. Sua visita reforçou o laço entre o Instituto e seus ex-alunos, mostrando que a jornada educacional do IDP se estende muito além dos portões da escola.',
    '2025-05-22',
    '/noticias.imgs/not8.png',
    8,
    'Educação'
),
(
    'Projeto "IDP Sustentável" reduz uso de plástico em 80% no refeitório',
    'O Instituto Dom Pedro II está se destacando como um modelo de consciência ambiental graças à notável iniciativa dos alunos do 2º ano do Ensino Médio. O projeto "IDP Sustentável" conseguiu uma impressionante redução de 80% no uso de plástico descartável no refeitório da escola, demonstrando o poder da ação estudantil para promover mudanças significativas. A ideia nasceu da preocupação dos próprios alunos com o volume de lixo gerado diariamente. Após pesquisas e discussões, eles propuseram a substituição de copos, talheres e pratos descartáveis por opções reutilizáveis e mais sustentáveis.\n\nA implementação do projeto envolveu não apenas a aquisição de novos materiais, mas também uma intensa campanha de conscientização que engajou toda a comunidade escolar. Cartazes informativos, palestras e vídeos produzidos pelos próprios alunos destacaram os impactos negativos do plástico no meio ambiente e a importância de adotar hábitos mais ecológicos. "Percebemos que pequenas atitudes podem gerar um impacto gigantesco. É gratificante ver que nossa ideia está fazendo a diferença\", disse um dos alunos idealizadores do projeto, Lucas Pereira. A iniciativa do "IDP Sustentável" não só contribui para a preservação do meio ambiente, mas também educa os estudantes sobre a responsabilidade individual e coletiva na construção de um futuro mais verde.',
    '2025-05-15',
    '/noticias.imgs/not9.png',
    9,
    'Sustentabilidade'
),
(
    'Parceria com universidade garante curso gratuito de programação',
    'Uma porta valiosa para o futuro digital foi aberta para os alunos do Ensino Médio do Instituto Dom Pedro II! Graças a uma inovadora parceria com a renomada Universidade Federal, os estudantes terão acesso a um curso gratuito e exclusivo de programação e lógica computacional. Essa colaboração estratégica visa capacitar os jovens em uma das áreas mais dinâmicas e promissoras do mercado de trabalho, preparando-os para as exigências do século XXI. As aulas serão ministradas por professores universitários experientes e acontecerão nas instalações do próprio IDP, facilitando o acesso e a integração dos alunos.\n\nO curso abordará desde os fundamentos da lógica de programação até a criação de algoritmos e a introdução a diferentes linguagens. "É uma oportunidade incrível para nossos alunos. O conhecimento em programação é cada vez mais essencial, independentemente da área que eles escolham seguir", afirmou a coordenadora do Ensino Médio, Professora Helena Castro. A expectativa é que o curso não apenas desenvolva novas habilidades nos alunos, mas também inspire alguns a seguir carreiras em tecnologia e inovação. Essa parceria reforça o compromisso do IDP em oferecer uma educação de ponta, conectada às demandas do mundo contemporâneo e que prepare seus alunos para um futuro de sucesso.',
    '2025-05-15',
    '/noticias.imgs/not10.png',
    10,
    'Economia'
);

        
SELECT nome, email
FROM Usuarios
WHERE cargo = 'aluno';

SELECT nome, email
FROM Usuarios
WHERE cargo = 'gremio';

SELECT nome, email
FROM Usuarios
WHERE cargo = 'professor';

SELECT nome, email
FROM Usuarios
WHERE cargo = 'adm';

SELECT DATE_FORMAT(data, '%d/%m/%Y') AS data
FROM Noticias;

ALTER TABLE Noticias MODIFY COLUMN imagem VARCHAR(255);

UPDATE Noticias SET imagem = '/noticias.imgs/not1.png' WHERE id_noticias = 1;
UPDATE Noticias SET imagem = '/noticias.imgs/not2.png' WHERE id_noticias = 2;
UPDATE Noticias SET imagem = '/noticias.imgs/not3.png' WHERE id_noticias = 3;
UPDATE Noticias SET imagem = '/noticias.imgs/not4.png' WHERE id_noticias = 4;
UPDATE Noticias SET imagem = '/noticias.imgs/not5.png' WHERE id_noticias = 5;
UPDATE Noticias SET imagem = '/noticias.imgs/not6.jpg' WHERE id_noticias = 6;
UPDATE Noticias SET imagem = '/noticias.imgs/not7.jpg' WHERE id_noticias = 7;
UPDATE Noticias SET imagem = '/noticias.imgs/not8.png' WHERE id_noticias = 8;
UPDATE Noticias SET imagem = '/noticias.imgs/not9.png' WHERE id_noticias = 9;
UPDATE Noticias SET imagem = '/noticias.imgs/not10.png' WHERE id_noticias = 10;

