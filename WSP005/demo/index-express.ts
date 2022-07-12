import express from 'express'
import fs from 'fs'

const app = express() //類似 http.createServer()

app.use((req, res, next) => {
	console.log(req.url)
	console.log(req.headers)
	console.log(req.body)
	console.log(req.ip)

	next()
})

app.get('/index.html', async (req, res) => {
	res.send(await fs.promises.readFile('index.html', 'utf8'))
})

app.get('/index.html', async (req, res) => {
	res.send(await fs.promises.readFile('index.css', 'utf8'))
})

app.get('/index.html', async (req, res) => {
	res.send(await fs.promises.readFile('index.js', 'utf8'))
})

app.listen(8000)
