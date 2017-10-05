exports.index = function(req, res){
  res.render('../hardware/parts-by-printer-by-subassembly', { title: 'Hardware List' });
};