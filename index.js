const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');

//Configurações

var port = process.env.PORT || 3000;

//Sessão
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//Middleware

app.use((req, res, next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public/"));

//Rotas

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/', (req, res) => {
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/public/pages/login.html");
});

app.post('/login', function(req, res) {
    user.findOne({
        where: {
            email_user: req.body.email
        }
    })
        .then(user1=>{
            if(user1 != null) {
                if (bcrypt.compareSync(req.body.senha, user1.senha_user)) {
                    res.redirect('/');
                } else {
                    res.send('Usuário não existe!');
                }
            } else {
                res.send('Usuário não existe!');
            }
        })

        .catch(err=>{
            res.send('Erro: ' + err);
        });
});

app.get('/cadastrar', function(req, res) {
    res.sendFile(__dirname + '/public/pages/cadastrar.html');
});

app.post('/cadastrar', async (req, res) => {
    try {
        user.findOne({
            where: {
                email_user: req.body.email
            }
        })

            .then(async user1 =>{
                if (!user1) {
                    var senha = await bcrypt.hash(req.body.senha, 10);

                    user.create({
                        nome_user: req.body.nome,
                        email_user: req.body.email,
                        senha_user: senha
                    }).then(()=>{
                        res.redirect('/login');
                    })
                    .catch((err)=>{
                        res.send('Erro: ' + err + "<br><br>" + "Wait to be redirected!");
                        setTimeout((err)=>{
                            res.send(err);
                        },5000);
                    });
                } else {
                    res.send('Já cadastrado!');
                    return;
                }
            })

            .catch(err => {
                res.send(err);
            });
    } catch (error) {
        setTimeout(()=>{
            res.send('Erro: ' + error + "<br><br>" + "Você será redirecionado para tentar novamente!");
        }, 3000);
    }
    //res.send("E-mail: " + req.body.email + "<br>" + "Senha: " + req.body.senha + "<br>");
});

app.listen(port, (err, res) => {
    if(err) return console.log('ERRO');
    console.log('server iniciado na porta 8080');
});