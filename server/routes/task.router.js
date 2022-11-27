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
  pool.query(queryTextDelete, [req.body.id])
    .then( result => {
      console.log('deleted task Id');
      // res.sendStatus(200)
    })
    .catch(err => { 
      console.log('ERROR: deleting task', err);
      res.sendStatus(500)
    })
});

module.exports = router;