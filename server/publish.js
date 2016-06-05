Meteor.publish('allUsers', function() {
    if(Roles.userIsInRole(this.userId, 'admin')){
        return Meteor.users.find({});
    }
});

Meteor.publish("users", function(){
  return Meteor.users.find({_id: this.userId});
})

// Meteor.publish("images", function(){ return Images.find(); });
Meteor.publish('deposit', function () {
    return Deposit.find({author: this.userId});
});
Meteor.publish('cat', function () {
    return Cat.find({_id: this.userId});
});

Meteor.publish('catAndDeposit', function () {
    return [
        Cat.find({author: this.userId}),
        Deposit.find({author: this.userId}),
    ];
});
Meteor.publish('task', function () {
    return Task.find({author: this.userId});
});