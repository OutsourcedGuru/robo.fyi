exports.index = function(req, res){
  res.render('../hardware/parts-by-printer-by-vendor', { title: 'Hardware List' });
};