document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#password").addEventListener("click", suggestedPassword);
document.querySelector("#username").addEventListener("change", desiredUsername);
document.querySelector("#states").addEventListener("change", displayCounties);
document.querySelector("body").style.backgroundSize = "cover";
document.querySelector("#submit").addEventListener("click", signUp);

displayStates();




async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}

async function displayStates() {
    let url = `https://csumb.space/api/allStatesAPI.php`;
    let data = await fetchData(url);

    let blankOpt = document.createElement("option");
    blankOpt.text = " - select a state - ";
    let option = document.createElement("option");
    document.querySelector("#states").appendChild(blankOpt);

    for (let i = 0; i < data.length; i++) {
        state = data[i];
        let option = document.createElement("option");
        option.value = state.usps;
        option.text = state.usps;
        document.querySelector("#states").appendChild(option);
    }
}

async function displayCounties() {
    let selection = document.querySelector("#states").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${selection}`;
    let data = await fetchData(url);

    document.querySelector("#counties").innerHTML = "";

    let countyFill = document.createElement("option");
    countyFill.text = " - select a county - ";

    document.querySelector("#counties").appendChild(countyFill);

    for (let i = 0; i < data.length; i++) {
        let county = data[i];
        let o1 = document.createElement("option");
        o1.value = county.county;
        o1.text = county.county;

        document.querySelector("#counties").appendChild(o1);
    }
}


// display city 
async function displayCity() {
    let zip = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zip}`;
    let data = await fetchData(url);

    if (data.city != undefined) {
        document.querySelector("#city").innerHTML = data.city;
        document.querySelector("#lat").innerHTML = data.latitude;
        document.querySelector("#lon").innerHTML = data.longitude;
    } else {
        document.querySelector("#city").innerHTML = "I don't know that zipcode";
        document.querySelector("#lat").innerHTML = "I don't know that latitude";
        document.querySelector("#lon").innerHTML = "I don't know that longitude"
    }
}



async function suggestedPassword() {

    console.log("password");
    let url = `https://csumb.space/api/suggestedPassword.php?length=8`;
    let suggestedPassword = await fetchData(url);
    if (suggestedPassword.password != undefined) {
        document.querySelector("#suggestedPassword").innerHTML = `Suggested Password: ${suggestedPassword.password}<br>`;
        document.querySelector("#suggestedPassword").style.color = "red";
    }
}

// desired username
async function desiredUsername() {
    let username = document.querySelector("#username").value;
    let flag = true;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let data = await fetchData(url);
    if (data.available !== undefined) {
        if (data.available === true) {
            document.querySelector("#users").innerHTML = "Username is available<br>";
            document.querySelector("#users").style.color = "green";
        } else {
            document.querySelector("#users").innerHTML = "Username is taken<br>";
            document.querySelector("#users").style.color = "red";
            flag = false;
        }
    }
    return flag;
}

function signUp(){
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const retypePassword = document.querySelector("#retypedPassword").value;

    // Check if the username is blank
    if (username === "") {
        document.querySelector("#mtUser").innerHTML =
"username cant be blank";
        document.querySelector("#mtUser").style.color = "red";
    } else{
        document.querySelector("#mtUser").innerHTML = "";
    }

    // Check if the password has at least 6 characters
    if (password.length < 6) {
        document.querySelector("#shortPass").innerHTML =
"Password must have at least 6 characters";
        document.querySelector("#shortPass").style.color = "red";
    } 
    else{
       document.querySelector("#shortPass").innerHTML = "";
    }
    
    

    if (retypePassword !== password) {
        document.querySelector("#notPass").innerHTML =
"Passwords do not match";
        document.querySelector("#notPass").style.color = "red";
    } else {
        document.querySelector("#notPass").innerHTML = " ";
    }

    // Submit the form if all the validations pass
    if (username !== "" && password.length >= 6 && retypePassword ===         password) {
    document.querySelector("form").submit();
    alert("Your form was submitted");
    } 
}

