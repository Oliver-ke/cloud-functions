const router = require('express').Router();
const admin = require('firebase-admin');
const uuidv5 = require('uuid/v5');

admin.initializeApp();

router.get('/', (req, res) => {
	return admin.database().ref('/users').on(
		'value',
		(snapshot) => {
			return res.status(200).send(snapshot.val());
		},
		(error) => {
			console.error(error);
			return res.status(500).send('Oh no! Error: ' + error);
		}
	);
});

router.post('/', (req, res) => {
	const newUser = req.body;
	newUser.id = uuidv5('https://envyuser-f1981.firebaseapp.com', uuidv5.URL);
	admin
		.database()
		.ref('/users')
		.push(newUser)
		.then(() => {
			return res.status(201).send(newUser);
		})
		.catch((error) => {
			console.error(error);
			return res.status(500).send('Oh no! Error: ' + error);
		});
});

module.exports = router;