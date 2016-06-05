Template.HeaderHero.onCreated(function() {
    this.autorun(()=> {
        this.subscribe('allUsers')
    });
    // Meteor.users.remove({});
});
Template.HeaderHero.events({
    'click .new-deposit-btn': (e)=>{
        $('#NewDepositModal').openModal();
    },
});

Template.HeaderHero.helpers({
    getMoney: function(){
        var userId = Meteor.userId();
        var user = Meteor.users.findOne(userId)
        var money = user && user.profile && user.profile.totalMoney;
        var currency = user && user.profile && user.profile.currency;

        return {
            money: money,
            currency: currency
        };

    },
});
