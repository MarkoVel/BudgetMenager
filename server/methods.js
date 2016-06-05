Meteor.methods({
    updateUserEmail: function (email) {
        Meteor.users.update({_id:Meteor.user()._id}, {
            $set:{
                'emails.0.address': email
            }
        });
    }, // end updateUserEmail
    verifyUserEmail: function(email) {
        return Meteor.users.find({'emails.0.address': email});
    },
    updateUserProfile: function (data) {
        Meteor.users.update({_id:Meteor.user()._id}, {
            $set:{
                'profile.fullName': data.fullName,
                // 'emails.0.address': data.email,
                'profile.website': data.website,
                'profile.bio': data.bio,
                // 'profile.currency': data.currency
            }
        });
    }, // end updateUserProfile
    removeDeposit: function(id){
		Deposit.remove(id);
	},
    updateUserMoney: function(userId, newTotalMoney, newTotalMoneySpent){
        Meteor.users.update({_id:userId}, {
            $set:{
                'profile.totalMoney': newTotalMoney,
                'profile.totalMoneySpent': newTotalMoneySpent
            }
        });
    },
    addNewCategory: function(data) {
        var sameCategoryName = Cat.find({
            name: data.name
        });
        var totalSpent;
        var sameCategoryNameId;
        var sameCategoryNameCount = sameCategoryName.count();
        
        // proveravam da li ima kategorija sa tim imenom
        if (sameCategoryNameCount >= 1) {
            // ako je IMA
            sameCategoryName.map(function(x){
                totalSpent = x.totalSpent;
                sameCategoryNameId = x._id;
            });
            
            var newTotalSpant = totalSpent + data.value;
            Cat.update({_id:sameCategoryNameId}, {
                $set: {
                    "totalSpent": newTotalSpant
                }
            });
        } else {
            // ako nema kategorija upisujem novu
            Cat.insert({
                "name": data.name,
                "totalSpent": data.value,
            });
        }
    },
    updateCategoryOnDepositRemove: function(data) {
        var catOne = Cat.findOne({ name: data.name });
        var catTotalSpant = catOne.totalSpent;
        var newTotalSpant = catTotalSpant - data.value;
        Cat.update({name:data.name}, {
            $set: {
                "totalSpent": newTotalSpant
            }
        });
    },
    data: function(){
        return Cat.find({author: this.userId}).map(function(m){
            if (Number(m.totalSpent) > 0) {
                return [m.name, m.totalSpent]
            } 
            return '';
        });
    },
    taskCheckBox: function(id, currentState){
        Task.update(id,{
            $set: {
                checked: !currentState
            }
        });
    },
    removeTask: function(id) {
        Task.remove(id);
    }
});
