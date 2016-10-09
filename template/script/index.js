console.log("starting");

var API_KEY = "AIzaSyABuWBDG9fTg9C_BiMF_uVbzj0m7X23Xas";
var API_DOMAIN = "https://nexus1-8aa6c.firebaseio.com";

var config = {
  apiKey: API_KEY,
  authDomain: API_DOMAIN
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $(".starting-cover").hide();
    $("#signUpPage").hide();
    $("#forgotPasswdPage").hide();
    $(".login-cover").hide();
    $("#loginEmail").val("");
    $("#loginPassword").val("");
    $("#signUpEmail").val("");
    $("#signUpPassword").val("");
    $("#signUpPwdReenter").val("");
    $("#signUpName").val("");
  } else {
    $("#loginError").hide().val("");
    $(".starting-cover").hide();
    $(".login-cover").show();
    $("#loginError").show().text("");
    $("#loginProgress").hide();
    $("#loginBtn").show();
    $("#signUpError").show().text("");
    $("#signUpProgress").hide();
    $("#signUpBtn").show();
  }
});

/* LOGIN PROCESS */
$("#loginBtn").click(
  function() {
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();
    if (email != "" && password != "") {
      $("#loginProgress").show();
      $("#loginBtn").hide();
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        console.log("uid: " +  user.uid);
      }, function(error) {
        $("#loginError").show().text(error.message);
        $("#loginProgress").hide();
        $("#loginBtn").show();
      })
    }
  }
);

$("#forgotPasswordLink").click(
  function() {
    $("#loginEmail").val("");
    $("#loginPassword").val("");
    $(".login-cover").hide();
    $("#signUpPage").hide();
    $("#forgotPasswdPage").show();
    $("#forgetPasswdConf").hide();
    $("#forgetPasswdAsk").show();
  }
)

$("#signUpLink").click(
  function() {
    $("#loginEmail").val("");
    $("#loginPassword").val("");
    $(".login-cover").hide();
    $("#forgotPasswdPage").hide();
    $("#signUpPage").show();
  }
)


/* SIGNUP PROCESS */
$("#signUpBtn").click(
  function() {
    var email = $("#signUpEmail").val();
    var passwd = $("#signUpPassword").val();
    var passwdReenter = $("#signUpPwdReenter").val();
    var name = $("#signUpName").val();
    if (passwd != passwdReenter) {
      $("#signUpError").show().text("Passwords need to be the same!");
      return;
    }
    if (email != "" && passwd != "" && passwdReenter != "" && name != "") {
      $("#signUpProgress").show();
      $("#signUpBtn").hide();
      firebase.auth().createUserWithEmailAndPassword(email, passwd).then(function(user) {
        console.log("uid: " +  user.uid);
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
          // Update successful.
        }, function(error) {
          console.log("error: " + error.message);
        });
      }, function(error) {
        $("#signUpError").show().text(error.message);
        $("#signUpProgress").hide();
        $("#signUpBtn").show();
      });
    }
  }
)

$("#signInLink").click(
  function() {
    console.log("link");
    $("#signUpEmail").val("");
    $("#signUpPassword").val("");
    $("#signUpPwdReenter").val("");
    $("#signUpName").val("");
    $("#signUpPage").hide();
    $(".login-cover").show();
  }
)


/* FORGOT PASSWORD PROCESS */

$("#forgotPasswdBtn").click(
  function() {
    var email = $("#forgotPasswdEmail").val();

    if (email != "") {
      $("#forgotPasswdProgress").show();
      $("#forgotPasswdBtn").hide();
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(email).then(function() {
        $("#forgotPasswdProgress").hide();
        $("#forgotPasswdBtn").show();
        $("#forgetPasswdConf").show();
        $("#forgetPasswdAsk").hide();
      }, function(error) {
        $("#forgotPasswdError").show().text(error.message);
        $("#forgotPasswdProgress").hide();
        $("#forgotPasswdBtn").show();
      });
    }
  }
 )

$("#signInForgotLink").click(
  function() {
    console.log("link");
    $("#signUpEmail").val("");
    $("#signUpPassword").val("");
    $("#signUpPwdReenter").val("");
    $("#signUpName").val("");
    $("#forgotPasswdPage").hide();
    $(".login-cover").show();
  }
)

/* LOGOUT PROCESS */
$("#signOutBtn").click(
  function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      alert(error.message);
    });
  }
);
