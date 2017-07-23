'use strict';

const { DEVICE_NAME,
        DEVICE_ADDR,
        PG_USER,
        PG_PASSWORD,
        PG_SERVER,
        PG_PORT,
        PG_DATABASE,
        APP_INTERVAL } = require('./config');



const miio = require('miio');
const knex = require('knex')({
  client: 'pg',
  connection: `postgres://${PG_USER}:${PG_PASSWORD}@${PG_SERVER}:${PG_PORT}/${PG_DATABASE}`
});



/**
 * Prepare Database
 **/

knex
  .schema
  .createTableIfNotExists('air', table => {
    table.string('location');
    table.timestamp('timestamp').defaultTo(knex.fn.now());
    table.float('temps');
    table.float('humidity');
    table.float('pm25');
  })
  .then(resp => { console.log('Table Created'); })
  .catch(console.error);



/**
 * Start Monitoring
 **/

miio
  .device({ address: DEVICE_ADDR })
  .then(device => {

    device.monitor();

    (function check() {

      console.log('t:', device.temperature, 'h:', device.humidity, 'pm2.5:', device.aqi);

      knex('air')
        .insert({ location:DEVICE_NAME,
                  temps: device.temperature,
                  humidity:  device.humidity,
                  "pm25": device.aqi })
        .then(() => {
          // ok, logged
        })
        .catch(console.error);

      setTimeout(check, APP_INTERVAL);
    }());

  })
  .catch(console.error);
