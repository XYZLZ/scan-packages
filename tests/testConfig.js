import supertest from 'supertest'
import conn from '../db/conexion.js'
import {server} from '../index.js'
const api = supertest(server);


const TESTCONFIG = {
    api,
    server,
    base_url: '/api/v1/',
    closeConexion: conn.destroy() 
}

export default TESTCONFIG;