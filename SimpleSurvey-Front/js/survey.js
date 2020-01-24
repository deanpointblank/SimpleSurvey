// URL variables for 'fetch'
const BASE_URL = 'http://localhost:3000'
//---> move to remove const USERS_URL = `${BASE_URL}/users`
const SURVEY_URL = `${BASE_URL}/surveys`
const QUESTIONS_URL = `${BASE_URL}/questions`

class Survey {
    constructor(name, questionsArray, description) {
        this.name = name
        this.description = description
        this.questionsArray = questionsArray
    }

    questionFormatter(questionsArray) {
        for(const question of questionsArray){
            // name: string, answer: string, survey_id: integer, type: string
            fetch(QUESTIONS_URL, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: question.name,
                    answer: question.values,
                    survey_id: this.id,
                    question_type: question.type

                })
            })
            .then(resp => resp.json())
            .then((questionInfo) => {
                console.log(questionInfo)
            })
            .catch((error) => {
                alert('Something is wrong with one of your question request! Check the log for more Details');
                console.log(error.message)
            })
        }
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
            this.id = surveyInfo.data.id
        })
        .catch((error) => {
            alert('Whoops! we have an error on our hands check the log for more details');
            console.log(error.message)
        })
        this.questionFormatter(this.questionsArray)
    }
}