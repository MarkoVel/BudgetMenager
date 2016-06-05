Template.Profile.onCreated(function() {
    this.autorun(()=> {
        this.subscribe('users')
    });
    if (!Meteor.userId()) {
        FlowRouter.go('home');
        Materialize.toast('You must login first', 3000, 'error');
    }
});

Template.Profile.rendered = function (){
    $(document).ready(function(){
        $('.tooltipped').tooltip({delay: 50});
        $('select').material_select();
        // Materialize.updateTextFields();
    });
}


Template.Profile.helpers({
    getUser: function(){
        var userId = Meteor.userId();
        var user = Meteor.users.findOne(userId)
        var fullName = user && user.profile && user.profile.fullName;
        var website = user && user.profile && user.profile.website;
        var bio = user && user.profile && user.profile.bio;
        var currency = user && user.profile && user.profile.currency;
        var email = user && user.emails[0] && user.emails[0].address;

        return {
            fullName: fullName,
            website: website,
            bio: bio,
            currency: currency,
            email: email
        };

    },
});

Template.Profile.events({
    'click .edit-profile-btn': function() {
        $('#edit-profile').openModal();
    },
    'submit #edit-profile-form': function(event, template) {
        event.preventDefault();

        // fetching data form form
        var fullName = template.find('.fullName').value;
        // var email = template.find('#email').value;
        var website = template.find('#website').value;
        var bio = template.find('.bio').value;
        // var currency = template.find('.currencySelect :selected').value;

        // make object for submit
        var data = {
            fullName: fullName,
            // email: email,
            website: website,
            bio: bio,
            // currency: currency
        }

        Meteor.call('updateUserProfile', data);

        $('#edit-profile').closeModal();
        Materialize.toast('Successfuly saved', 3000, 'success');
        return false;
    },
});
