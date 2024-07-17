// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDeDqJy2hd4GhtXU9osaWj7t4bE5J6VY0",
    authDomain: "mobile-number-validation-5ab72.firebaseapp.com",
    projectId: "mobile-number-validation-5ab72",
    storageBucket: "mobile-number-validation-5ab72.appspot.com",
    messagingSenderId: "208431635162",
    appId: "1:208431635162:web:664d1c45db379b269323e3",
    measurementId: "G-R7JZK5T2BV"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  function registerUser() {
      // Clear previous error messages
      document.getElementById("fullNameError").textContent = "";
      document.getElementById("emailError").textContent = "";
      document.getElementById("mobileError").textContent = "";
      document.getElementById("usernameError").textContent = "";
      document.getElementById("passwordError").textContent = "";
  
      // Get form values
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
  
      let valid = true;
  
      // Validate Full Name
      if (fullName === "") {
          document.getElementById("fullNameError").textContent = "Full Name cannot be empty.";
          valid = false;
      } else if (!/^[A-Z]/.test(fullName)) {
          document.getElementById("fullNameError").textContent = "Full Name must start with an uppercase letter.";
          valid = false;
      }
  
      // Validate Email
      if (email === "") {
          document.getElementById("emailError").textContent = "Email ID cannot be empty.";
          valid = false;
      } else if (!/.+@.+\..+/.test(email)) {
          document.getElementById("emailError").textContent = "Email ID must contain '@' and '.com'.";
          valid = false;
      }
  
      // Validate Mobile Number
      if (mobile === "") {
          document.getElementById("mobileError").textContent = "Mobile Number cannot be empty.";
          valid = false;
      } else if (!/^[7-9]\d{9}$/.test(mobile)) {
          document.getElementById("mobileError").textContent = "Mobile Number must start with 7, 8, or 9 and have 10 digits.";
          valid = false;
      }
  
      // Validate Username
      if (username === "") {
          document.getElementById("usernameError").textContent = "Username cannot be empty.";
          valid = false;
      } else if (!/^[a-z0-9@]{5,10}$/.test(username)) {
          document.getElementById("usernameError").textContent = "Username must be 5-10 characters long and contain only lowercase letters, numbers, and '@'.";
          valid = false;
      }
  
      // Validate Password
      if (password === "") {
          document.getElementById("passwordError").textContent = "Password cannot be empty.";
          valid = false;
      } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{10,}/.test(password)) {
          document.getElementById("passwordError").textContent = "Password must be at least 10 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.";
          valid = false;
      }
  
      if (valid) {
          const user = {
              fullName,
              email,
              mobile,
              username,
              password
          };
  
          // Save user data to localStorage for further processing
          localStorage.setItem("pendingUser", JSON.stringify(user));
  
          // Configure Recaptcha
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
              'size': 'invisible',
              'callback': function(response) {
                  sendOTP(mobile);
              }
          });
  
          window.recaptchaVerifier.render().then(function(widgetId) {
              window.recaptchaWidgetId = widgetId;
              sendOTP(mobile);
          });
      }
  }
  
  function sendOTP(mobile) {
      const formattedMobile = `+91${mobile}`; // Add country code for India
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(formattedMobile, appVerifier)
          .then(function(confirmationResult) {
              window.confirmationResult = confirmationResult;
              document.getElementById("message").textContent = "OTP sent to your mobile. Please enter the OTP.";
              document.getElementById("otpSection").style.display = "block";
          }).catch(function(error) {
              console.error('Error during signInWithPhoneNumber', error);
              document.getElementById("message").textContent = `Error sending OTP. Please try again. (${error.message})`;
          });
  }
  
  function validateOTP() {
      const otp = document.getElementById("otp").value.trim();
      confirmationResult.confirm(otp).then(function(result) {
          const user = JSON.parse(localStorage.getItem("pendingUser"));
          storeUser(user);
          document.getElementById("message").textContent = "User registered successfully!";
          document.getElementById("showTableButton").style.display = "block";
          document.getElementById("otpSection").style.display = "none";
          localStorage.removeItem("pendingUser");
      }).catch(function(error) {
          console.error('Error during OTP confirmation', error);
          document.getElementById("otpError").textContent = `Invalid OTP. Please try again. (${error.message})`;
      });
  }
  
  function storeUser(user) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
  }
  
  function redirectToUserTable() {
      window.location.href = "userTable.html";
  }
  
  // Hide the button on page load
  window.onload = function() {
      document.getElementById("showTableButton").style.display = "none";
  };
  
