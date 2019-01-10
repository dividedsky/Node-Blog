// capitalize users name
const capitalizeName = (req, res, next) => {
  // expects an object with a 'name' field, ie: {name: 'justin'}
  if (!req.body.name) {
    res.status(400).json({errorMessage: 'no name in request'});
  } else {
    //req.body.name = req.body.name[0].toUpperCase() + req.body.name.slice(1);
    let name = req.body.name.split(' ');
    console.log(name);
    name = name.map(word => word[0].toUpperCase() + word.slice(1));
    console.log(name);
    req.body.name = name.join(' ');

    next();
  }
};

module.exports = capitalizeName;
