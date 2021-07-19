const { Pool } = require('pg');

const pgPool = new Pool({
  user: 'scoutapi',
  host: 'scoutdevpga.cdadwflga6u4.us-east-1.rds.amazonaws.com',
  database: 'CCH_SCOUT_DEV',
  password: '$)0Ut@pI',
  port: 5432,
})

//jdbc:postgresql://scoutdevpga.cdadwflga6u4.us-east-1.rds.amazonaws.com:5432/CCH_SCOUT_DEV

const pgQuery = (query) => {

    pgPool.query(query, (err, res) => {
        console.log(err, res)
        pgPool.end()
      })

}

//pgQuery('SELECT * from app_properties');

module.exports.dbconfig = { pgQuery }