console.log("Loading script");

class User {
  constructor(name, nickname) {
    this.name = name;
    this.nickname = nickname;
    this.nickname ??= this.name;
  }

  age;
}

class Student extends User {
  study() {
    alert("Ready for the test!");
  }
}

const ageInput = document.getElementById("age-input");
const verifyButton = document.getElementById("verify-button");

verifyButton.addEventListener("click", handleVerifyButtonClick);

const loginJosephButton = document.getElementById("login-joseph-button");
const loginSarahButton = document.getElementById("login-sarah-button");
const loginJeffButton = document.getElementById("login-jeff-button");
const studyButton = document.getElementById("study-button");

let currentUser;

const people = [
  [User, "Joseph", "Joe"],
  [Student, "Sarah"],
  [User, "Jeffrey", "Jeff"],
];

function getLoginButtonClickHandler(userInfo) {
  // closure
  let userType = userInfo[0];
  console.log("userType set to: ", userType);
  let name = userInfo[1];
  let nickname = userInfo[2];
  return function () {
    console.log("userType is", userType);
    handleLoginButtonClick(userType, name, nickname);
  };
}

loginJosephButton.addEventListener(
  "click",
  getLoginButtonClickHandler(people[0])
);

loginSarahButton.addEventListener(
  "click",
  getLoginButtonClickHandler(people[1])
);

loginJeffButton?.addEventListener(
  "click",
  getLoginButtonClickHandler(people[2])
);

function handleLoginButtonClick(userType, ...constructorArguments) {
  console.log(arguments.length);
  currentUser = new userType(...constructorArguments); // spread operator
  alert(`Hi, ${currentUser.nickname}`);
}

studyButton.addEventListener("click", () => {
  const studyFn = currentUser.study;
  console.log("studyFn", studyFn);
  studyFn?.(); // null chaining
});

function handleVerifyButtonClick() {
  let age = ageInput.value === "" ? null : Number(ageInput.value);
  console.log(typeof age);

  const msg = document.getElementById("too-young-message");

  const u = new User();

  // u.age = age || -1; // clever? hack relying on "short circuit"
  // (but it doesn't as expected for valid falsy values like 0)

  // nullish coalescing operator
  u.age = age ?? -1; // clever? hack relying on "short circuit"

  ageInput.value = String(u.age);

  msg.style.display = age < 13 ? "block" : "none";

  // same is:
  if (age < 13) {
    // return this
  } else {
    // return that
  }
}

const move = document.getElementById("mover");

setInterval(() => {
  console.log("movingg", move.style.top);
  let currentTop = move.style.top;
  if (move.style.top > 100) {
    move.style.top = 0;
  } else {
    move.style.top += 10;
  }
}, 2);
