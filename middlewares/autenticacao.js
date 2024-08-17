require('dotenv').config();

//cria o tonken com essa chave, e abre também       tanto para criar, quanto para desfazer
const chavePrivada = process.env.CHAVE_JWT || '';

const jwt = require('jsonwebtoken');

//requisição, resposta e o next("segue o fluxo normal aí")
exports.autenticar = (req, res, next) => {
    console.log('Entrou no middleware de autenticação...');

    //chave de acesso que será definida (*posso definir a duração)
    const token = req.headers['authorization'];

    jwt.verify(token, chavePrivada, {expiresIn: '2000'}, (erro, informacoesUsuario) => {
        if (erro)
            return res.status(401).send({ msg: 'Token inválido ou expirado' });
        //res.status(200).send(informacoesUsuario);
        next();
    });
}

//---
exports.logar = (req, res, next) => {
    //const usuario = req.headers.usuario;
    //const senha = req.headers.senha;
    //as duas linhas de cima podem ser representadas dessa forma
    const { usuario, senha } = req.headers;
    if (usuario == 'aderbal' && senha == '123456') {
        //simulando os dados que vieram do BD
        const dadosUsuario = {
            id: 1,
            nome: 'Aderbal',
            email: 'aderbal@email.com'
        };

        //criar o token para o usuário
        jwt.sign(dadosUsuario, chavePrivada, (erro, token) => {
            if(erro)
                return res.status(500).send({ msg: '[ERRO]: Erro ao gerar JWT!'});
            //não é necessário o 'else', pois há o 'return'
            res.status(200).send({ token: token });
        });
    } else {
        res.status(401).send({ msg: '[ERRO]: Usuário ou senha errados!' });
    }
}