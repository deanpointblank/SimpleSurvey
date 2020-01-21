// URL variables for 'fetch'
const BASE_URL = 'http://localhost:3000'
const USERS_URL = `${BASE_URL}/users`
const SURVEY_URL = `${BASE_URL}/surveys`
const QUESTIONS_URL = `${BASE_URL}/questions`

// Elemant variables to append to
const main = document.querySelector('main')

document.addEventListener("DOMContentLoaded", () => {
    fetch(USERS_URL)
    .then(resp => resp.json())
    .then(users => {
        const usersArray = users['data']
        console.log(usersArray)
        for(const user of usersArray){
            console.log(user['attributes'])
        }
    })
})