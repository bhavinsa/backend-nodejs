var ApiMail = function () {};
ApiMail.FORGOT_PASSWORD_SUBJECT = "Password Recovery.";
ApiMail.FORGOT_PASSWORD_BODY = "<p>User Name:{USERNAME} </br>Password:{PASSWORD} </p>";

ApiMail.WELCOME_EMAIL_SUBJECT = "Welcome to Application";
ApiMail.WELCOME_EMAIL_BODY = "<p>Hello there,</p>" +
    "<p>Welcome! </p>" +
    "<p>Sincerely,</br>Application Team</p>";

module.exports = ApiMail;