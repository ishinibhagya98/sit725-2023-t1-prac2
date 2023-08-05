const express = require("express");
const cors = require("cors");
const app = express();
const port = 3300;

app.use(cors());
const jokes = [
    "Why did the tomato turn red? Because it saw the salad dressing!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the bicycle fall over? Because it was two-tired!",
    "Why did the coffee file a police report? It got mugged!",
    "Why did the belt go to jail? For holding up the pants!",
];

app.get("/jokes", (req, res) => {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.send(randomJoke);
});

app.get("/add/:num1/:num2", (req, res) => {
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    const sum = num1 + num2;
    res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public_html/index.html");
});

// Import sub-directory
app.use(express.static(__dirname + "/public_html"));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});