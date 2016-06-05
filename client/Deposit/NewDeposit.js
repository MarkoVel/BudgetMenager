// Template.NewDepositModal.rendered = function (){
//     $(document).ready(function(){
//         $('select').material_select();
//     });
// }
Template.NewDepositModal.onCreated(function() {
    this.autorun(()=> {
        this.subscribe('catAndDeposit')
    });
    $(document).ready(function(){
        $('select').material_select();
    });
});
Template.NewDepositModal.helpers({
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
    getStaticCategories: function () {
        return [
          {
            optgroup: "Categories",
            options: [
              {label: "Home", value: 'Home'},
              {label: "Family", value: "Family"},
              {label: "Builds", value: "Builds"},
              {label: "Shopping", value: "Shopping"},
              {label: "Clothing", value: "Clothing"},
              {label: "Food", value: "Food"},
              {label: "Health", value: "Health"},
              {label: "Pets", value: "Pets"},
              {label: "Gifts", value: "Gifts"},
              {label: "Transport", value: "Transport"},
              {label: "Sport", value: "Sport"},
              {label: "General", value: "General"},
              {label: "Other", value: "Other"},
            ]
          }
        ];
      }
});

Template.NewDepositModal.events({
});