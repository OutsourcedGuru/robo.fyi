exports.index = function(req, res){
  res.render('../software/software-by-type-by-vendor', { title: 'Software List' });
};