

// Elemant variables to append to
const main = document.querySelector('main')
const userMenu = document.querySelector('.userMenu')
const mosaic = document.querySelector('.card-columns')
const questions = document.querySelector('.questions')

// Create elements
const li = document.createElement('li')
const div = document.createElement('div')

// fetch to populate survey mosaic
function getCards(){
    mosaic.innerHTML = ''
    fetch(SURVEY_URL)
        .then(resp => resp.json())
        .then(surveys => {
            const surveysArray = surveys['data']
            for (const survey of surveysArray) {
                mosaic.innerHTML += `
            <div class="card" id="${survey.id}">
                <div class="card-body">
                    <h5 class="card-title">${survey['attributes']['name']}</h5>
                    <p class="card-text survey_description">${survey['attributes']['description']}</p>
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#takeSurvey" onclick="Survey.populate(${survey.id})"> Take Survey </button>
                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#surveyResults" onclick="Survey.results(${survey.id})"> See Results </button>
                    <br /><br />
                    <button type="button" class="btn btn-primary" onclick="Survey.deleteSurvey(${survey.id})"> Delete Survey </button>

                </div>
            </div>
            `
            }
        })
}
getCards()
// add/delete question fields to form

// -> Attempting to keep values as you add more questions.
// const isValue = (num) => {
//     if (!!document.querySelectorAll('.questionName')[num - 1]){
//         //debugger
//         return document.querySelectorAll('.questionName')[num - 1].value
//     } else {
//         return ""
//     }
// }

function addQuestionField() {
    questions.innerHTML += `
    <div class="form-group" id="${questions.children.length}"><br />
        <label for="question">Question Name</label>
        <input type="text" class="form-control questionName" ></input>
        <label for="questionType">Question Type</label><br>
        <button type="button" class="btn btn-secondary" onclick="addMultipleChoiceValues(${questions.children.length})"> Multiple Choice </button>
        <button type="button" class="btn btn-secondary" onclick="addTrueFalseValues(${questions.children.length})"> True or False </button>
        <br />
        <button type="button" class="btn btn-secondary" onclick="removeQuestionField(${questions.children.length})"> remove question </button>
    </div>
    `
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
                    questionvalues.push(q.value)
                })
            }
            allQuestions.push({name: questionTitle, type: questionType, values: questionvalues})
        });
        const survey = new Survey(surveyTitle, allQuestions, surveyDescription)
        survey.sendRequest()
        document.querySelector('#SurveyName').value = ''
        document.querySelector('.description').value = ''
        for (i in questionsArray){
            removeQuestionField(i)
        }
    }
)

// Sort surveys

function sortSurvey(){
    // grab each survey div
    // sort by name
    // place back in to dom
    // let cards = document.querySelectorAll('.card')
    let cardArray = []
    document.querySelectorAll('.card').forEach((card)=> {cardArray.push(card)})
    mosaic.innerHTML = ""
    cardArray.sort((a, b) => {
        if(a.querySelector('.card-title').innerHTML < b.querySelector('.card-title').innerHTML) {return -1;}
        if(a.querySelector('.card-title').innerHTML > b.querySelector('.card-title').innerHTML) {return 1;}
        return 0;
    })
    for (card of cardArray){
        debugger
        mosaic.innerHTML += card.outerHTML
    }
     //sort into into new array
     // loop through each item and place in dom
     //card-title

}
// users.sort(function(a, b){
//     if(a.firstname < b.firstname) { return -1; }
//     if(a.firstname > b.firstname) { return 1; }
//     return 0;
// })
