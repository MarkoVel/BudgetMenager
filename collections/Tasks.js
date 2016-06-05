// new collection
Task = new Mongo.Collection('task');

// collection persmision
Task.allow({
	insert: function(userId, doc) {
		return true;
	},

	update: function(userId, doc) {
		return true;
	}
});

// structure of the schema
TaskSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Task title"
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
	value: {
        type: Number,
        label: "Value",
        min: 0,
        optional: true
	},
	checked: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform: {
			type: "hidden"
		}
	},
});

// attach shema to collection
Task.attachSchema(TaskSchema);
