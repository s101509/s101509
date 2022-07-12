import fs from 'fs'
import http from 'http'

const server = http.createServer(async (req, res) => {
	console.log('有人打黎啦')
	console.log(req.url) //req既網址
	console.log(req.headers) //req既headers (25仔資訊)
	if (req.url === '/index.html') {
		res.write(await fs.promises.readFile('index.html'), 'utf8')
	} else if (req.url === '/index.css') {
		res.write(await fs.promises.readFile('index.css'), 'utf8')
	} else if (req.url === '/index.js') {
		res.write(await fs.promises.readFile('index.js'), 'utf8')
	} else {
		res.write('hi')
	}
	res.end()
})

server.listen(8000) //霸左8000個port 127.0.0.1:8000
