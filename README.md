# datastone-challenge

Repositório para o datastone-challenge, usado no processo seletivo de 2024

## Como iniciar o projeto

### Com docker
Se você ja tem instaldo o docker na sua máquina, é so questão de rodar 

```sh
docker-compose up
```

Dependendo da configuração de sua shell, ou ainda do docker, talvez precise buildar antes a image, neste caso execute antes:

```sh
docker-compose build
```

Esse comando tambem precisa ser executado toda vez que alterar algo dentro da base código, para executar o servidor.

### Sem docker

Nesse caso, você usar qualquer *package manager* de Node que achar melhor, o projeto foi feito com `pnpm`, assim idealmente você pode usálo para ser mais rapido processo de instalção das dependências.

```sh
pnpm install
pnpm build
pnpm preview
```

Você pode substituir `pnpm` por `yarn` ou `npm`, ou qualquer outro *package manager* que preferir.
## Testando o app 

Quando a imagem estiver rodando em seu docker/máquina, você poderá acessar através do endereço `http://localhost:3000`. 

Existem duas rotas no app: `/` e `/produtos`, que lidam, respectivamente, da lista de usuários, e da lista de produtos. 

A lista usuários, permite criar usuários, e tem até um botão para auxiliar a criar vários usuários gerando valores aleatórios. Não é obrigatório documento e telefone. Também é possivel já adicionar produtos do usuário diretamente na caixa de edição de usuário.

Ainda na lista de usuários é possivel ver cada usuário, e algumas informações, edita-lo, deleta-lo, e editar diratamente suas relações com os produtos.

Agora, na lista de Produtos, é possivel criar um produto, e novamente, um botão no topo da tela de criação de produto, permite gerar produtos rapidamente para testagem.

## Tecnologias usas
Gerenciamento e persistência de dados - pinia, vueuse
Base para componentes anatômicos - radix-vue
Validação de dados - Zod, validatorjs, cpf-cnpj-validator
Controle de inputs e forms - vee-validate
Estilos - tailwind, postcess
Utilitários - lodash, fakejs

## Nota Técnica de Estrutura de Dados
Como a descrição estava solta, é dada liberdade de construir como desejar o banco, decidi usar o email do usuário como chave primária, e o nome do produto como chave primária do produto.

Essa solução não é convencional, nem recomendada, no entando, permite uma rapida clonagem de entidades pelo front-end. A problematica so existe quando precisamos alterar o email de algum usuário, isso iria criar uma nova entidade, e manteria a antiga. Por isso, é necessário excluir a entidade do email antigo ao altera-lo.

O mesmo segue para a ideia da chave primária de produto. Ao criá-lo, e associa-lo a usuários, cria-se uma relação com o nome. Ao alterar o nome de um produto, você estará criando um novo. É necessário reassociar cada usuário posteriormente aos usuários.

### Trabalhos futuros de Estrutura
Acrescentaria um gerdor de `uuid`, ao criar cada entidade, assim ficaria associada a edição ao uma unica entrada no banco.

## Nota Técnica sobre os visuais.
O meu foco no projeto era ter uma aplicação minimamente apresentável, por este motivo não houve um enfoque em efeitos de animação nem em tornar muitos detalhes elegantes.

A idéia centrou-se ao redor de uma cor (`#195f94`) e duas outras paletas de apoio, uma cinz e uma vermlho, essas cores são o suficiente para criar áreas contrastes e conceitos necessários para intuição de partes de aplicação.

## Nota Técnica sobre organização de CSS
O App faz uso de tailwind, uma bibliotea bem popular de css, que permite diretamente o uso de classes com propriedades relevantes para construir visuais de forma bem rápida. Busquei seguir o padrão de "enxugar" o html toda vez que ele crescia de mais com classes e variações.

Também, busquei criar escopos para as classes, assim elas não "sangrariam" seus estilos através do app. 
### Trabalhos futuros no CSS
Outras bibliotecas podem permitir mais opções de organização. A prorpria troca de CSS puro para o uso de SCSS ajudaria muito no processo de tornar os estilos mais organizados e concisos.

