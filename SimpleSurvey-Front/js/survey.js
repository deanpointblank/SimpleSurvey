// URL variables for 'fetch'
const BASE_URL = 'http://localhost:3000'
//---> move to remove const USERS_URL = `${BASE_URL}/users`
const SURVEY_URL = `${BASE_URL}/surveys`
const QUESTIONS_URL = `${BASE_URL}/questions`
const surveyModal = document.getElementById('takeSurvey').querySelector('.modal-content')
const resultsModal = document.getElementById('surveyResults').querySelector('.modal-content')

//--> html sections
const modalFooter = (id) => {
    return `
    <div class="modal-footer" id="${id}">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-primary submit-results" data-dismiss="modal">Submit</button>
    </div>
    `

}

const charts = document.getElementById('charts')

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
            getCards()
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
        <div class="form-group multiple_choice" id=${question.id}>
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

    static trueFalse(question){
        const questionModal = document.getElementById('questions')
        questionModal.innerHTML += `
        <div class="form-group true_false" id="${question.id}">
            <label>${question.name}</label>
            <div class="form-check" id="question_${question.id}">
                <input class="form-check-input" type="radio" name="${question.name}" value="True">
                <label class="form-check-label" for="${question.name}">
                True
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="${question.name}" value="False">
                <label class="form-check-label" for="${question.name}">
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
            const questionName = question.getAttribute('id')
            let questionValue
            switch (question.className.split(" ")[1]){             
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
        const parsedResults = JSON.stringify(formattedResults)
        //Submit Results
        fetch(`${QUESTIONS_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
                id: id,
                results: parsedResults
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
        fetch(`${SURVEY_URL}/${id}`)
            .then(resp => resp.json())
            .then((survey) => {
                console.log(survey)
                resultsModal.innerHTML = `
                <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">${survey.data.attributes.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid" id="charts">
                        </div>
                    </div>
                `

                Survey.parseResults(survey.data)
            })
    }

    static parseResults(data){
        let questionData = data.attributes.questions
        for(const question of questionData){
            const kv = {}
            for (let ii of question.results.split(',')){
                ii = ii.trim()
                if(!!kv[ii]){
                    kv[ii] += 1
                } else {
                    kv[ii] = 1
                }
            }
            
            const chart = document.createElement('canvas')
            chart.setAttribute("id", `${question.id}`)
            chart.getContext('2d')
            document.getElementById('charts').appendChild(chart)

            let pieChart = new Chart(chart, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(kv),
                    datasets:[{
                        label: question.name ,
                        data: Object.values(kv),
                        backgroundColor: ['red', 'orange', 'pink', 'black'],
                        hoverBorderWidth: 5,
                        hoverBorderColor: 'red'
                    }],
                },
                options: {
                    title: {
                        display: true,
                        text: question.name,
                        fontSize: 25
                    },
                    legend:{
                        position: 'bottom'
                    }
                }
            })



        }


    }

}