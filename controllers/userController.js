var _this = {};

module.exports = {
  



  setup: function(connection,bcrypt,session) {
    _this.connection = connection;
    _this.bcrypt = bcrypt;
    _this.session = session;  
  },


  viewAlterarUsuario:function(req, res) {
    if(!req.session.user || !req.session.user.nome || !req.session.user.id){
      res.redirect('/viewIniciar');
    }else{
      var id_usuario = req.session.user.id;
      _this.connection.query('SELECT * from usuario where id=?;', [id_usuario], function(err, rows){
        if(err){
          console.log('erro select usuario viewAlterarUsuario');
          throw err;
        }else{        
          var usuario = ({id:rows[0].id, nome:rows[0].nome,sobrenome: rows[0].sobrenome,genero: rows[0].genero, email:rows[0].email});
          console.log(usuario.nome);
          res.render('alterarUsuario', {usuario:usuario});
        }
      });
    }
  },

  registrar:function(req, res){
  var nome = req.body.nome;
  var sobrenome = req.body.sobrenome;
  var email = req.body.email;
  var senha = req.body.senha;
  var genero = req.body.genero;
  var hash = _this.bcrypt.hashSync(senha); //criptografia
  _this.connection.query('INSERT INTO usuario(nome, sobrenome, genero, email, senha) VALUES (?,?,?,?,?);',
    [nome, sobrenome, genero, email, hash ] ,
    function(err, res){
      if(err) throw err;
    });
  res.render('iniciar');
  },




};
