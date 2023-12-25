const express = require("express");
const app = express();
const {MongoClient} = require("mongodb");
const Port = process.env.Port || 8000;
const cors = require("cors")
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
app.use(cors())
app.use(express.json({ extended: false}));
const withDB = async(operation,res) => {
    try {
        
    const client = await MongoClient.connect("mongodb://127.0.0.1")
    const db = client.db("mernblog");
    await operation(db);
    client.close();
    } catch (error) {
        res.status(500).json({message:"error connecting to database", error})
    }
}
app.get("/api/articles/:name", async (req,res) => {
    withDB(async (db)=>{
        const artilename = req.params.name;
   
    
    const articlesinfo = await db
    .collection("articles")
    .findOne({name: artilename});
    res.status(200).json(articlesinfo);
    },res)
        
    
    
})
app.post('/api/articles/:name/add-comments', (req,res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;
    withDB(async (db) => {
        const articlesinfo =await db.collection('articles').findOne({ name: articleName});
        await db.collection('articles').updateOne({name: articleName},
            {
                $set: {
                    comments: articlesinfo.comments.concat({ username, text}),
                },
            })
            const updateArticleInfo = await db.collection("articles")
            .findOne({ name: articleName});
            res.status(200).json(updateArticleInfo);
    },res)
})


app.listen(Port, () => console.log(`server started at port ${Port}`))