import moment from 'moment';

Template.DepositSingleGrid.rendered = function (){
    $(document).ready(function(){
        $('.tooltipped').tooltip({delay: 50});

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

Template.DepositSingleGrid.helpers({
    dateFormat: function() {
        // return moment(this.createdAt).format('LL');
        return moment(this.createdAt).startOf('minut').fromNow();
    },
    currency: function() {
        // return Meteor.user().profile && Meteor.user().profile.currency;
        var userId = Meteor.userId();
        var user = Meteor.users.findOne(userId)
        var currency = user && user.profile && user.profile.currency;
    },
});


Template.DepositSingleGrid.events({
    'click .deposit__remove': function(event, template) {

        var type = this.type[0];
        var value = this.value;
        
        // get data from collection
        var userTotalMoney = Meteor.user().profile.totalMoney;
        var userTotalSpant = Meteor.user().profile.totalMoneySpent;

        var newTotalMoney;
        var newTotalMoneySpent;

        if (type === 'profit') {
            newTotalMoney = userTotalMoney - value;
        } else if (type === 'cost') {
            newTotalMoney = userTotalMoney + value;
            newTotalMoneySpent = userTotalSpant - value;
            var data = {};
            data.name = this.category[0];
            data.value = value;
            Meteor.call('updateCategoryOnDepositRemove', data);
        }

        Meteor.call('updateUserMoney', Meteor.user()._id, newTotalMoney, newTotalMoneySpent)

        Meteor.call('removeDeposit', this._id);
        Materialize.toast('Successfuly removed', 3000, 'success');
    },
    'click .deposit__edit': function(event, template) {
        $('#EditDepositModal').openModal();
        Session.set('currentDepositEdit', this._id);
    }
});
