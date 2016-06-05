
var myLogoutFunc = function() {
    FlowRouter.go('home');
}

var onSubmitHook = function(error, state){
    Meteor.subscribe('allUsers');
    if (!error) {
        if (state === "signIn") {
            // login
            $('#modal1').closeModal();
            FlowRouter.go('deposit');
        }
        if (state === "signUp") {
            // register

            // add default value
            Meteor.users.update({_id:Meteor.user()._id}, {
                $set:{
                    'profile.bio': "",
                    'profile.totalMoney': 0,
                    'profile.totalMoneySpent': 0,
                }
            });
            $('#modal1').closeModal();
            FlowRouter.go('deposit');
        }
    }
};

AccountsTemplates.configure({
    onLogoutHook: myLogoutFunc,
    onSubmitHook: onSubmitHook
});
AccountsTemplates.addFields([
    {
        _id: 'fullName',
        type: 'text',
        displayName: "Full Name",
        required: true,
        re: /(?=.*[a-z])(?=.*[A-Z])/,
    },
    {
        _id: 'website',
        type: 'text',
        displayName: "Website",
        required: false,
        re: /(?=.*[a-z])(?=.*[A-Z])/,
    },
    {
        _id: 'currency',
        type: 'select',
        displayName: 'Currency',
        select: [
            {
                text: 'RSD',
                value: 'RSD'
            },
            {
                text: 'EUR',
                value: 'EUR'
            },
            {
                text: 'USD',
                value: 'USD'
            },
            {
                text: 'GBP',
                value: 'GBP'
            },
            {
                text: 'CAD',
                value: 'CAD'
            },
        ],
    },
]);
