import express from "express";
const app = express();
import fetch from "node-fetch"
import cors from "cors"
const PORT=3005;


app.use(express.json());
app.use(cors());


app.get('/api', async function(req,res){
    try{
        const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=f710e4c470cc49ff9667ec89481fdee4"); //2-3 seconds
        if(!response.ok){
            res.status(response.status).json({
                message : "invalid resposne"
            })
            console.log("response error")
            return;
        }
        else{
        const data = await response.json();
        console.log(data.articles)
        res.send(data.articles);
        }
    }
    catch(e){
        res.status(404).json({
            error: "404 error"
        })
        console.log(e.message)
        
    }
})

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})