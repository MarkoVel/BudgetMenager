

Template.EditDepositModal.rendered = function (){
    $(document).ready(function(){
        $('select').material_select();
    });
}
Template.EditDepositModal.onCreated(function() {
    this.autorun(()=> {
        this.subscribe('catAndDeposit')
    });
});
Template.EditDepositModal.helpers({
    currency: function() {
        // return Meteor.user().profile && Meteor.user().profile.currency;
        var userId = Meteor.userId();
        var user = Meteor.users.findOne(userId)
        var currency = user && user.profile && user.profile.currency;
    },
    getCategories: function() {
        return Cat.find().map(function (c) {
            return {label: c.name, value: c.name};
        });
    },
    selectedDepositDoc: function () {
    	var currentDepositEdit = Session.get('currentDepositEdit');
		return Deposit.findOne({_id: currentDepositEdit});
	},
});


var editDepositHook = {
    onSuccess: function(operation, result, template) {
    	console.log(this.updateDoc.type);
        var type = this.updateDoc.type[0];
        var value = this.updateDoc.value;

        // get data from collection
        var userTotalMoney = Meteor.user().profile.totalMoney;
        var userTotalSpant = Meteor.user().profile.totalMoneySpent;

        var newTotalMoney;
        var newTotalMoneySpent;

        if (type === 'profit') {
            newTotalMoney = userTotalMoney + value;
        } else if (type === 'cost') {
            newTotalMoney = userTotalMoney - value;
            newTotalMoneySpent = value + userTotalSpant;
        }
        Meteor.call('updateUserMoney', Meteor.user()._id, newTotalMoney, newTotalMoneySpent);

        $('#EditDepositModal').closeModal();
        Materialize.toast('successfully changed', 3000, 'success');
    },
}

AutoForm.hooks({
  EditDepositForm: editDepositHook
});