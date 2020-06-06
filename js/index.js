const restify = require('restify');
const errs = require('restify-errors');

const server = restify.createServer({
    name: 'myapp',

    version: '1.0.0'
});

var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : 'marina2207',
        database : 'test'
    }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());



server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

//rotas REST

server.get('/', (req, res, next) => {

    knex('users').then((dados) => {
        res.send(dados);
    }, next);
});

server.post('/create', (req, res, next) => {
    knex('users')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next)
});

server.get('/show/:id', (req, res, next) => {

    const { id } = req.params;

    knex('users')
        .where('user_id', id)
        .first()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado!'))
            res.send(dados);
        }, next);
});

server.put('/update/:id', (req, res, next) => {
    const { id } = req.params;

    knex('users')
        .where('user_id', id)
        .update(req.body)
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado!'))
            res.send('dados atualizados');
        }, next);

        console.log(req.body);
});

server.del('/delete/:id', (req, res, next) => {
    const { id } = req.params;

    knex('users')
        .where('user_id', id)
        .delete()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado!'))
            res.send('dados excluídos');
        }, next);
});

server.get('/login', (req, res) => {
    res.render("login");
});