Projeto da Disciplica de Programação Web BackEnd
-------------------------------------------------
Sistema de gerenciamento de uma garagem
-------------------------------------------------

Nosso projeto tem como objetivo gerenciar uma garagem,
permitindo realizar as ações básicas como cadastro de 
usuário e sua autentificação, carros e também permitindo a alteração do mesmo
e a opção de delete.

As tecnologias utilizadas são o JavaScript, MongoDB, Node, Express.

Rode o comando npm install para instalar dependencias.
Rode o comando npm start para roda o back-end.
Mande uma requisicao para a rota /install para instalar o banco e popular tabelas, configure o endereco do banco no arquivo .env.
Faca login pela rota /api/login informando um usuario admin ou usuario comum que sao registrados no banco pela rota /install.
Todas as rotas de manipulacao de usuario sao protegidas pelo middleware de verificacao de admin.
Todas as outras rotas precisam de um usuario logado ou um admin logado.
Use a rota /docs para acessar a documentacao do swagger.

Jose Carlos Ferrari
Lucas Rafael Rodrigues do Nascimento
