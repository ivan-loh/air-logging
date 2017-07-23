'use strict';

const {
  PG_CONNECTION = 'postgres://app:somedatabasepassword@127.0.0.1:5432/miilog',

  PG_USER     = 'app',
  PG_PASSWORD = 'somedatabasepassword',
  PG_SERVER   = 'localhost',
  PG_PORT     = '5432',
  PG_DATABASE = 'miilog',

  DEVICE_NAME = 'Office',
  DEVICE_ADDR = '192.168.1.217',

  APP_INTERVAL = 30000

} = process.env;

module.exports = {

  PG_USER,
  PG_PASSWORD,
  PG_SERVER,
  PG_PORT,
  PG_DATABASE,

  DEVICE_NAME,
  DEVICE_ADDR,

  APP_INTERVAL

};

