var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('todos',{
    id: { type: 'bigint', primaryKey: true, autoIncrement: true },
    version: { type: 'timestamp', defaultValue: new String('current_timestamp')},
    text : {type:'string', length:255},
    done: {type: 'boolean'}
  });
  callback();
};

exports.down = function(db, callback) {
  db.dropTable('todos');
  callback();
};
