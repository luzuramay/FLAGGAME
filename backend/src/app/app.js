"use strict";

const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session"); // Importando o express-session
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../../docs/swagger");
const usersRoute = require("../routes/usersRoute");
const flagsRoute = require("../routes/flagsRoute");

const app = express();

// Configuração do View Engine EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));

// Configuração da sessão
app.use(session({
    secret: 'secret-key',  // Chave secreta para assinar o ID da sessão
    resave: false,         // Não reseta a sessão se não houver alterações
    saveUninitialized: true, // Força a criação de uma sessão vazia
    cookie: { secure: false } // Se estiver usando HTTPS, coloque como true
}));

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas customizadas
app.use("/users", usersRoute);
app.use("/flags", flagsRoute);

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "../../../public")));

// Rota raiz redirecionando para /inicio
app.get('/', (req, res) => {
    res.redirect('/inicio');
});

// Outras rotas
app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/modosDeJogo', (req, res) => {
    res.render('modosDeJogo');
});

app.get('/modosDoJogo/errouTermina', (req, res) => {
    res.render('errouTermina');  // Renderiza o arquivo errouTermina.ejs
});

// Rota de início
app.get('/inicio', (req, res) => {
    res.render('inicio');
});

app.get('/public/modosDoJogo/normal.html', (req, res) => {
    res.render('/public/modosDoJogo/normal.html');
});

// Modo de Jogo Normal
app.get('/modosDoJogo/normal', (req, res) => {
    const brazilianStateFlags = [
        { state: "Acre", image: "/img/bandeiras/AC.png" },
        { state: "Alagoas", image: "/img/bandeiras/AL.png" },
        { state: "Amapá", image: "/img/bandeiras/AP.png" },
        { state: "Amazonas", image: "/img/bandeiras/AM.png" },
        { state: "Bahia", image: "/img/bandeiras/BA.png" },
        { state: "Ceará", image: "/img/bandeiras/CE.png" },
        { state: "Distrito Federal", image: "/img/bandeiras/DF.png" },
        { state: "Espírito Santo", image: "/img/bandeiras/ES.png" },
        { state: "Goiás", image: "/img/bandeiras/GO.png" },
        { state: "Maranhão", image: "/img/bandeiras/MA.png" },
        { state: "Mato Grosso", image: "/img/bandeiras/MT.png" },
        { state: "Mato Grosso do Sul", image: "/img/bandeiras/MS.png" },
        { state: "Minas Gerais", image: "/img/bandeiras/MG.png" },
        { state: "Pará", image: "/img/bandeiras/PA.png" },
        { state: "Paraíba", image: "/img/bandeiras/PB.png" },
        { state: "Paraná", image: "/img/bandeiras/PR.png" },
        { state: "Pernambuco", image: "/img/bandeiras/PE.png" },
        { state: "Piauí", image: "/img/bandeiras/PI.png" },
        { state: "Rio de Janeiro", image: "/img/bandeiras/RJ.png" },
        { state: "Rio Grande do Norte", image: "/img/bandeiras/RN.png" },
        { state: "Rio Grande do Sul", image: "/img/bandeiras/RS.png" },
        { state: "Rondônia", image: "/img/bandeiras/RO.png" },
        { state: "Roraima", image: "/img/bandeiras/RR.png" },
        { state: "Santa Catarina", image: "/img/bandeiras/SC.png" },
        { state: "São Paulo", image: "/img/bandeiras/SP.png" },
        { state: "Sergipe", image: "/img/bandeiras/SE.png" },
        { state: "Tocantins", image: "/img/bandeiras/TO.png" },
    ];

    // Inicializando contadores na sessão, caso não existam
    if (!req.session.errorCount) req.session.errorCount = 3;
    if (!req.session.correctAnswers) req.session.correctAnswers = 0;

    const correctState = brazilianStateFlags[Math.floor(Math.random() * brazilianStateFlags.length)];
    const options = shuffle([
        correctState.state,
        ...brazilianStateFlags
            .filter(f => f.state !== correctState.state)
            .slice(0, 3)
            .map(f => f.state),
    ]);

    // Passando as variáveis para o EJS
    res.render('normal', {
        errorCount: req.session.errorCount,
        correctAnswers: req.session.correctAnswers,
        flag: correctState,
        options: options
    });
});

// Função para embaralhar opções
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Rota para processar a resposta do jogo normal
app.post('/modosDoJogo/normal', (req, res) => {
    const { selectedOption, correctState } = req.body;

    // Verifica se a resposta está correta e atualiza os contadores
    if (selectedOption !== correctState) {
        req.session.errorCount--;  // Decrementa o contador de erros
    } else {
        req.session.correctAnswers++;  // Incrementa o número de acertos
    }

    // Se o número de erros chegar a 0, redireciona para a tela de score
    if (req.session.errorCount <= 0) {
        req.session.errorCount = 3;  // Reinicia a contagem de erros
        req.session.correctAnswers = 0;  // Reinicia os acertos
        return res.redirect('/score');  // Redireciona para a página de score
    }

    // Redireciona para a próxima bandeira
    res.redirect('/modosDoJogo/normal');
});

// Rota de tela de score
app.get('/score', (req, res) => {
    const { correctAnswers, errorCount } = req.session;
    res.render('score', {
        correctAnswers,
        errorCount
    });
});

// Rota de sobre
app.get('/sobre', (req, res) => {
    const teamMembers = ["Pedro Cordeiro", "Mayara Lins", "Ana Oliveira", "Miguel Ferreira"];
    res.render('sobre', { teamMembers });
});


module.exports = app;
