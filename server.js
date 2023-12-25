const express = require("express");
const app = express();
const {MongoClient} = require("mongodb");
const Port = process.env.Port || 8000;
 const articlesinfo ={
    "learn-react": {
        comments:[],
    },
    "learn-node": {
        comments:[],
    },
    "my-thoughts-on-learning-react":{
        comments: [],
    },
 }

app.use(express.json({ extended: false}));
app.get("/api/articles/:name", async (req,res) => {
    try {
        const artilename = req.params.name;
    const client = await MongoClient.connect("mongodb://127.0.0.1")
    const db = client.db("mernblog");
    const articlesinfo = await db
    .collection("articles")
    .findOne({name: artilename});
    res.status(200).json(articlesinfo);
    client.close();
    } catch (error) {
        res.status(500).json({message:"error connecting to database", error})
    }
    
})
app.post('/api/articles/:name/add-comments', (req,res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;
    articlesinfo[articleName].comments.push({ username, text});
    res.status(200).send(articlesinfo[articleName]);
})


app.listen(Port, () => console.log(`server started at port ${Port}`))