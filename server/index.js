const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const { 
    getCompliment,
    getFortune,
    getGoals,
    addGoal,
    deleteGoal,
    updateDuration,
 } = require('./controller.js')


app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/goals", getGoals);
app.post("/api/goals", addGoal);
app.put("/api/goals/:id", updateDuration);
app.delete("/api/goals/:id", deleteGoal);


app.listen(4000, () => console.log("Server running on 4000"));
