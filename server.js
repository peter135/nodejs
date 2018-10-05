/**
 * Created by peter on 2018/10/1.
 */


const express = require ('express')
const app = express()
const articles = [{title:'Example'}]
const bodyParser = require('body-parser')
const Article = require('./db').Article
const read = require('node-readability')

app.set('port',process.env.port || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/articles',(req,res,next)=>{

	Article.all((err,articles)=>{
			  if(err) return next(err)
       	res.send(articles);

})

})

app.post('/articles',(req,res,next)=>{

	const url = req.body.url

	read(url,(err,result)=>{

		console.log(result)
	console.log(err)

if(err || !result) res.status(500).send('error download file')
		Article.create(

			{title:result.title,content:result.content },
			(err,article)=>{
					if(err) return next(err)
					res.send('ok')
			}
		)

	})

})

app.get('/articles/:id',(req,res,next)=>{

	const id = req.params.id;
	console.log('fetching:',id);
  Article.find(id,(err,article)=>{
		if(err) return next(err)
	  res.send(article);

   })

})


app.delete('/artiicles/:id',(req,res,next)=>{

	const id = req.params.id;
	console.log('deleting:',id);

	Article.delete(id,(err)=>{
		if(err) return next(err)
		res.send({message:'deleted'});

  })

})

app.listen(app.get('port'),()=>{

	console.log('app started on port',app.get('port'))
})

module.exports = app