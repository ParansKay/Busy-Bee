const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query = `SELECT * FROM list`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all tasks', err);
      res.sendStatus(500)
    })

});

router.delete('/:id', (req, res) => {
  // DELETE route code here
  console.log( 'in DELETE ROUTE with:', req.params.id);
  const queryTextDelete = `DELETE FROM "list" WHERE "id"=$1;`
  pool.query(queryTextDelete, [req.params.id])
    .then( result => {
      console.log('deleted task Id');
      // res.sendStatus(200)
    })
    .catch(err => { 
      console.log('ERROR: deleting task', err);
      res.sendStatus(500)
    })
});

router.post('/', (req, res) => {
  //post route code goes here
 console.log(req.body);
 // RETURNING "id" will give us back the id of the created movie
 const insertTaskQuery = `
 INSERT INTO "list" ("task", "notes")
 VALUES ($1, $2)
 RETURNING "id";`

 // FIRST QUERY MAKES ACTIVITY
 pool.query(insertTaskQuery, [req.body.task, req.body.notes])
 .then(result => {
   console.log('New task Id:', result.rows[0].id); //ID IS HERE!
       //Now that both are done, send back success!
       res.sendStatus(201);
     }).catch(err => {
       // catch for second query
       console.log(err);
       res.sendStatus(500)
     })
})

module.exports = router;