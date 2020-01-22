// URL variables for 'fetch'
const BASE_URL = 'http://localhost:3000'
const USERS_URL = `${BASE_URL}/users`
const SURVEY_URL = `${BASE_URL}/surveys`
const QUESTIONS_URL = `${BASE_URL}/questions`

// Elemant variables to append to
const main = document.querySelector('main')
const userMenu = document.querySelector('.userMenu')
const mosaic = document.querySelector('.card-columns')
const questions = document.querySelector('.questions')

// Create elements
const li = document.createElement('li')
const div = document.createElement('div')


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
function addSurveys() {
    fetch(SURVEY_URL)
        .then(resp => resp.json())
        .then(surveys => {
            const surveysArray = surveys['data']
            console.log(surveysArray)
            for (const survey of surveysArray) {
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
function addQuestionField() {
    questions.innerHTML += `
    <div class="form-group" id="${questions.children.length}"><br />
        <label for="question">Question Name</label>
        <input type="text" class="form-control"></input>
        <label for="questionType">Question Type</label><br>
        <button type="button" class="btn btn-secondary" onclick="addMultipleChoiceValues(${questions.children.length})"> Multiple Choice </button>
        <button type="button" class="btn btn-secondary" onclick="addTrueFalseValues(${questions.children.length})"> True or False </button>
        <button type="button" class="btn btn-secondary" onclick="addTextValue(${questions.children.length})"> Open Ended </button>
        <br /><button type="button" class="btn btn-secondary" onclick="removeQuestionField(${questions.children.length})"> remove question </button>
    </div>
    `
    // <label for="psw"><b>description</b></label>
    // <input type="password" placeholder="Enter Password" name="psw" required>
    // <br />
    console.log('clicked!')
}

function questionElementReplace(questionElement, replacedElement){
    elementArray = questionElement.innerHTML.split('\n')
    elementArray.splice(3, 4, replacedElement)
    questionElement.innerHTML = elementArray.join('\n')
}

function removeQuestionField(childnumber){
    questions.children[childnumber].remove()
}

function addMultipleChoiceValues(childnumber){
    const multipleChoiceValues = `
    <label for="questionType"> Values </label><br>
    <input type="text" class="form-control"></input><br>
    <input type="text" class="form-control"></input><br>
    <input type="text" class="form-control"></input><br>
    <input type="text" class="form-control"></input><br>
    `
    questionElementReplace(questions.children[childnumber], multipleChoiceValues)
}
function addTrueFalseValues(childnumber){
    const trueFalseValues = `
    <label for="questionType"> Answers </label><br>
    <input type="text" class="form-control"></input><br>
    <input type="text" class="form-control"></input><br>
    `
    questionElementReplace(questions.children[childnumber], trueFalseValues)
}
function addTextValue(childnumber){
    questionElementReplace(questions.children[childnumber])
}

// Submit Question

document.querySelector('.submit-question').addEventListener(
    'click', (e) => {
        e.preventDefault()
        const rawFormData = document.querySelector('.form-popup')

        fetch(SURVEY_URL)
    }
)


/* Set the width of the sidebar */
function nav() {
    if (document.getElementById("mySidebar").style.width === "250px") {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    } else {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
}