// new collection
Cat = new Mongo.Collection('cat');

// collection persmision
Cat.allow({
	insert: function(userId, doc) {
		return true;
	},

	update: function(userId, doc) {
		return true;
	}
});

// structure of the schema
CatSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Title",
		autoform: {
		    type: "select",
		    options: function () {
		        return [
		            { label: "Home", value: 'Home' },
		            { label: "Family", value: 'Family' }
		        ];
		    }
		}
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
	totalSpent: {
		type: Number,
		optional: true,
		autoform:{
			type: "hidden"
		}
	},
});

// attach shema to collection
Cat.attachSchema(CatSchema);
