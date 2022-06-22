import express from 'express'
import fs from 'fs'
import expressSession from 'express-session'

const app = express()

app.use((req, res, next) => {
    try {
        console.log(req.url)
        console.log(req.headers)
        console.log(req.body)
        console.log(req.ip)

        next()
    }
    catch (e) {
        res.status(404);
        res.end();
    }
})

/* app.get('/index.html', async (req, res) => {
    res.send(await fs.promises.readFile('C:\Users\wytam\Documents\TeckyCMS\WSP005\public\index.html', 'utf8'))
})

app.get('/index.html', async (req, res) => {
    res.header('Content-Type', 'text/css')
    res.send(await fs.promises.readFile('C:\Users\wytam\Documents\TeckyCMS\WSP005\public\index.css', 'utf8'))
})

app.get('/index.html', async (req, res) => {
    res.send(await fs.promises.readFile('C:\Users\wytam\Documents\TeckyCMS\WSP005\public\index.js', 'utf8'))
}) */

app.use(express.static('./public'))


app.get('*', function(req, res){
    console.log(11223)
    res.status(404).render('404 not found');
  });
  
app.listen(8080)