const express = require("express");
const app = express();

//CRIAR UM ARTIGO POR AULA DAQUILO QUE ENTENDEU

//Decodificar dados do formulario
const bodyParser = require("body-parser");

//Importando Informações de conexão com o banco de dados
const connection = require("./database/database");

//Importando minha tabela
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Iniciando Conexão com o banco
connection
        .authenticate()
        .then(()=>{
            console.log("Conexão feita com o banco de dados");
        })
        .catch((msgerro)=>{
            console.log(msgerro);
        });

//Setando a view engine que vou utilizar
app.set('view engine', 'ejs');

//Dizendo para o expres que os arquivos estáticos estarão pasta public(poderia ser outro nome)
app.use(express.static('public'));

//Permite o envio de dados html, e a decodificação
app.use(bodyParser.urlencoded({extends: false}));

//Usarei isso apenas quando criarmos apiRestFull, mas basicamente , é pra decodificar json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    /*
        *Listando perguntas

        *Esse raw:true, é que sequelize traz informações
        desnecessarias na consulta
        por a gente pede pra trazer a consulta apenas
        com os dados  que eu pedi que no caso é titulo,
        e descrição.

        *O order, é pra trazer os dados na ordem
        decrescente e pelo id
    */
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC']
    ] }).then(perguntas => {
        res.render("index", {
            perguntas:perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

//Salvando pergunta no banco de dados
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo:titulo,
        descricao: descricao        
    }).then(()=>{
        res.redirect("/");
    })
    
});

app.get("/pergunta/:id", (req, res) => {

    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){//Pergunta encontrada
           
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [ ['id', 'DESC'] ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
           
        }else{//Não encontrada
            res.redirect("/");
        } 
    })

});

app.post("/responder", (req, res) => {

    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });

});

//A porta que a aplicação vai ser rodeada
app.listen(8080, ()=>{
    console.log("App rodando");
});