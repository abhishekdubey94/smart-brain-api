const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey:"c6d904fb60044004a613d4a89922ed9a"
});

const handleApiCall = (req,res)=>	{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data=>{
		res.json(data);
	}).catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req,res,db)=>{
	const {id} = req.body;

	db('users').increment('entries',1).where({
		id:id
	}).returning('entries').then(entries=>{
		res.json(entries[0]);
	}).catch(err=>
	res.status(400).json(err));
}

module.exports = {
	handleImage:handleImage,
	handleApiCall:handleApiCall
}