var version = "1.1";
var savedPosition = "";
const scriptURL = 'https://script.google.com/macros/s/AKfycbyCAs3KCDI02uotVGU69GqjfsVI60ho4qbJIeGDt-vxTM9kgs6F/exec'
const form = document.forms['mainForm']
requirements = Array.from(document.querySelectorAll('[required]')).splice(4);
var loadingElement = '<svg class="spinner" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><style>.spinner{width:1em; animation: rotator 5s linear infinite;transform-origin: center;overflow: hidden;}@keyframes rotator{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}.path {stroke-dasharray:270;stroke-dashoffset:0;transform-origin:center;stroke: #000000;animation: dash 1.4s ease-in-out infinite;}@keyframes dash{0%{stroke-dashoffset:265;}50%{stroke-dashoffset:65;transform:rotate(90deg);}100%{stroke-dashoffset: 265;transform:rotate(360deg);}}</style><circle class="path" fill="none" stroke-width="20" stroke-linecap="butt" cx="50" cy="50" r="40"></circle></svg>';

form.addEventListener('submit', e => {
    e.preventDefault()
    document.getElementById("submitButton").disabled = true;
    document.getElementById("submitButton").innerHTML = "Submitting "+loadingElement;
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => (document.getElementById("submitButton").innerHTML = "Submitted", console.log('Success!', response), setTimeout(function() {alert("Success!"), location=top.location.href},10))) //setCookie("matchNumber", parseInt(getCookie("matchNumber"))+0),
      .catch(error => (console.error('Error!', error.message), alert("Something went wrong...")))
});
if (document.cookie.length >= 1) {
    document.getElementById("ScoutName").value = getCookie("scoutName");
    document.getElementById("ScoutTeamNumber").value = getCookie("scoutTeamNumber");
    //document.getElementById("MatchNumber").value = getCookie("matchNumber");
}
document.getElementById("ScoutName").addEventListener("keyup", function(event) {
    setCookie("scoutName", document.getElementById("ScoutName").value);
});
document.getElementById("ScoutTeamNumber").addEventListener("keyup", function(event) {
    setCookie("scoutTeamNumber", document.getElementById("ScoutTeamNumber").value);
});
document.getElementById("MatchNumber").addEventListener("keyup", function(event) {
    setCookie("matchNumber", document.getElementById("MatchNumber").value);
});

document.getElementById("NoShow").addEventListener("change", function(event) {
    if (document.getElementById("NoShow").checked) {
        requirements.forEach(function(element) {
            element.required = false;
        });
        document.getElementById("Boosts").checked = false;
        document.getElementById("Fall").checked = false;
        dropDown();
    } else if (!(document.getElementById("NoShow").checked)) {
        requirements.forEach(function(element) {
            element.required = true;
        });
    }
});

document.getElementById("Breakdown").addEventListener("change", function(event) {
    if (document.getElementById("Breakdown").value==1) {
        requirements.forEach(function(element) {
            element.required = false;
        });
        document.getElementById("Boosts").checked = false;
        document.getElementById("Fall").checked = false;
        dropDown();
    } else if (document.getElementById("NoShow").value==0) {
        requirements.forEach(function(element) {
            element.required = true;
        });
    }
});

function starInput(inputName,val){
    document.getElementById(inputName).value = val;
}
function scoreDisplay(bettingScore) {

    document.getElementById("myScore").innerHTML = bettingScore;
    //displays current amount of points a person can bet
}

var score = getCookie("score");

if (score == "") {
    //if the cookie does not already exist
    var newId = 200;
    setCookie("score", newId, 20);
    score = newId;
}

function betting(bettingScore, name1, name2, bet) {
    //should add/take away points based on how much was bet, doesn't work yet
    if (name1 == name2) {
        //if the answer given to two inputs is the same
        score += bet;
    } else {
        score -= bet;
    }
}

function deselect(name) {
    //goes through and clears selected radio buttons with the given name
    var x = document.getElementsByName(name);
    for (var i = 0; i < x.length; i++) {
        x[i].checked = false;
    }
}

var dropDownMap = {
    "Boosts": "expanding1",
    "Fall": "expandingFall"
}

var conditionalRequrementsMap = {
    "Fall": "ExpandingFall"
}


function dropDown() {
    //causes menus to drop down when a button is selected
    for (var key in dropDownMap) {
        var element = document.getElementById(key);
        var hidden = document.getElementById(dropDownMap[key]);
        var innerQuestions = document.getElementsByName(conditionalRequrementsMap[key]);

        hidden.classList.remove("expand-after");
        for (i = 0; i < innerQuestions.length; i++) {
            innerQuestions[i].checked = false;
            innerQuestions[i].required = false;
        }
    }

    for (var key in dropDownMap) {
        var element = document.getElementById(key);
        var hidden = document.getElementById(dropDownMap[key]);
        var innerQuestions = document.getElementsByName(conditionalRequrementsMap[key]);
        if (element.checked) {
            hidden.classList.add("expand-after");
            for (i = 0; i < innerQuestions.length; i++) {
                innerQuestions[i].required = true;
            }
        } else if ((element.type == "text" || element.type == "number") && element.value != 0) {
            hidden.classList.add("expand-after");
            for (i = 0; i < innerQuestions.length; i++) {
                innerQuestions[i].required = true;
            }
        } else {
            continue;
        }
    }
    if (!(document.getElementById("Fall").checked)){
        document.getElementById("Fall1").checked = false;
        document.getElementById("Fall2").checked = false;
        document.getElementById("Fall3").checked = false;
        document.getElementById("Fall1").required = false;
    }
    else{
        document.getElementById("Fall1").required = true;
    }
    if(!(document.getElementById("Boosts").checked)){
        document.getElementById("Level1").value = "";
        document.getElementById("Level2").value = "";
        document.getElementById("Level3").value = "";
        document.getElementById("Level1D").value = "";
        document.getElementById("Level2D").value = "";
        document.getElementById("Level3D").value = "";
    }
}
//Set the URL to send a POST to. If on the server, go to the google script. Otherwise submit to the webpage

function openBetting(id1, id2) {
    var x = document.getElementById(id1);
    var y = document.getElementById(id2);
    x.classList.add("page-disappear");
    y.classList.remove("page-disappear");


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
