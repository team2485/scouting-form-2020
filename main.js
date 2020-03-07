const scriptURL = 'https://script.google.com/macros/s/AKfycbwFYUNte7AJ37U1p6Re9p11O2NvxugyyagKCVsIn0Si7ohbfWU/exec'
const form = document.forms['mainForm']
requirements = Array.from(document.querySelectorAll('[required]'));
requirements.splice(0, 4);
var loadingElement = '<svg class="spinner" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><style>.spinner{width:1em; animation: rotator 5s linear infinite;transform-origin: center;overflow: hidden;}@keyframes rotator{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}.path {stroke-dasharray:270;stroke-dashoffset:0;transform-origin:center;stroke: #000000;animation: dash 1.4s ease-in-out infinite;}@keyframes dash{0%{stroke-dashoffset:265;}50%{stroke-dashoffset:65;transform:rotate(90deg);}100%{stroke-dashoffset: 265;transform:rotate(360deg);}}</style><circle class="path" fill="none" stroke-width="20" stroke-linecap="butt" cx="50" cy="50" r="40"></circle></svg>';

// var savedPositionPre = "";
var savedPositionAuto = "";
var savedPositionTele = "";
var savedPositionAutoList = "[]";
var savedPositionTeleList = "[]";
var autoNumber = 0;
var teleNumber = 0;
// var canvasPre = document.getElementById("posPre");
// var canvasPre2d = canvasPre.getContext("2d");
var canvasAuto = document.getElementById("posAuto");
var canvasAuto2d = canvasAuto.getContext("2d");
var canvasTele = document.getElementById("posTele");
var canvasTele2d = canvasTele.getContext("2d");
var fieldImage = new Image();
var flagImage = new Image(40, 40);
fieldImage.src = "resources/field.png";
flagImage.src = "resources/target.png";
fieldImage.onload = function () {
    // canvasPre2d.drawImage(fieldImage, 0, 0, canvasPre.scrollWidth, canvasPre.scrollHeight);
    canvasAuto2d.drawImage(fieldImage, 0, 0, canvasAuto.scrollWidth, canvasAuto.scrollHeight);
    canvasTele2d.drawImage(fieldImage, 0, 0, canvasTele.scrollWidth, canvasTele.scrollHeight);
}

function resizeCanvas(canvasID) {
    var canvas = document.getElementById(canvasID);
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollWidth * (362 / 691);
}
// resizeCanvas("posPre");
resizeCanvas("posAuto");
resizeCanvas("posTele");
canvasAuto.addEventListener("click", function (event) {
    resizeCanvas("posAuto");
    canvasAuto2d.drawImage(fieldImage, 0, 0, canvasAuto.scrollWidth, canvasAuto.scrollHeight);
    canvasAuto2d.drawImage(flagImage, event.pageX - canvasAuto.offsetLeft - flagImage.width / 2, event.pageY - canvasAuto.offsetTop - flagImage.height / 2, 40, 40);
    savedPositionAuto = "[" + ((event.pageX - canvasAuto.offsetLeft) / canvasAuto.width).toFixed(3) + ", " + ((event.pageY - canvasAuto.offsetTop) / canvasAuto.height).toFixed(3) + "]";
    document.getElementById("reqPosAuto").value = savedPositionAuto;
});
// canvasAuto.addEventListener("click", function (event) {
//     resizeCanvas("posAuto");
//     canvasAuto2d.drawImage(fieldImage, 0, 0, canvasAuto.scrollWidth, canvasAuto.scrollHeight);
//     canvasAuto2d.drawImage(flagImage, event.pageX - canvasAuto.offsetLeft - flagImage.width / 2, event.pageY - canvasAuto.offsetTop - flagImage.height / 2, 40, 40);
//     savedPositionAuto = ((event.pageX - canvasAuto.offsetLeft) / canvasAuto.width).toFixed(3) + ", " + ((event.pageY - canvasAuto.offsetTop) / canvasAuto.height).toFixed(3);
//     console.log(event);
//     console.log(savedPositionAuto);
// });
canvasTele.addEventListener("click", function (event) {
    resizeCanvas("posTele");
    canvasTele2d.drawImage(fieldImage, 0, 0, canvasTele.scrollWidth, canvasTele.scrollHeight);
    canvasTele2d.drawImage(flagImage, event.pageX - canvasTele.offsetLeft - flagImage.width / 2, event.pageY - canvasTele.offsetTop - flagImage.height / 2, 40, 40);
    savedPositionTele = ((event.pageX - canvasTele.offsetLeft) / canvasTele.width).toFixed(3) + ", " + ((event.pageY - canvasTele.offsetTop) / canvasTele.height).toFixed(3);
    console.log(event);
    console.log(savedPositionTele);
    document.getElementById("reqPosTele").value = savedPositionTele;
});

function increase(id){
    var ele = document.getElementById(id);
    if((Number(ele.value) || 0 )<Number(ele.max))
        ele.value++;
}
function decrease(id){
    var ele = document.getElementById(id);
    if((Number(ele.value) || 0 )>Number(ele.min))
        ele.value--;
    else
        ele.value=0;
}

