import investfastInicio from '../assets/projects/investfast-inicio.webp'
import investfastInvestimentos from '../assets/projects/investfast-investimentos.webp'
import investfastMundo from '../assets/projects/investfast-mundo.webp'
import investfastProjecoes from '../assets/projects/investfast-projecoes.webp'
import eloLanding from '../assets/projects/elo-landing.webp'
import eloPagina from '../assets/projects/elo-pagina.webp'
import eloPainel from '../assets/projects/elo-painel.webp'
import balcazarAgenda from '../assets/projects/balcazar-agenda.webp'
import balcazarLogin from '../assets/projects/balcazar-login.webp'
import balcazarTipos from '../assets/projects/balcazar-tipos.webp'

const balcazarImages = [balcazarAgenda, balcazarLogin, balcazarTipos]
const eloImages = [eloLanding, eloPagina, eloPainel]
const investFastImages = [investfastInicio, investfastMundo, investfastInvestimentos, investfastProjecoes]

export type Project = {
  name: string
  description: string
  images: string[]
}

export const data: { pt: Project[]; en: Project[] } = {
  pt: [
    {
      name: 'Elo | Plataforma de link na bio',
      description: `O Elo é um produto meu, que projetei, desenvolvi e mantenho do começo ao fim. É uma plataforma de link na bio: cada pessoa monta uma página pública com a sua identidade, reunindo redes sociais, projetos, produtos e contatos em cards, com 14 temas para escolher. No painel, ela acompanha visitas, cliques e contatos recebidos, edita a página e gerencia uma agenda de atendimentos. O Elo também tem um servidor MCP, que permite a assistentes de IA buscar páginas, consultar a agenda e criar agendamentos. A API é em Go, o front-end em React, e a plataforma roda com MongoDB, Meilisearch e armazenamento de arquivos próprio.`,
      images: eloImages,
    },
    {
      name: 'Invest Fast | Finanças pessoais com cara de jogo',
      description: `O Invest Fast é outro produto meu, construído do zero. É um app de controle de gastos e investimentos (renda fixa e renda variável) com interface de RPG: a pessoa vira um personagem que ganha XP, sobe de nível e cumpre missões ao registrar o dia a dia, investir e fechar o mês no azul. Cada carteira tem orçamento por categoria, metas, indicadores do mês e projeções de 1, 5 e 10 anos com cotações reais, e os investimentos viram ilhas de um mundo em 3D. Por ser um app financeiro, a segurança vem primeiro: todos os dados são cifrados com AES-256-GCM, com uma chave própria por usuário guardada num serviço separado, e o banco só armazena informação cifrada. O back-end é em Go, com arquitetura DDD e testes, e o front-end em React.`,
      images: investFastImages,
    },
    {
      name: 'Balcazar | Plataforma de estudos de idiomas',
      description: `A Balcazar é a plataforma de estudos de uma escola de inglês e espanhol, criada para centralizar a rotina de alunos, professores e administração em um só lugar. A agenda tem visões de dia, semana e mês, com tipos de compromisso configuráveis por cor (aulas de cada idioma, reposições, reuniões e horários bloqueados). A plataforma reúne ainda recursos e livros, mensagens, informativos e notificações com busca global. Na área de pagamentos, a escola acompanha quais alunos estão em dia e gera cobranças, e cada novo cadastro passa pela aprovação de um administrador, mantendo o controle de acesso nas mãos da escola.`,
      images: balcazarImages,
    },
    {
      name: 'WeMapp | Inteligência de Carreiras',
      description: `O WeMapp | Inteligência de Carreiras utiliza Next.js e Material UI para fornecer aos profissionais informações detalhadas sobre carreiras, incluindo descrições de cargos, requisitos educacionais, salários e perspectivas de emprego. Além de um banco de dados de carreiras abrangente, o site oferece um blog com artigos úteis sobre temas como elaboração de currículos e negociação salarial. Com uma interface responsiva e atraente, é uma ferramenta indispensável para quem busca orientação ou transição de carreira.`,
      images: ['https://media.graphassets.com/8kfpzy8LRVehP54m7YLt'],
    },
    {
      name: 'Bombarco: O mercado náutico mais completo do Brasil',
      description: `O Bombarco é um site de venda de embarcações que utiliza Next.js e Nest.js para proporcionar uma experiência completa e eficiente aos usuários. Com funcionalidades avançadas de pesquisa e filtragem, além de uma plataforma robusta de anúncios e suporte ao cliente 24/7, o site facilita tanto a compra quanto a venda de embarcações. As tecnologias empregadas garantem que o Bombarco seja rápido, seguro e responsivo, proporcionando uma experiência de usuário de alta qualidade.`,
      images: ['https://media.graphassets.com/dk1uUDQaQXGA50bWx2r8'],
    },
    {
      name: 'Playdate',
      description: `O Playdate é um aplicativo de relacionamento para pais solteiros desenvolvido em React Native por uma equipe brasileira. Oferece recursos como filtros de pesquisa, perfis detalhados, mensagens privadas e eventos/grupos para conectar pais solteiros. Seguro e privado, o aplicativo facilita a busca por parceiros compatíveis, sendo gratuito para download e uso em dispositivos iOS e Android.`,
      images: ['https://media.graphassets.com/J706U9dvQrqXVqvCZsds'],
    },
    {
      name: 'Sigmais Payload Converter',
      description: `O Sigmais Payload Converter é uma ferramenta essencial para desenvolvedores de IoT que necessitam converter payloads entre formatos como JSON, CBOR e MessagePack. Além de permitir visualização e edição de payloads, o conversor é intuitivo, suporta diversos formatos e é completamente gratuito para uso, facilitando o trabalho com dados de IoT de maneira eficiente e acessível.`,
      images: ['https://media.graphassets.com/Qe9UqECRnCuUIVCwCYHQ'],
    },
    {
      name: 'Brand Monitor | Monitoramento de Marca',
      description: `Brand Monitor é seu parceiro vigilante, oferecendo vigilância 24 horas por dia de sua marca em todas as plataformas digitais. Nossos serviços garantem que seus investimentos em marketing produzam retornos máximos, combatendo ativamente práticas inadequadas. Dedicamo-nos a eliminar a concorrência desleal, violações de marca e atividades fraudulentas, salvaguardando a integridade da sua marca e aumentando a sua presença no cenário digital.`,
      images: ['https://res.cloudinary.com/dbrbzam8h/image/upload/v1723056385/bpwyvz4mygj4mnedocec.png'],
    },
    {
      name: 'Rasplec Digital',
      description: `O projeto "Rasplec Digital" foi uma solução inovadora que envolveu o desenvolvimento completo de backend e frontend para criar uma plataforma de raspadinha digital. O sistema integrou automação de pagamentos via Pix, permitindo envio e recebimento de forma rápida e segura. Além disso, foi implementado um dashboard administrativo que possibilitava a validação e o monitoramento em tempo real das transações financeiras, com métricas detalhadas para análise de desempenho. A combinação dessas funcionalidades resultou em uma experiência eficiente e intuitiva para os usuários e gestores da plataforma.`,
      images: ['https://res.cloudinary.com/dfjqajcwp/image/upload/v1732548483/vuliwqhb9ylwvwtvwqtn.png'],
    },
  ],
  en: [
    {
      name: 'Elo | Link-in-bio platform',
      description: `Elo is my own product, which I designed, built and maintain end to end. It's a link-in-bio platform: each person builds a public page with their own identity, bringing social networks, projects, products and contacts together in cards, with 14 themes to choose from. In the dashboard, they track visits, clicks and contacts received, edit the page and manage an appointment calendar. Elo also has an MCP server that lets AI assistants search pages, check the calendar and create bookings. The API is written in Go, the frontend in React, and the platform runs on MongoDB, Meilisearch and its own file storage.`,
      images: eloImages,
    },
    {
      name: 'Invest Fast | Personal finance as a game',
      description: `Invest Fast is another product of mine, built from scratch. It's a spending and investment tracker (fixed and variable income) with an RPG interface: the user becomes a character who earns XP, levels up and completes quests by logging day-to-day spending, investing and ending the month in the black. Each wallet has per-category budgets, goals, monthly indicators and 1, 5 and 10-year projections with real market quotes, and investments become islands in a 3D world. Since it's a finance app, security comes first: all data is encrypted with AES-256-GCM, with a per-user key kept in a separate service, and the database only stores encrypted information. The backend is written in Go, with a DDD architecture and tests, and the frontend in React.`,
      images: investFastImages,
    },
    {
      name: 'Balcazar | Language learning platform',
      description: `Balcazar is the study platform of an English and Spanish school, built to bring the daily routine of students, teachers and staff into one place. The schedule offers day, week and month views, with color-coded appointment types the school can configure (classes for each language, make-up lessons, meetings and blocked time). The platform also includes resources and books, messages, announcements and notifications with global search. In the payments area, the school tracks which students are up to date and issues charges, and every new sign-up goes through an administrator's approval, keeping access control in the school's hands.`,
      images: balcazarImages,
    },
    {
      name: 'WeMapp | Career Intelligence',
      description: `WeMapp | Career Intelligence uses Next.js and Material UI to provide professionals with detailed information about careers, including job descriptions, educational requirements, salaries and job prospects. In addition to a comprehensive careers database, the site offers a blog with useful articles on topics such as CV writing and salary negotiation. With a responsive and attractive interface, it is an indispensable tool for those seeking career guidance or transition.`,
      images: ['https://media.graphassets.com/8kfpzy8LRVehP54m7YLt'],
    },
    {
      name: 'Bombarco: The most complete nautical market in Brazil',
      description: `Bombarco is a boat sales website that uses Next.js and Nest.js to provide a complete and efficient user experience. With advanced search and filtering features, as well as a robust advertising platform and 24/7 customer support, the site makes it easy to buy and sell boats. The technologies employed ensure that Bombarco is fast, secure and responsive, providing a high-quality user experience.`,
      images: ['https://media.graphassets.com/dk1uUDQaQXGA50bWx2r8'],
    },
    {
      name: 'Playdate',
      description: `Playdate is a dating app for single parents developed in React Native by a Brazilian team. It offers features such as search filters, detailed profiles, private messages and events/groups to connect single parents. Secure and private, the app makes it easy to find compatible partners and is free to download and use on iOS and Android devices`,
      images: ['https://media.graphassets.com/J706U9dvQrqXVqvCZsds'],
    },
    {
      name: 'Sigmais Payload Converter',
      description: `Sigmais Payload Converter is an essential tool for IoT developers who need to convert payloads between formats such as JSON, CBOR and MessagePack. As well as allowing you to view and edit payloads, the converter is intuitive, supports various formats and is completely free to use, making it easy to work with IoT data in an efficient and accessible way.`,
      images: ['https://media.graphassets.com/Qe9UqECRnCuUIVCwCYHQ'],
    },
    {
      name: 'Brand Monitor | Brand Monitoring',
      description: `Brand Monitor is your vigilant partner, offering round-the-clock surveillance of your brand across all digital platforms. Our services ensure that your marketing investments yield maximum returns by actively combating improper practices. We are dedicated to eliminating unfair competition, brand violations, and fraudulent activities, safeguarding your brand's integrity and enhancing its presence in the digital landscape.`,
      images: ['https://res.cloudinary.com/dbrbzam8h/image/upload/v1723056385/bpwyvz4mygj4mnedocec.png'],
    },
    {
      name: 'Rasplec Digital',
      description: `The "Rasplec Digital" project was an innovative solution that involved the complete development of the backend and frontend to create a digital scratch card platform. The system integrated payment automation via Pix, allowing payments to be sent and received quickly and securely. In addition, an administrative dashboard was implemented to enable real-time validation and monitoring of financial transactions, with detailed metrics for performance analysis. The combination of these features resulted in an efficient and intuitive experience for the platform's users and managers.`,
      images: ['https://res.cloudinary.com/dfjqajcwp/image/upload/v1732548483/vuliwqhb9ylwvwtvwqtn.png'],
    },
  ],
}
