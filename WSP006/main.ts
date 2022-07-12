import express from 'express'
import expressSession from 'express-session'
import formidable from 'formidable'
import fs from 'fs'

const app = express()

app.use(
	expressSession({
		//記低個user
		secret: 'very long secret',
		saveUninitialized: true,
		resave: true
	})
)

app.use(express.static('public'))

app.use(express.urlencoded())

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

const form = formidable({
	uploadDir,
	keepExtensions: true,
	maxFiles: 1,
	maxFileSize: 20 * 1024 * 1024 ** 2, // the default limit is 20MB
	filter: (part) => part.mimetype?.startsWith('image/') || false // 並非萬能
})

app.post('/login', (req, res) => {
	console.log(req.body)
	if (req.body.username === 'admin' && req.body.password === '12345') {
		req.session['isAdmin'] = true
		res.redirect('/admin.html')
	} else if (req.body.username === 'alex' && req.body.password === '12345') {
		req.session['isSuperAdmin'] = true
		res.redirect('/admin.html')
	} else {
		res.send('incorrect password')
	}
})

app.post('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/')
	})
})

// 自制守衛
const isLogin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.session['isAdmin']) {
		next()
	} else {
		res.send('閒人與小狗不得進入')
	}
}

app.post('/addTask', isLogin, (req, res) => {
	console.log(req.body)
	form.parse(req, async (err, fields, files) => {
		console.log(fields, files)

		let tasks: {
			task: string
			photo: string
		}[]
		try {
			tasks = JSON.parse(await fs.promises.readFile('tasks.json', 'utf8'))
		} catch (err) {
			// tasks = [] // 唔一定係好做法⋯⋯一有問題就全部紀錄 gg
			console.error(err)
			res.send('發生內部問題～～') // gracefully fail
			return
		}

		let fileName: string | null = null
		if (files.photo != null && !Array.isArray(files.photo)) {
			fileName = files.photo.newFilename
		}

		await fs.promises.writeFile(
			'tasks.json',
			JSON.stringify([...tasks, { task: fields.task, photo: fileName }])
		)

		res.send('ok')
	})
})

const isLoginDynamic = (role: string) => {
	return (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		if (req.session['is' + role]) {
			next()
		} else {
			res.send('閒人與小狗不得進入')
		}
	}
}

app.get('/topSecret', isLoginDynamic('SuperAdmin'), (req, res) => {
	res.send('IT小狗喺九龍灣')
})

app.get('/secret', isLoginDynamic('Admin'), (req, res) => {
	res.send('IT小狗喺九龍灣')
})

app.get('/secret2', isLogin, (req, res) => {
	res.send('IT小狗喺九龍灣')
})

app.get('/secret3', isLogin, (req, res) => {
	res.send('IT小狗喺九龍灣')
})

app.use(isLogin, express.static('private'))

app.listen(8000, function () {
	console.log('Listening on port 8000')
})
