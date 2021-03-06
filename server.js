const { response } = require('express');
const express = require('express');
const mustacheExpress = require('mustache-express');



const bodyParser = require('body-parser') ;
const { Client } = require('pg') ;

const app = express();
const mustache = mustacheExpress();
mustache.cache = null ;

app.engine('mustache',mustache) ;
app.set('view engine','mustache') ; 

app.use(express.static('Public')) ;
app.use(bodyParser.urlencoded({extended:false}))

app.get('/hostel',(req,res)=>{
    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'hostel',
        password:'7408199514',
        port:5432,

    });
    
client.connect()
          .then(()=>{
              return client.query('SELECT * FROM pg');
             
          })
          .then((results)=>{
             // console.log('results?',results) ;
            res.render('hostel',results);
          });
        
}) ;
app.get('/',(req,res)=>{
    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'hostel',
        password:'7408199514',
        port:5432,

    });
    
client.connect()
          .then(()=>{
              return client.query('SELECT * FROM pg');
             
          })
          .then((results)=>{
             // console.log('results?',results) ;
            res.render('home',results);
          });
        
}) ;


app.get('/search',(req,res)=>{
    res.render('search'); 
}) ;

app.get('/add',(req,res)=>{
    res.render('add'); 
}) ;

app.post('/pg/add',(req,res)=>{
    console.log('post body',req.body) ;

    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'hostel',
        password:'7408199514',
        port:5432,

    });
    
client.connect()
          .then(()=>{
              console.log('DATABASE CONNECT SUCCESS') ;
              const sql = 'INSERT INTO pg (name,description,pricing,contactno,fooditems,rating,colleges,image1,image2,image3) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11)' ;
              const params = [req.body.name,req.body.description,req.body.pricing,req.body.contactno,req.body.fooditems,req.body.rating,req.body.colleges,req.body.image1,req.body.image2,req.body.image3] ;
              return client.query(sql,params) ;
          })
          .then((results)=>{
              //console.log('results?',results) ;
              res.redirect('/hostel') ;
          });
          
          
          

    
});
app.post('/hostel/delete/:id',(req,res)=>{
        const client = new Client({
            user:'postgres',
            host:'localhost',
            database:'hostel',
            password:'7408199514',
            port:5432,

         });
    
    client.connect()
          .then(()=>{
              const sql = 'DELETE FROM pg WHERE id=$1'
              const params = [req.params.id] ;
              return client.query(sql,params) ;
          })
          .then((results)=>{
             res.redirect('/hostel')  ;
             
          });

        })


app.get('/hostel/edit/:id',(req,res)=>{
            const client = new Client({
                user:'postgres',
                host:'localhost',
                database:'hostel',
                password:'7408199514',
                port:5432,
    
             });
        
        client.connect()
              .then(()=>{
                  const sql = 'SELECT * FROM pg WHERE id=$1'
                  const params = [req.params.id] ;
                  return client.query(sql,params) ;
              })
              .then((results)=>{
                 // console.log('results?',results) ;
                 res.render('hostel-edit',{hostel:results.rows[0]})  ;
                 
              });
    
            })
app.get('/view/:id',(req,res)=>{
                const client = new Client({
                    user:'postgres',
                    host:'localhost',
                    database:'hostel',
                    password:'7408199514',
                    port:5432,
        
                 });
            
            client.connect()
                  .then(()=>{
                      const sql = 'SELECT * FROM pg WHERE id=$1'
                      const params = [req.params.id] ;
                      return client.query(sql,params) ;
                  })
                  .then((results)=>{
                      //console.log('results?',results) ;
                     res.render('view',{view:results.rows[0]})  ;
                     
                  });
        
                });

app.post('/hostel-edit/:id',(req,res)=>{

    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'hostel',
        password:'7408199514',
        port:5432,

     });

client.connect()
      .then(()=>{
          const sql = 'UPDATE pg SET name=$1, description=$2,pricing=$3,contactno=$4,fooditems=$5,rating=$6,colleges=$7,image1=$8,image2=$9,image3=$10 WHERE id=$11'
          const params = [req.body.name,req.body.description,req.body.pricing,req.body.contactno,req.body.fooditems,req.body.rating,req.body.colleges,req.body.image1,req.body.image2,req.body.image3,req.params.id] ;
          return client.query(sql,params) ;
      })
      .then((results)=>{
        
         res.redirect('/hostel') ;
         
      });


})






app.listen(5001,()=>{
    console.log('Bro I am UP and Listening :)') ;

});