// Changes the avatar image to user's profile image
const avatarImage = document.querySelector('#avatar-img');
const cover = document.querySelector('#cover');
             
avatarImage.addEventListener('click',_=>cover.click());
    cover.addEventListener("change",_=>{
    let file = cover.files[0];
    let reader = new FileReader();
    reader.onload = function (){
    avatarImage.src = reader.result;
    }
    reader.readAsDataURL(file);
});

// To get the Current Date 
const date = new Date();
document.querySelector("#datetime").innerHTML = date.toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"}) ;

// Toggle the hamburger menu
function myFunction() {
    const navMenu = document.querySelector("#menu");
        if (navMenu.style.display === "block") {
            navMenu.style.display = "none";
        } else {
            navMenu.style.display = "block";
        }
}

// Select all the required variables
const closeBtn = document.querySelector('.close-btn');
const menu = document.querySelector('#menu');
const showAbout = document.querySelector('#show-about');
const modalAbout = document.querySelector('.modal-about');
const showInfo = document.querySelector('#show-info');
const modalInfo = document.querySelector('.modal-info');
const modalAboutClose = document.querySelector('#close-modal-about');
const modalInfoClose = document.querySelector('#close-modal-info');

// Close button on the menu navigation
closeBtn.addEventListener('click', function() {
    menu.style.display = 'none';
});

//Open Modals Info and About
showAbout.addEventListener('click', function() {
    modalAbout.classList.add('active');
    myFunction();
});

showInfo.addEventListener('click', function() {
    modalInfo.classList.add('active');
    myFunction();
});

//Close modals info and about
modalAboutClose.addEventListener('click', function() {
    modalAbout.classList.remove('active');
});

modalInfoClose.addEventListener('click', function() {
    modalInfo.classList.remove('active');
});

//chat body implementation and local storage functionality
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const msg = document.querySelector("#msg");
const chatBox = document.querySelector("#chatbox");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

//Input validation
const formValidation = () => {
    if (input.value === "") {
        msg.innerHTML = "Please enter your chat in the box above!";
    } else {
        msg.innerHTML = "";
        acceptData();
    }
};

let data = [{}];

let acceptData = () => {
    data.push({
        text: input.value,
    });
    localStorage.setItem("data", JSON.stringify(data));
    createChat();
};

let createChat = () => {
    chatBox.innerHTML = "";
        data.map((x, y) => {
        return (chatBox.innerHTML += `
        <div id=${y}>
          <p>${x.text}</p>
            <span class="options">
                <i onClick="editChat(this)" class="fas fa-edit"></i>
                <i onClick="deleteChat(this)" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `);
    });
    resetChat(); 
};

let deleteChat = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
};

let editChat = (e) => {
    input.value = e.parentElement.previousElementSibling.innerHTML;
    e.parentElement.parentElement.remove();
    deleteChat(e);
};

let resetChat = () => {
    input.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createChat();
})();
