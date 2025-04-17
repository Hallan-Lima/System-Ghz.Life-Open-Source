1. Estrutura de Diretórios
Organize seu projeto de forma clara e modular. Aqui está uma estrutura recomendada:

Projeto/
├── theme/                 # Arquivos do template utilizado
├── public/                # Arquivos acessíveis publicamente (ponto de entrada)
│   ├── index.php          # Arquivo principal (ponto de entrada)
│   ├── assets/            # Arquivos estáticos
│   │   ├── css/           # Estilos CSS
│   │   ├── js/            # Scripts JavaScript
│   │   └── img/           # Imagens
│   └── .htaccess          # Configuração do servidor (URLs amigáveis, etc.)
├── src/                   # Código-fonte do projeto
│   ├── Controllers/       # Controladores (lógica de negócio)
│   ├── Models/            # Modelos (interação com o banco de dados)
│   ├── Views/             # Arquivos HTML/PHP (templates)
│   │   ├── layouts/       # Layouts principais (header, footer, etc.)
│   │   └── pages/         # Páginas específicas
│   └── Helpers/           # Funções auxiliares ou utilitárias
├── config/                # Configurações do projeto
│   ├── database.php       # Configuração do banco de dados
│   └── app.php            # Configurações gerais
├── vendor/                # Dependências instaladas via Composer
├── tests/                 # Testes automatizados
├── .env                   # Variáveis de ambiente (credenciais, etc.)
├── composer.json          # Gerenciador de dependências PHP
└── README.md              # Documentação do projeto