// URL variables for 'fetch'
const BASE_URL = 'http://localhost:3000'
const USERS_URL = `${BASE_URL}/users`
const SURVEY_URL = `${BASE_URL}/surveys`
const QUESTIONS_URL = `${BASE_URL}/questions`

// Elemant variables to append to
const main = document.querySelector('main')
const userMenu = document.querySelector('.userMenu')
const mosaic = document.querySelector('.card-columns')

// Create elements
const li = document.createElement('li')
const card = document.createElement('div')


// initial fetch request to populate users
document.addEventListener("DOMContentLoaded", () => {
    fetch(USERS_URL)
        .then(resp => resp.json())
        .then(users => {
            const usersArray = users['data']
            console.log(usersArray)
            for (const user of usersArray) {
                li.innerHTML = `<a href="#">${user['attributes']['name']}</a>`
                userMenu.appendChild(li)
            }
        });
    addSurveys();
})

// fetch to populate survey mosaic
function addSurveys(){
    fetch(SURVEY_URL)
    .then(resp => resp.json())
    .then(surveys => {
        const surveysArray = surveys['data']
        console.log(surveysArray)
        for (const survey of surveysArray){
            mosaic.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${survey['attributes']['name']}</h5>
                    <p class="card-text">This card has supporting text below as a natural lead-in to additional content.
                    </p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
            `
        }
    })
}

// add/delete question fields to form
function addQuestionField(){
    // <label for="psw"><b>description</b></label>
    // <input type="password" placeholder="Enter Password" name="psw" required>
    // <br />
}


// miscelaneous 
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}