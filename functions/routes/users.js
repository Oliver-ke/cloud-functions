const router = require('express').Router();
const admin = require('firebase-admin');
const uuidv5 = require('uuid/v5');

admin.initializeApp();

router.get('/', (req, res) => {
	return admin.database().ref('/users').on(
		'value',
		(snapshot) => {
			return res.status(200).json(snapshot.val());
		},
		(error) => {
			console.error(error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	);
});

router.post('/', (req, res) => {
	const newUser = req.body;
	const id = uuidv5('https://envyuser-f1981.firebaseapp.com', uuidv5.URL);
	newUser.userId = id;
	admin
		.database()
		.ref(`/users/${id}`)
		.set(newUser)
		.then(() => {
			return res.status(201).json(newUser);
		})
		.catch((error) => {
			console.error(error);
			return res.status(500).json({ error: 'Internal server error' });
		});
});

module.exports = router;
