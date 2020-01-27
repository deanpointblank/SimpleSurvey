// URL variables for 'fetch'
const BASE_URL = 'http://localhost:3000'
//---> move to remove const USERS_URL = `${BASE_URL}/users`
const SURVEY_URL = `${BASE_URL}/surveys`
const QUESTIONS_URL = `${BASE_URL}/questions`
const surveyModal = document.getElementById('takeSurvey').querySelector('.modal-content')
const resultsModal = document.getElementById('surveyResults')

//--> html sections
const modalFooter = (id) => {
    return `
    <div class="modal-footer" id="${id}">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-primary submit-results" data-dismiss="modal">Submit</button>
    </div>
    `

}
//---> Survey class
class Survey {
    constructor(name, questionsArray, description) {
        this.name = name
        this.description = description
        this.questionsArray = questionsArray
    }

    questionFormatter(questionsArray, surveyId) {
        let formattedQuestions = [{survey_id: surveyId}]
        for(const question of questionsArray){
            formattedQuestions.push({name: question.name, type: question.type, values: question.values})
            // name: string, answer: string, survey_id: integer, type: string
        }
        fetch(QUESTIONS_URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                surveyQuestions: formattedQuestions
            })
        })
        .then(resp => resp.json())
        .then((questionsInfo) => {
            console.log(questionsInfo)
        })
        .catch((error) => {
            alert('Something is wrong with one of your question request! Check the log for more Details');
            console.log(error.message)
        })
    }

    sendRequest() {
        fetch(SURVEY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: this.name,
                description: this.description
            })
        })
        .then(resp => resp.json())
        .then((surveyInfo) => {
            console.log(surveyInfo)
            this.questionFormatter(this.questionsArray, surveyInfo.data.id)
        })
        .catch((error) => {
            alert('Whoops! we have an error on our hands check the log for more details');
            console.log(error.message)
        })
    }

    static deleteSurvey(id){
        if (confirm('Deleting this survey will also delete all results and questions. Are you sure?')){
            fetch(`${SURVEY_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            .catch((error) =>{
                alert('Something went wrong cheif! Check to log for more details');
                console.log(error.message)
            })
            document.getElementById(`${id}`).remove()
        }
    }
    static populate(id){
        fetch(`${SURVEY_URL}/${id}`)
            .then(resp => resp.json())
            .then((survey) => {
                console.log(survey)
                surveyModal.innerHTML = `
                <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">${survey.data.attributes.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <form class="form-popup" id="surveyForm">
                                <fieldset>
                                    <div id="questions">
                                    </div>
                                    ${modalFooter(survey.data.id)}
                                    
                                </fieldset>
                            </form>
                        </div>
                    </div>
                `
                Survey.questiondisplay(survey.data.attributes.questions)
                document.querySelector('.submit-results').addEventListener(
                    'click', (e) => {
                        e.preventDefault()
                        Survey.submitSurvey(document.getElementById('surveyForm'))
                    }
                )
                console.log(survey)
            })
    }

    static questiondisplay(questions){
        for (const question of questions){
            switch(question.question_type){
                case "open_ended":
                    Survey.openEnded(question)
                    break
                case "multiple_choice":
                    Survey.multipleChoice(question)
                    break
                case "true_false":
                    Survey.trueFalse(question)
            }
        }
    }

    static multipleChoice(question){
        const questionModal = document.getElementById('questions')
        let multi = `
        <div class="form-group multiple_choice">
            <label for="exampleFormControlSelect2">${question.name}</label>
            <select multiple class="form-control" id="question_${question.id}">
            </select>
        </div>
      `
      questionModal.innerHTML += multi

        for (const value of JSON.parse(question.answer)){
            document.getElementById(`question_${question.id}`).innerHTML += `
            <option>${value}</option>
            `
        }
    }

    static openEnded(question){
        const questionModal = document.getElementById('questions')
        questionModal.innerHTML += `
            <div class="form-group open_ended">
                <label for="${question.name}">${question.name}</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
            </div>
            `

    }

    static trueFalse(question){
        const questionModal = document.getElementById('questions')
        questionModal.innerHTML += `
        <div class="form-group true_false">
            <label>${question.name}</label>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" value="True" checked>
                <label class="form-check-label" for="exampleRadios1">
                True
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" value="False" checked>
                <label class="form-check-label" for="exampleRadios1">
                False
                </label>
            </div>
        </div>
        `
    }

    static submitSurvey(form){
        // Format survevy for PATCH request
        const id = form.querySelector('.modal-footer').id
        const allQuestions = form.querySelectorAll('.form-group')
        const formattedResults = []
        for (const question of allQuestions){
            const questionName = question.querySelector('label').innerText
            let questionValue
            switch (question.className.split(" ")[1]){                
                case "open_ended":
                    questionValue = question.querySelector('input').value
                    formattedResults.push({[questionName]: questionValue})
                    break
                case "true_false":
                    for (const value of question.querySelectorAll('.form-check-input')){
                        if (value.checked){
                            questionValue = value.value
                        }
                    }
                    formattedResults.push({[questionName]: questionValue})
                    break
                case "multiple_choice":
                    questionValue = question.querySelector('.form-control').value
                    formattedResults.push({[questionName]: questionValue})
                    break
            }

        }
        //Submit Results
        fetch(`${SURVEY_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
                id: id,
                results: formattedResults
            })
        })
        .then(resp => resp.json())
        .then((info) => console.log(info))
        .catch((error)=>{
            alert('Something went wrong updating the results. Check log for details')
            console.log(error.message)
        })
    }

    static results(id){
        fetch()

            /* <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Create Survey</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <form class="form-popup" id="myForm">
                                <fieldset>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Survey Name</label>
                                        <input type="text" class="form-control" id="SurveyName" placeholder="Enter Survey Name">
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleTextarea">Description</label>
                                        <textarea class="form-control description" id="exampleTextarea" rows="3"></textarea>
                                    </div>
                                    <div class="questions">
                                    </div>
                                    ${modalFooter}
                                    
                                </fieldset>
                            </form>
                        </div>
            </div> */

    }

}