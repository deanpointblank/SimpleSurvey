// URL variables for 'fetch'
const BASE_URL = 'http://localhost:3000'
//---> move to remove const USERS_URL = `${BASE_URL}/users`
const SURVEY_URL = `${BASE_URL}/surveys`
const QUESTIONS_URL = `${BASE_URL}/questions`

class Survey{
    constructor(name, questionsArray){
        this.name = name
        this.questionsArray = questionsArray
        console.log(this)
    }

    questionFormatter(questionsArray){
        //takes in questions
        // question title, question type, question values
        //formats in Json format depending on question type
        //adds to this.questions
    }

    static sendRequest(){
        fetch(SURVEY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                trainer_id: trainerId
            })
        })
    }
}