

// Elemant variables to append to
const main = document.querySelector('main')
const userMenu = document.querySelector('.userMenu')
const mosaic = document.querySelector('.card-columns')
const questions = document.querySelector('.questions')

// Create elements
const li = document.createElement('li')
const div = document.createElement('div')

// fetch to populate survey mosaic
document.addEventListener('DOMContentLoaded', () => {
    fetch(SURVEY_URL)
        .then(resp => resp.json())
        .then(surveys => {
            const surveysArray = surveys['data']
            for (const survey of surveysArray) {
                mosaic.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${survey['attributes']['name']}</h5>
                    <p class="card-text survey_description">${survey['attributes']['description']}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
            `
            }
        })
})

// add/delete question fields to form
function addQuestionField() {
    questions.innerHTML += `
    <div class="form-group" id="${questions.children.length}"><br />
        <label for="question">Question Name</label>
        <input type="text" class="form-control questionName"></input>
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

function questionElementReplace(questionElement, replacedElement, questionType) {
    let keepValue = questionElement.querySelector('.questionName').value
    questionElement.classList += ` question ${questionType}`
    elementArray = questionElement.innerHTML.split('\n')
    elementArray.splice(3, 4, replacedElement)
    questionElement.innerHTML = elementArray.join('\n')
    questionElement.querySelector('.questionName').value = keepValue
}

function removeQuestionField(childnumber) {
    questions.children[childnumber].remove()
}

function addMultipleChoiceValues(childnumber) {
    const multipleChoiceValues = `
    <label for="questionType"> Values </label><br>
    <input type="text" class="form-control multiChoice"></input><br>
    <input type="text" class="form-control multiChoice"></input><br>
    <input type="text" class="form-control multiChoice"></input><br>
    <input type="text" class="form-control multiChoice"></input><br>
    `
    questionElementReplace(questions.children[childnumber], multipleChoiceValues, 'multiple_choice')
}
function addTrueFalseValues(childnumber) {
    questionElementReplace(questions.children[childnumber], null, 'true_false')
}
function addTextValue(childnumber) {
    questionElementReplace(questions.children[childnumber], null, 'open_ended')
}

// Submit Question

document.querySelector('.submit-question').addEventListener(
    'click', (e) => {
        e.preventDefault()
        const rawFormData = document.querySelector('.form-popup')
        const questionsArray = rawFormData.querySelectorAll('.question')
        let surveyTitle = document.querySelector('#SurveyName').value.toString()
        let allQuestions = []
        let surveyDescription = document.querySelector('.description').value.toString()
        questionsArray.forEach(question => {
            let questionvalues = []
            let questionType = question.classList['value'].split(' ')[2]
            let questionTitle = question.querySelector('.questionName').value
            if(questionType === "multiple_choice"){
                questionvalue = question.querySelectorAll('.multiChoice')
                questionvalue.forEach((q)=>{
                    questionvalues.push(q)
                })
            }
            allQuestions.push({name: questionTitle, type: questionType, values: questionvalues})
        });
        const survey = new Survey(surveyTitle, allQuestions, surveyDescription)
        survey.sendRequest()
        console.log(survey)
    }
)


/* Set the width of the sidebar */
// function nav() {
//     if (document.getElementById("mySidebar").style.width === "250px") {
//         document.getElementById("mySidebar").style.width = "0";
//         document.getElementById("main").style.marginLeft = "0";
//     } else {
//         document.getElementById("mySidebar").style.width = "250px";
//         document.getElementById("main").style.marginLeft = "250px";
//     }
// }