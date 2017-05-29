import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
const Resolutions = new Mongo.Collection('resolutions');
Meteor.startup(() => {
  // code to run on server at startup

});
Meteor.publish("resolutions",function(){
  return Resolutions.find({
    $or:[
      {private:{$ne :true}},
      {owner:this.userId}
    ]
  });
});
Meteor.methods({
  addResolution:function(title){
    Resolutions.insert({
      title : title,
      createdAt : new Date(),
      owner :Meteor.userId()
    });

  },
  updateResolution:function(id,checked){
    var res = Resolutions.findOne();
    if(res.owner !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
  Resolutions.update(id,{$set:{checked:checked}});
  },
  deleteResolution:function(id){
    var res = Resolutions.findOne();
    if(res.owner !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Resolutions.remove(id);
  },
  setPrivate:function(id,private){
    var res = Resolutions.findOne();
    if(res.owner !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
      Resolutions.update(id,{$set:{private:private}});
  }

});
