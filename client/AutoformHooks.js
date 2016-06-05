var NewDepositHook = {
    before: {
        // Replace `formType` with the form `type` attribute to which this hook applies
        insert: function(doc) {
            var category;
            var value = doc.value;
            var type = doc.type[0];
            if (doc.category) {
                // ako je kategorija izabrana kroz slect
                category = doc.category[0];
                doc.category = [category];

                var data = {};
                data.name = category;
                data.value = doc.value;
                data.userId = Meteor.user()._id;
                
                if (type === 'cost') {
                    Meteor.call('addNewCategory', data);
                }
            } else {
                // ako je nova kategorija ukucana 
                category = $('#categorySecund').val();
                var data = {
                    category: category,
                    totalSpent: doc.value
                }
                doc.category = [category];
            }
            this.result(doc);
            
      }
    },
    onSuccess: function(operation, result, template) {
        var type = this.insertDoc.type[0];
        var value = this.insertDoc.value;
        // var category = this.insertDoc.categoryAlternative;
        // console.log(category);

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
            // Meteor.call('updateCategory', this._id, newTotalMoneySpent);
        }

        Meteor.call('updateUserMoney', Meteor.user()._id, newTotalMoney, newTotalMoneySpent);

        $('#NewDepositModal').closeModal();
        Materialize.toast('Successfuly added', 3000, 'success');
    },
}

var NewCategoryFormHook =  {
    after: {

    },
    before: {
        // Replace `formType` with the form `type` attribute to which this hook applies
        insert: function(doc) {
            // continue
            this.result(doc);
            
      }
    },
    onSuccess: function(operation, result, template) {
        // insertDoc


        $('#NewCategoryModal').closeModal();
        Materialize.toast('Successfully added', 3000, 'success');
    },
}
var NewTaskFormHook =  {
    onSuccess: function(operation, result, template) {
        Materialize.toast('Successfully added', 3000, 'success');
        // Session.set('newTask', true);
        // $('.new-task-input-title').focus();
    },
}

AutoForm.hooks({
  NewDepositForm: NewDepositHook,
  NewCategoryForm: NewCategoryFormHook,
  NewTaskForm: NewTaskFormHook
});