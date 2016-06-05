// Home Page
FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render("MainLayout", {main: "Home"});
    }
});
FlowRouter.route('/deposit', {
    name: 'deposit',
    action() {
        BlazeLayout.render("MainLayout", { main: "Deposit" });
    }
});
FlowRouter.route('/dashboard', {
    name: 'dashboard',
    action() {
        BlazeLayout.render("MainLayout", {main: "Dashboard"});
    }
});

FlowRouter.route('/profile', {
    name: 'profile',
    action() {
        BlazeLayout.render("MainLayout", {main: "Profile"});
    }
});

FlowRouter.route('/todos', {
    name: 'todos',
    action() {
        BlazeLayout.render("MainLayout", {main: "Tasks"});
    }
});
