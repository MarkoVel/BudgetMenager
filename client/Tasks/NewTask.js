Template.NewTask.onCreated(function() {
    this.autorun(()=> {
        this.subscribe('task')
    });
});

Template.NewTask.helpers({
	newTaskMode: function () {
		if (Session.get('newTask')) {
		    return true;
		} else {
		    return false;
		}		
	}
});

Template.NewTask.events({
	'click .new-task-form-toggle': function () {
		Session.set('newTask', true);
	},
	'click .new-task-close': function () {
		Session.set('newTask', false);	
	}
});