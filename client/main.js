const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    }).catch(error => console.log(error))
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
         .then(res => {
            const data = res.data;
            alert (data);
         }).catch(error => console.log(error))
}
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)

///////////////////////////////////////////////////////////////

const goalsContainer = document.querySelector('#goals-container')
const form = document.querySelector('form')

const baseURL =`http://localhost:4000/api/goals`

const getGoals = () => axios.get(baseURL).then(goalsCallback).catch(error => console.log(error))
const createGoal = body => axios.post(baseURL, body).then(goalsCallback).catch(error => console.log(error))
const deleteGoal = id => axios.delete(`${baseURL}/${id}`).then(goalsCallback).catch(error => console.log(error))
const updateDuration = (id, type)=> axios.put(`${baseURL}/${id}`, {type}).then(goalsCallback).catch(error)

const goalsCallback = ({ data: goals }) => displayGoals(goals)

function displayGoals(arr){
    goalsContainer.innerHTML=``
    for(let i = 0; i < arr.length; i++){
        createGoalCard(arr[i])
    }
}
function createGoalCard(id) {
    const goalCard = document.createElement('div')
    goalCard.classList.add('goal-card')

    goalCard.innerHTML = `<img alt='Inspirational image' src=${id.imageURL} class="goal-cover"/>
    <p class="goal">${id.goal}</p>
    <div class="btns-container">
        <button onclick="updateDuration(${id}, 'minus')">-</button>
        <p class="goal-duration">${id.duration} mins</p>
        <button onclick="updateDuration(${id}, 'plus')">+</button>
    </div>
    <button onclick="deleteGoal(${id})">delete</button>
    `
    goalsContainer.appendChild(goalCard)
}

function submitHandler(e){
    e.preventDefault()

    let goal = document.querySelector('#goal')
    let duration = document.querySelector('input[name="duration"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        goal: goal.value,
        duration: duration.value,
        imageURL: imageURL.value
    }
    createGoal(bodyObj)

    goal.value=''
    duration.checked = false
    imageURL.value=''
}


form.addEventListener('submit', submitHandler)

getGoals()