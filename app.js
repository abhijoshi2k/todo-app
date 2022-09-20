require('dotenv').config();

const express = require('express');
const app = express();

require('./connections/database');

const Item = require('./models/Item');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
	// get distinct values of category
	const categories = await Item.distinct('category');

	res.render('categories', { categories: categories });
});

app.get('/all-items', async (req, res) => {
	try {
		const items = await Item.find();
		res.render('list', {
			items: items,
			listName: 'All Items',
			allItems: true
		});
	} catch (err) {
		console.log(err);
		res.send('Error');
	}
});

app.get('/category/:category', async (req, res) => {
	const category = req.params.category;
	try {
		const items = await Item.find({ category: category });
		res.render('list', {
			items: items,
			listName: category,
			allItems: false
		});
	} catch (err) {
		console.log(err);
		res.send('Error');
	}
});

app.post('/', async (req, res) => {
	try {
		const item = new Item({
			content: req.body.content,
			category: req.body.category
		});
		await item.save();
		res.redirect('/category/' + encodeURIComponent(req.body.category));
	} catch (err) {
		console.log(err);
		res.send('Error');
	}
});

app.patch('/', async (req, res) => {
	try {
		await Item.updateOne(
			{ _id: req.body.id },
			{ strikethrough: req.body.checked }
		);
		res.status(200).send({ message: 'Success' });
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: 'Error' });
	}
});

app.delete('/', async (req, res) => {
	try {
		await Item.deleteOne({ _id: req.body.id });
		res.status(200).send({ message: 'Success' });
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: 'Error' });
	}
});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
