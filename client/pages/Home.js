Template.Home.rendered = function (){
    $(document).ready(function(){
		$('.parallax').parallax();
        $('select').material_select();
    });
}

Template.Home.onCreated(function() {
    if (Meteor.userId()) {
        FlowRouter.go('deposit');
    }
});