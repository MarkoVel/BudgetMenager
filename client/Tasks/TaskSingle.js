Template.TaskSingle.rendered = function (){
    $(document).ready(function(){
        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'right' // Displays dropdown with edge aligned to the left of button
          });
    });
}

Template.TaskSingle.events({
    'change .todo__checkbox__input': function (event) {
        var newChecked = !event.target.checked;
        Meteor.call('taskCheckBox', this._id, newChecked);
    },
    'click .task-remove': function () {
        Meteor.call('removeTask', this._id);
        Materialize.toast('Successfuly removed', 3000, 'success');
    },
    'click .task-edit, dblclick .todo__text': function (event) {
        var id = this._id;
        $('.task-'+id).addClass('editMode');
    },
    'click .update-task-close, focusout .update-task-form-input': function () {
        $('.task-'+this._id).removeClass('editMode');
    },
    'focusout .update-task-form-input': function(event) {
        var id = event.target.getAttribute('data-id');
        console.log(id);
        $('.task-'+id).removeClass('editMode');
    }
});

Template.TaskSingle.helpers({
    isChecked: function() {
        if (this.checked) {
            return 'checked';
        } else {
            return '';
        }
    },
    getValue: ()=> {
        return this.title;
    },
    UpdateTaskFormId: function() {
        return this._id;
    },
    editMode: function() {
        if (Session.get('task-edit')) {
            return true;
        } else {
            return false;
        }
    }
});