Template.Tasks.onCreated(function() {
    this.autorun(()=> {
        this.subscribe('task')
    });
    if (!Meteor.userId()) {
        FlowRouter.go('home');
        Materialize.toast('You must login first', 3000, 'error');
    }
});


Template.Tasks.events({
    'click .hide-complited': function(event, template) {
        // var x = template.$('.hide-complited').is(":checked").val();
        var x = event.target.checked;
        Session.set("hide-complited", x);
    }  
});

Template.Tasks.helpers({
    getTasks: function() {
        if (Session.get('hide-complited') == true) {
            return Task.find({checked: false});
        } else {
            return Task.find();
        }
    },
    hideComplited: function() {
        if (Session.get('hide-complited') == true) {
            return 'checked';
        } else {
            return '';
        }
    }
});