/**
 * Created by peter on 2018/10/1.
 */


const express = require ('express')
const app = express()
const articles = [{title:'Example'}]
const bodyParser = require('body-parser')

app.set('port',process.env.port || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/articles',(req,res,next)=>{

	res.send(articles);

})

app.post('/articles',(req,res,next)=>{

	const article = {title:req.body.title};
  articles.push(article);
	res.send(articles);

})

app.get('/articles/:id',(req,res,next)=>{

	const id = req.params.id;
	console.log('fetching:',id);
	res.send(articles[id]);

})


app.delete('/artiicles/:id',(req,res,next)=>{

	const id = req.params.id;
	console.log('deleting:',id);
  delete articels[id];
	res.send({message:'deleted'});

})

app.listen(app.get('port'),()=>{

	console.log('app started on port',app.get('port'))
})