/*// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDeDqJy2hd4GhtXU9osaWj7t4bE5J6VY0",
    authDomain: "mobile-number-validation-5ab72.firebaseapp.com",
    projectId: "mobile-number-validation-5ab72",
    storageBucket: "mobile-number-validation-5ab72.appspot.com",
    messagingSenderId: "208431635162",
    appId: "1:208431635162:web:664d1c45db379b269323e3",
    measurementId: "G-R7JZK5T2BV"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  function registerUser() {
      // Clear previous error messages
      document.getElementById("fullNameError").textContent = "";
      document.getElementById("emailError").textContent = "";
      document.getElementById("mobileError").textContent = "";
      document.getElementById("usernameError").textContent = "";
      document.getElementById("passwordError").textContent = "";
  
      // Get form values
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
  
      let valid = true;
  
      // Validate Full Name
      if (fullName === "") {
          document.getElementById("fullNameError").textContent = "Full Name cannot be empty.";
          valid = false;
      } else if (!/^[A-Z]/.test(fullName)) {
          document.getElementById("fullNameError").textContent = "Full Name must start with an uppercase letter.";
          valid = false;
      }
  
      // Validate Email
      if (email === "") {
          document.getElementById("emailError").textContent = "Email ID cannot be empty.";
          valid = false;
      } else if (!/.+@.+\..+/.test(email)) {
          document.getElementById("emailError").textContent = "Email ID must contain '@' and '.com'.";
          valid = false;
      }
  
      // Validate Mobile Number
      if (mobile === "") {
          document.getElementById("mobileError").textContent = "Mobile Number cannot be empty.";
          valid = false;
      } else if (!/^[7-9]\d{9}$/.test(mobile)) {
          document.getElementById("mobileError").textContent = "Mobile Number must start with 7, 8, or 9 and have 10 digits.";
          valid = false;
      }
  
      // Validate Username
      if (username === "") {
          document.getElementById("usernameError").textContent = "Username cannot be empty.";
          valid = false;
      } else if (!/^[a-z0-9@]{5,10}$/.test(username)) {
          document.getElementById("usernameError").textContent = "Username must be 5-10 characters long and contain only lowercase letters, numbers, and '@'.";
          valid = false;
      }
  
      // Validate Password
      if (password === "") {
          document.getElementById("passwordError").textContent = "Password cannot be empty.";
          valid = false;
      } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{10,}/.test(password)) {
          document.getElementById("passwordError").textContent = "Password must be at least 10 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.";
          valid = false;
      }
  
      if (valid) {
          const user = {
              fullName,
              email,
              mobile,
              username,
              password
          };
  
          // Save user data to localStorage for further processing
          localStorage.setItem("pendingUser", JSON.stringify(user));
  
          // Configure Recaptcha
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
              'size': 'invisible',
              'callback': function(response) {
                  sendOTP(mobile);
              }
          });
  
          window.recaptchaVerifier.render().then(function(widgetId) {
              window.recaptchaWidgetId = widgetId;
              sendOTP(mobile);
          });
      }
  }
  
  function sendOTP(mobile) {
      const formattedMobile = `+91${mobile}`; // Add country code for India
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(formattedMobile, appVerifier)
          .then(function(confirmationResult) {
              window.confirmationResult = confirmationResult;
              document.getElementById("message").textContent = "OTP sent to your mobile. Please enter the OTP.";
              document.getElementById("otpSection").style.display = "block";
          }).catch(function(error) {
              console.error('Error during signInWithPhoneNumber', error);
              document.getElementById("message").textContent = `Error sending OTP. Please try again. (${error.message})`;
          });
  }
  
  function validateOTP() {
      const otp = document.getElementById("otp").value.trim();
      confirmationResult.confirm(otp).then(function(result) {
          const user = JSON.parse(localStorage.getItem("pendingUser"));
          storeUser(user);
          document.getElementById("message").textContent = "User registered successfully!";
          document.getElementById("showTableButton").style.display = "block";
          document.getElementById("otpSection").style.display = "none";
          localStorage.removeItem("pendingUser");
      }).catch(function(error) {
          console.error('Error during OTP confirmation', error);
          document.getElementById("otpError").textContent = `Invalid OTP. Please try again. (${error.message})`;
      });
  }
  
  function storeUser(user) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
  }
  
  function redirectToUserTable() {
      window.location.href = "user-table.html";
  }
  
  // Hide the button on page load
  window.onload = function() {
      document.getElementById("showTableButton").style.display = "none";
  };
*/
