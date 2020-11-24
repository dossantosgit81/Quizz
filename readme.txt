Tudo começa na no arquivo principal que é o index.js
as Dependencias que estou utilizando nesse projeto são: o Express, body-parser, Sequelize.

A aplicação se inicia com a gente setando a view engine que estamos utilizando para o express com o app.set('view engine', 'ejs')

depois setamos uma pasta no app.use(express.static('public')) para dizermos que trabalharemos com arquivos estáticos(html, css, imagens, js) e que esses arquivos estão na pasta public