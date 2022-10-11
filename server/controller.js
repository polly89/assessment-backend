const getCompliment = (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    }

const getFortune = (req, res) => {
    const fortunes = [
        "A beautiful, smart, and loving person will be coming into your life.",
        "A golden egg of opportunity falls into your lap this month.",
        "A soft voice may be awfully persuasive.",
        "Allow compassion to guide your decisions.",
        "Curiosity kills boredom. Nothing can kill curiosity.",
        "Determination is what you need now.",  
    ];

    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];

    res.status(200).send(randomFortune);
}
/////////////////////////////////////////////////////////////////////////
const goals = require('./db.json')
let nextID = 5;

const getGoals = (req, res) => {
    res.status(200).send(goals)
}
const addGoal = (req, res) => {
    const { goal, duration, imageURL } = req.body;
    goals.push({
        goal,
        duration,
        imageURL,
        id:nextID,
    })
    nextID++
    res.status(200).send(goals);
}
const deleteGoal =(req, res)=> { 
    // let index = goals.findIndex(goal => goal[i].id === +req.params.id)
    // goals.splice(index, 1)
    // res.status(200).send(goals)
    const { id } = req.params;
    for(let i = 0; i < goals.length; i++){
        if(goals[i].id === +id){
            console.log(goals[i].id)
            goals.splice(i, 1);
            res.status(200).send(goals);
            return;
        }
    }
    res.status(400).send(goals);
}

const updateDuration = (req, res) => {
    const { id } = req.params;
    const { type } = req.body;

    const goalIndex = goals.findIndex((goal) => goal.id === +id);
    const goalToAdjust = goals[goalIndex]
    if ( type === 'plus' && goalToAdjust.duration < 60){
        goalToAdjust.duration++
    }else if(type === 'minus' && goalToAdjust.duration > 15){
        goalToAdjust.duration--
    }
    res.status(200).send(goals)
}
module.exports = {
    getCompliment,
    getFortune,
    getGoals,
    addGoal,
    deleteGoal,
    updateDuration,
}