# blog

Projeto de interface de Blog consumindo API

### Running with Doocker

*É necessario estar via terminal dentro da pasta do projeto.*

Rodar o comando para montar a imagem do docker.

(Caso ocorram problemas, tentar rodar os camando no docker como super usuário o comando)

```
docker build -t blog-ui .
```

A imagem criada apartir do comando se chama blog-ui

caso deseje ver as imagens criadas, rodar o comando

```
docker images
```

para visualizar o nome das imagens criadas.

para rodar o container, rodar com o comando abaixo:

```
docker docker run -p 4000:4000 blog-ui
```
e acessar via navegador a url:

http://localhost:4000


### Running local

*É necessario estar via terminal dentro da pasta do projeto, e ter instalado o NodeJS e o NPM*

rodar o comando:

```
npm install
```

para instalar as dependencias do projeto, logo após a instalação for concluída

é só rodar o servidor e acessar o navegador na pagina http://localhost:8080

comando para rodar o servidor:

```
npm run serve
```

### Runing unit tests

*É necessario estar via terminal dentro da pasta do projeto*

rodar o comando:

```
npm run test:unit
```

### Runing Compiled for Production local

*É necessario estar via terminal dentro da pasta do projeto*

Rodar o comando para buildar o projeto:

```
npm run build
```

e rodar o comando

```
node server.js
```

e acessar o navegado na pagina http://localhost:4000

