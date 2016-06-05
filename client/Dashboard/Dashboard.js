Template.Dashboard.onCreated(function() {
    this.autorun(()=> {
        this.subscribe('catAndDeposit')
    });
    if (!Meteor.userId()) {
        FlowRouter.go('home');
        Materialize.toast('You must login first', 3000, 'error');
    }
});

Template.Dashboard.rendered = function (){
    var self = this;
    Meteor.call('data', function(error, result) {
        var chart = c3.generate({
            data: {
                columns: result,
                type : 'pie',
            },
            size: {
                height: 220,
                width: 220
            },
        });
    });
}

Template.Dashboard.helpers({
    getCategoriesCount: ()=> {
        return Cat.find({totalSpent: {$not: 0}}).count();
    },
    getCategories: ()=> {
        return Cat.find({totalSpent: {$not: 0}});
    },
    moneySpent: ()=> {
        // return (Meteor.user().profile.totalMoneySpent) * (-1);
        var totalSpent = 0;
        Cat.find().map(function(m){
            if (Number(m.totalSpent) > 0) {
                totalSpent += m.totalSpent;
            }
        });
        return totalSpent;
    },
    currency: ()=> {
        return Meteor.user().profile && Meteor.user().profile.currency;
    },
});

Template.Dashboard.events({
    'click .add-category-btn': ()=> {
        $('#NewCategoryModal').openModal();
    }
});
