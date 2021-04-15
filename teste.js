const Sequelize = require('sequelize')
const sequelize = new Sequelize('sequelize-teste', 'root', '', {
  dialect: 'mysql',
  host: '127.0.0.1'
})

const Pessoa = sequelize.define('Pessoa', {
  nome: Sequelize.STRING,
  nascimento: Sequelize.DATE
})
const Usuario = sequelize.define('Usuario', {
  usuario: Sequelize.STRING,
  senha: Sequelize.STRING
})
const Projeto = sequelize.define('Projeto', {
  nome: Sequelize.STRING
})
Pessoa.hasOne(Usuario)
Usuario.belongsTo(Pessoa)
Pessoa.hasMany(Projeto)
Projeto.belongsTo(Pessoa)

const testDB = async () => {
  await sequelize.sync()
  // console.log('synced')
  /*
  const pessoa = await Pessoa.create({
    nome: 'Tulio Faria',
    nascimento: '1985-08-04'
  })
  const user = await Usuario.create({
    usuario: 'tuliofaria',
    senha: '123456'
  })
  user.setPessoa(pessoa)
  */

  /*
  const usuarios = await Usuario.findAll()
  const pessoas = await Promise.all(usuarios.map(async u => {
    return await u.getPessoa()
  }))
  console.log(pessoas)
  */

  const usuarios = await Usuario.findAll({
    include: [
      { model: Pessoa }
    ]
  })
  console.log(usuarios)
}
testDB()

// sequelize.sync()
// sequelize.authenticate().then(() => console.log('connected'))