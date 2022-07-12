import express from 'express'
import formidable from 'formidable'
import fs from 'fs'
import expressSession from 'express-session'

const uploadDir = 'uploads'
fs.mkdirSync('uploads', { recursive: true })

declare module 'express-session' {
	interface SessionData {
		isAdmin: boolean
	}
}

const form = formidable({
	uploadDir: uploadDir,
	keepExtensions: true,
	maxFiles: 1,
	maxFileSize: 20 * 1024 * 1024 ** 2, // the default limit is 20MB
	filter: (part) => part.mimetype?.startsWith('image/') || false
})

if (!fs.existsSync('memos.json')) {
	fs.writeFileSync('memos.json', '[]')
}

const app = express()

app.use((req, res, next) => {
	console.log(req.ip + ': ' + req.url)
	next()
})

app.use(express.urlencoded())
app.use(express.urlencoded({ extended: false }));
app.use(
	expressSession({
		secret: 'very long secret',
		resave: true,
		saveUninitialized: true
	})
)

app.use(express.static('public'))

app.get('/getMemo', async (req, res) => {
	res.send(await fs.promises.readFile('memos.json', 'utf8'))
})

app.post('/addMemo', (req, res) => {
	form.parse(req, async (err, fields, files) => {
		let memos
		try {
			memos = JSON.parse(await fs.promises.readFile('memos.json', 'utf8'))
		} catch (err) {
			console.error(err)
			res.status(500).send('Internal Server Error')
			return
		}

		memos.push({
			content: fields.content,
			photo:
				files.photo != null && !Array.isArray(files.photo)
					? files.photo.newFilename
					: null
		})

		await fs.promises.writeFile('memos.json', JSON.stringify(memos))

		if (req.session['isAdmin']) {
			res.redirect('/admin.html')
		} else {
			res.redirect('/')
		}
	})
})

app.post('/register', async (req, res) => {
	let users
	try {
		users = JSON.parse(await fs.promises.readFile('users.json', 'utf8'))
	} catch (err) {
		console.error(err)
		res.status(500).send('Internal Server Error')
		return
	}

	for (const user of users) {
		if (user.username.trim() === req.body.username.trim()) {
			res.redirect('/?error=重覆username')
			return
		}
	}

	users.push({
		username: req.body.username.trim(),
		password: req.body.password.trim()
	})

	await fs.promises.writeFile('users.json', JSON.stringify(users))

	res.redirect('/')
})

app.post('/login', async (req, res) => {
	try {
		const users = JSON.parse(
			await fs.promises.readFile('users.json', 'utf8')
		)
		for (const user of users) {
			if (
				req.body.username === user.username &&
				req.body.password === user.password
			) {
				req.session['isAdmin'] = true
				res.redirect('/admin.html')
				return
			}
		}
	} catch (err) {
		console.log(err)
		res.redirect('/')
		return
	}

	setTimeout(() => {
		res.redirect('/')
	}, 3000)
})

app.post('/logout', (req, res) => {
	req.session['isAdmin'] = false
	res.redirect('/')
})

const isLogin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.session['isAdmin']) {
		next()
	} else {
		res.redirect('/')
	}
}

app.post('/deleteMemo', isLogin, async (req, res) => {
	const deleteId = req.body.memoId

	let memos
	try {
		memos = JSON.parse(await fs.promises.readFile('memos.json', 'utf8'))
	} catch (err) {
		console.error(err)
		res.status(500).send('Internal Server Error')
		return
	}

	memos.splice(deleteId, 1)

	await fs.promises.writeFile('memos.json', JSON.stringify(memos))

	res.redirect('/admin.html')
})

app.use(isLogin, express.static('private'))

app.listen(8000, () => {
	console.log('Listening on port 8000')
})

/* import express from 'express'
import expressSession from 'express-session'
import formidable from 'formidable'
import fs from 'fs'

const app = express()
const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

declare module "express-session" {
    interface SessionData {
        isAdmin: boolean;
        user: boolean;
    }
}
const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 20 * 1024 * 1024 ** 2,
    filter: part => part.mimetype?.startsWith('image/') || false,
})
app.use(expressSession({
    secret: 'very long secret',
    saveUninitialized: true,
    resave: true
}))

app.use(express.static('public'))

app.use(express.urlencoded())

app.post('/login', async (req, res) => {
    const user = JSON.parse(await fs.promises.readFile('users.json', 'utf8'))
    let username = req.body.username;
    let password = req.body.password;



    let match = user.find((element: any) => {
        return element.username == username
    })

    console.log(match)

    if (match) {
        if (match.password == password) {
            req.session['isAdmin'] = true;
            res.redirect('/admin.html')
        } else {
            res.send('incorrect username / password');
        }
    } else {
        res.send('incorrect username / password');
    }
})

const isLogin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.session['isAdmin']) {
        next()
    } else {
        res.send('/index.html')
    }
}

app.post('/addTask', isLogin, (req, res) => {
    console.log(req.body)
    form.parse(req, async (err, fields, files) => {
        console.log(fields, files)

        let tasks: {
            task: string,
            photo: string
        }[]
        try {
            tasks = JSON.parse(await fs.promises.readFile('tasks.json', 'utf8'))
        } catch (err) {
            console.error(err);
            res.send('發生內部問題～～');
            return;
        }

        let fileName: string | null = null
        if (files.photo != null && !Array.isArray(files.photo)) {
            fileName = files.photo.newFilename
        }

        await fs.promises.writeFile('tasks.json', JSON.stringify([
            ...tasks,
            { task: fields.task, photo: fileName }
        ]))

        res.send('ok')
    });
})

app.use(isLogin, express.static('private'))

app.listen(8000, function () {
    console.log('Listening on port 8000')
}) */