// function parseAutoData() {
//     if (savedPositionAuto == "")
//         return;
//     savedPositionAuto = "[" + autoNumber + ", " + savedPositionAuto + ", " + Number(document.getElementById("upperAuto").value) + ", " + Number(document.getElementById("upperAutoFail").value) + "]"
//     if (savedPositionAutoList == "[]")
//         savedPositionAutoList = savedPositionAutoList.slice(0, -1).concat(savedPositionAuto + "]");
//     else
//         savedPositionAutoList = savedPositionAutoList.slice(0, -1).concat(", " + savedPositionAuto + "]");
//     canvasAuto2d.drawImage(fieldImage, 0, 0, canvasAuto.scrollWidth, canvasAuto.scrollHeight);
//     document.getElementById("upperAuto").value = null;
//     document.getElementById("upperAutoFail").value = null;
//     document.getElementById("reqPosAuto").value = savedPositionAutoList;
//     savedPositionAuto = "";
//     autoNumber++;
//     document.getElementById("autoSubmit").innerHTML = "Submit Shots (" + autoNumber + " sumbitted)";
// }

function parseTeleData() {
    if (savedPositionTele == "")
        return;
    savedPositionTele = "[" + teleNumber + ", " + savedPositionTele + ", " + Number(document.getElementById("upperTele").value) + ", " + Number(document.getElementById("upperTeleFail").value) + "]"
    if (savedPositionTeleList == "[]")
        savedPositionTeleList = savedPositionTeleList.slice(0, -1).concat(savedPositionTele + "]");
    else
        savedPositionTeleList = savedPositionTeleList.slice(0, -1).concat(", " + savedPositionTele + "]");
    canvasTele2d.drawImage(fieldImage, 0, 0, canvasTele.scrollWidth, canvasTele.scrollHeight);
    document.getElementById("upperTele").value = null;
    document.getElementById("upperTeleFail").value = null;
    document.getElementById("reqPosTele").value = savedPositionTeleList;
    savedPositionTele = "";
    teleNumber++;
    document.getElementById("teleSubmit").innerHTML = "Submit Shots (" + teleNumber + " submitted)";
}

form.addEventListener('submit', e => {
    e.preventDefault()
    document.getElementById("submitButton").disabled = true;
    document.getElementById("submitButton").innerHTML = "Submitting " + loadingElement;
    var data = new FormData(form); 
    data.append("Comments", "'" + document.getElementById("Comments").value.replace(/(\r\n|\n|\r)/gm, "; "));
    fetch(scriptURL, {
            method: 'POST',
            body: data
        })
        .then(response => (document.getElementById("submitButton").innerHTML = "Submitted", console.log('Success!', response), setTimeout(function () {
            alert("Success!"), location = top.location.href
        }, 10))) //setCookie("matchNumber", parseInt(getCookie("matchNumber"))+0),
        .catch(error => (console.error('Error!', error.message), alert("Something went wrong...")))
});
if (document.cookie.length >= 1) {
    document.getElementById("ScoutName").value = getCookie("scoutName");
    document.getElementById("ScoutTeamNumber").value = getCookie("scoutTeamNumber");
    //document.getElementById("MatchNumber").value = getCookie("matchNumber");
}
document.getElementById("ScoutName").addEventListener("keyup", function (event) {
    setCookie("scoutName", document.getElementById("ScoutName").value);
});
document.getElementById("ScoutTeamNumber").addEventListener("keyup", function (event) {
    setCookie("scoutTeamNumber", document.getElementById("ScoutTeamNumber").value);
});
// document.getElementById("MatchNumber").addEventListener("keyup", function (event) {
//     setCookie("matchNumber", document.getElementById("MatchNumber").value);
// });

document.getElementById("NoShow").addEventListener("change", function (event) {
    if (document.getElementById("NoShow").checked) {
        requirements.forEach(function (element) {
            element.required = false;
        });
    } else if (!(document.getElementById("NoShow").checked)) {
        requirements.forEach(function (element) {
            element.required = true;
        });
    }
});

document.getElementById("Breakdown").addEventListener("change", function (event) {
    if (document.getElementById("Breakdown").value == 1) {
        requirements.forEach(function (element) {
            element.required = false;
        });
        document.getElementById("Boosts").checked = false;
        document.getElementById("Fall").checked = false;
        dropDown();
    } else if (document.getElementById("NoShow").value == 0) {
        requirements.forEach(function (element) {
            element.required = true;
        });
    }
});

function starInput(inputName, val) {
    document.getElementById(inputName).value = val;
}

function scoreDisplay(bettingScore) {

    document.getElementById("myScore").innerHTML = bettingScore;
    //displays current amount of points a person can bet
}

function deselect(name) {
    //goes through and clears selected radio buttons with the given name
    var x = document.getElementsByName(name);
    for (var i = 0; i < x.length; i++) {
        x[i].checked = false;
    }
}

function dropDown(name, parent) {
    //causes menus to drop down when a button is selected
    var x = document.getElementsByName(name);
    if (parent.checked) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.toggle("fade-out");
            x[i].classList.toggle("fade-in");
            x[i].parentNode.insertBefore(document.createElement("br"), x[i].nextSibling);
        }
    } else {
        for (var i = 0; i < x.length; i++) {
            x[i].checked = false;
            x[i].classList.toggle("fade-out");
            x[i].classList.toggle("fade-in");
            x[i].parentNode.removeChild(x[i].nextElementSibling);
        }
    }
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    //checks if a cookie exists, if it does it returns it, if not it returns null
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
}
