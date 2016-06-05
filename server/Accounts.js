var postSignUp = function(userId, info) {
    Roles.addUsersToRoles(userId, ['normal-user', info.profile.profesion]);

}
AccountsTemplates.configure({
    postSignUpHook: postSignUp
});

// Accounts.onCreateUser(function(options, user) {
//     // We still want the default hook's 'profile' behavior.
//
//     user.profile.bio = "";
//     return user;
// });
