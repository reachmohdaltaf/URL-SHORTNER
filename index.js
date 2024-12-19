const express = require("express")
const path = require('path')
const {connectToMongoDB} = require('./config/connect')
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const URL = require('./models/url')
const app = express();
const PORT = 3000
connectToMongoDB('mongodb+srv://reachmohdaltaf:ZMZs7KkbariG4i7x@urlshort0.zxj0y.mongodb.net/?retryWrites=true&w=majority&appName=urlshort0')
.then(()=>{
    console.log('mongo db connected')
})

app.set('view engine', 'ejs')
app.set('views', path.resolve('./view'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/test', async (req, res)=>{
    const allURls = await URL.find({ })
    return res.render('home',
        {
            urls: allURls
        }
    )
})
app.use('/url', urlRoute)
app.use('/', staticRoute)

app.get('/:shortId', async (req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push: {
        visitHistory:{
            timestamp: Date.now()
        }
    }})
    if (!entry) {
        // If no entry is found, return an error message or redirect to a default page
        return res.status(404).send("Short URL not found.");
    }
    res.redirect(entry.redirectURL)
});



app.listen(PORT, ()=>{console.log("Server is started at 3000")})