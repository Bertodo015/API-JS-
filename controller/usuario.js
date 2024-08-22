const Usuario = require('../model/usuario.js');
const bcrypt = require('bcrypt');

exports.registrarUsuario = (req, res) => {
    const novoUsuario = req.headers.usuario;
    const senhaNovoUsuario = req.headers.senha;

    try {
        const usuarioJahExiste = Usuario.findOne({usuario: novoUsuario});    //findOne/find busca um elemento de acordo com o critério
        if(usuarioJahExiste) {
            return res.status(400).send({msg: '[Erro]: usuário já cadastrado!'});
        }

        const senhaEncriptada = bcrypt.hash(senhaNovoUsuario, 10);

    }
    
}