const express = require('express')
const app = express()
const { Server: ServerHttp } = require('http')
const { Server: ServerIo } = require('socket.io')

const MongoStore = require('connect-mongo');
const session = require('express-session')




app.use(express.static('public'))

//app
//login
app.get('/', (req, res) => {
	const sess = req.session;
	if (sess.username && sess.password) {
		res.write(`<h1>Bievenido ${sess.username} </h1><br>`)
		res.end('<a href=' + '/logout' + '>Cerrar Sesion</a >')

	} else {
		// var currentPath = process.cwd();

		res.sendFile(currentPath + "/login.html")
	}
})


app.post('/login', (req, res) => {
	const sess = req.session;
	const { username, password } = req.body;
	sess.username = username;
	sess.password = password
	res.redirect('/')
})
app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if (err) {
			return console.log(err)
		}
		res.redirect('/')
	})
})

//mongo-connect
const mongoConfig = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}


app.use(session({
	secret:  '123456',
	resave: true,
	saveUninitialized: true,

	store: MongoStore.create({ mongoUrl: `mongodb+srv://gabo2395:lebron23JAMES@cluster0.78xslog.mongodb.net/?retryWrites=true&w=majority`, mongoOptions: mongoConfig })

}))





const port = 4000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))