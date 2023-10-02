import {createPool} from 'mysql2/promise'
import {config} from 'dotenv'
config();

const {USER, DATABASE, PASSWORD, HOST, PORT_DB} = process.env;

const conn = createPool({
    user: USER || 'root',
    database: DATABASE || 'dbcodigo',
    password:PASSWORD || '',
    host: HOST || 'localhost',
    port: PORT_DB || '3306',
})

conn.on('connection', () => {
    console.log('conected to database');
})

export default conn;