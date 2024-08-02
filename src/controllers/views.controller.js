const path = require('path');
const controllers = {}

controllers.login = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html', 'login.html'));
}

controllers.index = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html', 'index.html'));
}

module.exports = controllers