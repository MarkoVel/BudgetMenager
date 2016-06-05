Template.Deposits.onCreated(function() {
    this.autorun(()=> {
        this.subscribe('deposit')
    });
    if (!Meteor.userId()) {
        console.log(Meteor.userId());
        FlowRouter.go('home');
        Materialize.toast('You must login first', 3000, 'error');
    }
});

Template.Deposits.helpers({
    deposits: function() {
        if (Session.get('search')) {
            return Deposit.find( {'$or' : [{ 'name':{'$regex':Session.get('search')} }]} );
        } else {
            // ako nije search aktivan
            if (Session.get('filter') === 'profit') {
                return Deposit.find({type: 'profit'}, {sort: { createdAt: -1 } });
            } else if (Session.get('filter') === 'cost') {
                return Deposit.find({type: 'cost'}, {sort: { createdAt: -1 } });
            }
            return Deposit.find({}, {sort: { createdAt: -1 } });
        }
    },
    getDepositNumber: function() {
        var depositNum = Deposit.find({}).count();
        return depositNum;
    },
    isGridView: ()=> {
        if (Session.get('view') === 'grid' || rwindow.$width() <= 600) {
            Session.set('view', 'grid');
            return true;
        } else {
            return false;
        }
    },
});
