const mongoose = require('mongoose');

mongoose
	.connect(process.env.DB_CONN)
	.then(() => {
		console.log('Connected to Database');
	})
	.catch((err) => console.log('Error connecting to databse : ', err));
