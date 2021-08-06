const hourInputBox = document.getElementById("hourInputBox");
const minuteInputBox = document.getElementById("minuteInputBox");
const ampm = document.getElementById("ampm");
const set = document.getElementById("set");
const timeOutput = document.getElementById("timeOutput");
const x = document.getElementById("myAudio");



// initializing variables

let hour;
let minute;
let allAlarm;
let hourOutput;
let minuteOutput;
let ampmOutput;
let alarmTime = [];

alarmTime = JSON.parse(localStorage.getItem("alarmObj")); //getting previous data
if (alarmTime == null) {
  alarmTime = [];
}

// getting current time

setInterval(() => {
  let d = new Date();
  hour = d.getHours();
  minute = d.getMinutes();
  // console.log(hour, minute);
}, 1000);

// displaying previous alarm

function display() {
  timeOutput.innerHTML = "";
  allAlarm = JSON.parse(localStorage.getItem("alarmObj"));
  if (allAlarm == undefined || allAlarm == null) {
    timeOutput.innerHTML = "";
  } else {
    allAlarm.forEach((element) => {
      hourOutput = element.hourStore;
      minuteOutput = element.minuteStore;
      ampmOutput = element.ampmStore;
      console.log(hourOutput, minuteOutput, ampmOutput);
      timeOutput.innerHTML += `<div class="show">
      <p>${hourOutput} : ${minuteOutput} ${ampmOutput}</p>
  </div>`;
    });
  }
}

display();

// setting new alarm

set.addEventListener("click", () => {
  // getting values
  let hourInput;
  let minuteInput = parseInt(minuteInputBox.value);
  let ampmInput = ampm.value;
  let hourI = parseInt(hourInputBox.value);
  // creating alarm time object
  if (hourI < 12 && hourI >= 0 && minuteInput <= 60 && minuteInput >= 0) {
    if (ampmInput == "pm") {
      hourInput = parseInt(hourInputBox.value) + 12;
    } else {
      hourInput = hourI;
    }

    let alarmT = {
      hourStore: hourInput,
      minuteStore: minuteInput,
      ampmStore: ampmInput,
    };
    console.log(alarmT);
    //   pushing alarm time object to localstorage
    alarmTime.push(alarmT);
    //   console.log(alarmTime);
    localStorage.setItem("alarmObj", JSON.stringify(alarmTime));
    display();
  }

  minuteInputBox.value = "";
  hourInputBox.value = "";
});

// pausing and restarting check after 1 minute when triggerd

function restartCheck() {
  console.log("check paused");
  setTimeout(() => {
    x.pause();
    checkFun();
  }, 60000);
}

//  checking alarm trigger

function checkFun() {
  let check = setInterval(() => {
    // getting alarm times from localstorage
    allAlarm = JSON.parse(localStorage.getItem("alarmObj"));
    // console.log(allAlarm);
    if (allAlarm != undefined || allAlarm != null) {
      allAlarm.forEach((element) => {
        if (element.hourStore == hour && element.minuteStore == minute) {
          x.loop = true;
          x.play();
          restartCheck();
          clearInterval(check);
        }
      });
    }
  }, 1000);
}

checkFun();
