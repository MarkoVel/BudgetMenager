Template.Profile.rendered = function (){
    $(document).ready(function(){
    });
}

Template.MainNav.events({
    'click .login': ()=> {
        $('#modal1').openModal();
    },
    'click .logout': function(event) {
        event.preventDefault();
        AccountsTemplates.logout();
    },
    'click .material--burger': ()=> {
    	$('.material--burger').toggleClass('material--arrow');
    	$('body').toggleClass('nav-open');
    },
    'click .nav-overlay': ()=> {
    	$('body').removeClass('nav-open');
    	$('.material--burger').removeClass('material--arrow');
    },
    'click .nav-ul__li__link': ()=> {
    	$('body').removeClass('nav-open');
    	$('.material--burger').removeClass('material--arrow');
    }
});

