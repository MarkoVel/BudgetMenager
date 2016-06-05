// new collection
Deposit = new Mongo.Collection('deposit');

// collection persmision
Deposit.allow({
	insert: function(userId, doc) {
		return !!userId;
	},

	update: function(userId, doc) {
		return !!userId;
	}
});

// structure of the schema
DepositSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Title"
	},
	value: {
        type: Number,
        label: "Enter value test",
        min: 0
	},
    type: {
        type: [String],
		label: "Select type",
        autoform: {
            type: "select",
            options: function () {
                return [
                    { label: "Cost", value: 'cost' },
                    { label: "Profit", value: 'profit' }
                ];
            }
        }
    },
	category: {
		type: [String],
		label: "Select category",
		autoform: {
		    type: "select",
		}
		// autoform: {
		// 	type: "select",
		// 	options: function () {
		// 		return Cat.find().map(function(c) {
		// 			return{label: c.name, value: c.name} 
		// 		});
		// 	}
		// }
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function(){
			return this.userId
		},
		autoform:{
			type: "hidden"
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		},
		autoform:{
			type: "hidden"
		}
	}
});

// attach shema to collection
Deposit.attachSchema(DepositSchema);
