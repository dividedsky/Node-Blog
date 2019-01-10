// capitalize users name
const capitalizeName = (req, res, next) => {
  // expects an object with a 'name' field, ie: {name: 'justin'}
  if (!req.body.name) {
    res.status(400).json({errorMessage: 'no name in request'});
  } else {
    let name = req.body.name.split(' ');
    name = name.map(word => word[0].toUpperCase() + word.slice(1));
    req.body.name = name.join(' ');
    next();
  }
};

module.exports = capitalizeName;
