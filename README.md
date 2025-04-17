# Projeto Pessoal - Open Source

Este projeto foi idealizado com o objetivo de criar um software que auxilie em tarefas simples do dia a dia, permitindo a extração de informações relevantes de forma prática e eficiente. Inicialmente concebido como um projeto pessoal para aprofundar conhecimentos adquiridos em minhas graduações, o projeto agora está sendo aberto à comunidade para colaboração e melhorias.

O foco principal é entregar um MVP (Produto Mínimo Viável) funcional, com funcionalidades desenvolvidas conforme a demanda e disponibilidade de tempo.

---

## Sumário

1. [Introdução](#introdução)  
2. [Tech Stack](#tech-stack)  
3. [Estrutura do Projeto](#estrutura-do-projeto)  
4. [Funcionalidades](#funcionalidades)  
5. [Colaboração](#colaboração)  

---

## Introdução

Este é um projeto focado na criação de um software que atenda a necessidades básicas e diárias de forma simples e eficiente. O objetivo é criar um sistema **open source**, começando com um MVP utilizando tecnologias ágeis e acessíveis, como:

- **PHP**
- **SQL**
- **HTML**
- **CSS**
- **JavaScript**

O projeto utiliza os templates **Bootstrap 5** e **Sneat** (ThemeSelection) para acelerar o desenvolvimento e garantir uma interface moderna e responsiva.

---

## Tech Stack

A princípio, o projeto será desenvolvido com tecnologias simples para garantir agilidade e entrega de uma versão estável:

- **Backend**: PHP  
- **Frontend**: HTML, CSS, JavaScript  
- **Banco de Dados**: SQL  
- **Frameworks e Templates**: Bootstrap 5, Sneat  

---

## Estrutura do Projeto

A organização do projeto segue uma estrutura modular e clara, conforme descrito abaixo:

```
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
```

---

## Funcionalidades

O software tem como objetivo gerenciar aspectos da vida do usuário, atendendo a diferentes perfis:

- **Usuários que preferem interação mínima**: Inserção automática de informações.  
- **Usuários que desejam controle total**: Gerenciamento detalhado de dados.  

### MVP (Produto Mínimo Viável)

A primeira versão do sistema será focada no **controle financeiro**, com suporte para:

- Gerenciamento individual, para casais ou grupos.  
- Modelagem inicial para controle de receitas e despesas.  

### Futuro

O projeto será expandido para incluir outras funcionalidades simples e úteis, conforme a demanda da comunidade.

---

## Colaboração

Este projeto **open source** está aberto à comunidade. Sugestões e melhorias são bem-vindas e podem ser enviadas por meio de forks e pull requests.

### Recursos Adicionais

- **Modelagem do Projeto**: [Visily](https://app.visily.ai/projects/d0750b85-8c16-4849-a61b-23345f0dfde4/boards/537566)  
- **Documentação Acadêmica**: [LinkedIn](https://www.linkedin.com/in/h%C3%A1llan/details/education/1744922039125/single-media-viewer/?profileId=ACoAAB9Dx2UBAeRaFd6lxkWWlG3AdxiVIkNdWZ0)  

---

Contribua para tornar este projeto uma ferramenta útil para todos!