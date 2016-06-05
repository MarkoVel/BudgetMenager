Template.Filter.onCreated(function() {
    if (!Session.get('filter')) {
        Session.set('filter', null);
    }
});
Template.Filter.events({
    'click .filter__group': function(event) {
        // var $this = $(this);
        var value = event.target.value;
        if (value === 'cost') {
            Session.set('filter', 'cost');
        } else if(value === 'profit'){
            Session.set('filter', 'profit');
        } else if(value === 'all'){
            Session.set('filter', null);
        } else if (value === 'list') {
            Session.set('view', null);
        } else if (value === 'grid') {
            Session.set('view', 'grid');
        }
    },
    'keyup .search': function(event) {
        Session.set('search', searchWord);
        var searchWord = event.target.value;
        if (searchWord.length != 0) {
            Session.set('filter', null);
        } else {
            Session.set('search', null);
        }
    },
});

Template.Filter.helpers({
    isListView: function(){
        if (Session.get('view') == null) {
            return 'checked';
        } else {
            return '';
        }
    },
    isGridView: function(){
        if (Session.get('view') === 'grid') {
            return 'checked';
        } else {
            return '';
        }
    },
    isFilterCost: function() {
        if (Session.get('filter') === 'cost') {
            return true;
        }  
    },
    isFilterProfit: function() {
        if (Session.get('filter') === 'profit') {
            return true;
        }  
    },
    isFilterAll: function() {
        if (Session.get('filter') === null) {
            return true;
        }  
    },
    isFilter: function(filter) {
        if (Session.get('filter') === filter) {
            return 'checked';
        }
    },
});