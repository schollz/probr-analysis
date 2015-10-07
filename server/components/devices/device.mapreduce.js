/*
 Serves as a map reduce config object for the normal full map reduce on the packets collections to identify
 devices
 */
var map_reduce_object = {
  map : function(){
    emit(this.mac_address_src,{mac_address: this.mac_address_src, vendor: this.vendor, last_seen:this.inserted_at});
  },

  reduce : function(key, values) {
    var lastSeen = values[0].last_seen;
    for (i = 1; i < values.length; i++) {
      if (lastSeen < values[i].last_seen) {
        lastSeen = values[i].last_seen;
      }
    }
    return {mac_address: values[0].mac_address, vendor: values[0].vendor, last_seen: lastSeen};
  },

  out : {reduce: 'raw_devices'},
};

exports.mapReduceConfig = map_reduce_object;



/*
 Returns a map reduce config object with the query property set to reduce only items inserted
 after the parameter gt_timestamp
 */
var getMapReduceIncremental = function(gt_timestamp){
  var map_reduce_object_incremental = map_reduce_object;
  map_reduce_object_incremental.query = {inserted_at: {$gt : gt_timestamp} };
  return map_reduce_object_incremental;
}

exports.getIncrementalMapReduceConfig = getMapReduceIncremental;
