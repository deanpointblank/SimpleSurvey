// URL variables for 'fetch'
const BASE_URL = 'http://localhost:3000'
const USERS_URL = `${BASE_URL}/users`
const SURVEY_URL = `${BASE_URL}/surveys`
const QUESTIONS_URL = `${BASE_URL}/questions`

// Elemant variables to append to
const main = document.querySelector('main')
const userMenu = document.querySelector('.userMenu')
const li = document.createElement('li')

// initial fetch request to populate users
document.addEventListener("DOMContentLoaded", () => {
    fetch(USERS_URL)
    .then(resp => resp.json())
    .then(users => {
        const usersArray = users['data']
        console.log(usersArray)
        for(const user of usersArray){
            li.innerHTML = `<a href="#">${user['attributes']['name']}</a>`
            userMenu.appendChild(li)
        }
    })
})

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }