const controllers = {}

controllers.index = (req, res) => {
  res.render('index', {titulo: 'index'})
}

module.exports = controllers