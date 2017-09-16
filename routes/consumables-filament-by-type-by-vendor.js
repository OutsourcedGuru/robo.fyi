exports.index = function(req, res){
  res.render('../consumables/filament-by-type-by-vendor', { title: 'Filament List' });
};