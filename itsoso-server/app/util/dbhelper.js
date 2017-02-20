exports.findOrSave = function *findOrSave(model, pair){
    var found = yield model.findOne(pair).exec();
    if(!found)
    {
      var _entity = new model(pair);
      var created = yield _entity.save();
      return created;
    }else{
      return found;
    }
}