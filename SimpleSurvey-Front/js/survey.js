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
        //takes in questions
        // question title, question type, question values
        //formats in Json format depending on question type
        //adds to this.questions
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
    }
}