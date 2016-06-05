Template.Avatar.onCreated(function() {
    this.autorun(()=> {
        this.subscribe('allUsers','images')
    });
});


Template.Avatar.helpers({
    avatarURL: function(){
        var userId = Meteor.userId();
        var user = Meteor.users.findOne(userId)
        var avatarURL = user && user.profile && user.profile.image;

        return avatarURL;

    },
});

Template.Avatar.events({
    'click .avatar': function(e){
        e.preventDefault();
        $('#avatar-input').trigger('click');
    },
    'change #avatar-input': function(event, template) {
        var userId = Meteor.userId();

        FS.Utility.eachFile(event, function(file) {
            var fileObj = new FS.File(file);
            fileObj.metadata = { owner: Meteor.userId() };

            Images.insert(file, function (err, fileObj) {
              if (err){
                Materialize.toast('We have some error!', 3000);
              } else {
                 // handle success depending what you need to do
                Materialize.toast('Successfuly changed picture!', 4000);
                var imagesURL = {
                  "profile.image": "/cfs/files/images/" + fileObj._id
                };
                Meteor.users.update(userId, {$set: imagesURL});
              }
            });
        });
    },
});
