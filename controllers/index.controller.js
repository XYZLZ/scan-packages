import {ZodError} from 'zod'
import {config} from 'dotenv'
import conn from '../db/conexion.js'
import packageSchema from '../schemas/index.js'
import helper from '../helpers.js'

config();
const { NODE_ENV} = process.env;
let dbtable = '';

NODE_ENV == 'test' ? dbtable = 'packages_test' : dbtable = 'packages';


const getAll = async (req, res) => {
    try {
        const [data] = await conn.query(`select * from ${dbtable}`) || null;
        if (data === null || data === undefined) {
            return res.status(400).json({
                success:false,
                message: 'Error al encontrar los paquetes'
            })
        }
        return res.status(200).json({
            success:true,
            data
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Error del servidor'
        })
    }
}

const getById = async (req, res) => {
    const {id} = req.params
    // console.log(id);
    if (!parseInt(id)) {
        return res.status(400).json({
            success:false,
            message: 'se reuqiere el id del recurso' 
        })
    }
    try {
        const [data] = await conn.query(`select * from ${dbtable} where id = ?`, [id]);
        // console.log(data);
        if (!data[0]) {
            return res.status(404).json({
                success:false,
                message: 'Paquete no encontrado'
            })
        }
        return res.status(200).json({
            success:true,
            data
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Error del servidor',
            error
        })
    }
}

const createPackage = async (req, res) => {
	//console.log(req.body)
    try {
        await packageSchema.parseAsync(req.body);
        const {nombre_paquete, codigo} = req.body;

        // * separacion de los datos
        const separator = codigo.split(helper.regex);
        const codigo_peso = parseInt(separator[2]);
        const newCode = parseInt(separator[1]);
        const libra = codigo_peso / 100;


        const [data] = await conn.query(`insert into ${dbtable} set nombre_paquete = ?, codigo = ?, codigo_peso = ?, libra = ? `, [nombre_paquete, newCode, codigo_peso, libra]);
        if (data.affectedRows > 0) {
            return res.status(201).json({
                success:true,
                data
            })
        }

        return res.status(400).json({
            success:false,
            message: 'error al insertar los datos'
        })

    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json(error.issues.map(issue => ({message: issue.message})))
        }
        return  res.status(500).json({
            success:false,
            message: 'Error del servidor (create package)'
        })
    }
}

const updatePackage = async (req, res) => {
    const {id} = req.params;

    if (!parseInt(id)) {
        return res.status(400).json({
            success:false,
            message: 'se reuqiere el id del recurso' 
        })
    }

    try {
        await packageSchema.parseAsync(req.body);
        const {nombre_paquete, codigo} = req.body;

        // * separacion de los datos
        const separator = codigo.split(helper.regex);
        const codigo_peso = parseInt(separator[2]);
        const newCode = parseInt(separator[1]);
        const libra = codigo_peso / 100;


        const [data] = await conn.query(`update ${dbtable} set nombre_paquete = ?, codigo = ?, codigo_peso = ?, libra = ? where id = ? `, [nombre_paquete, newCode, codigo_peso, libra, id]);
        if (data.affectedRows > 0) {
            return res.status(200).json({
                success:true,
                data
            })
        }

        if (!data[0]) {
            return res.status(404).json({
                success:false,
                message: 'Paquete no encontrado'
            })
        }

        return res.status(400).json({
            success:false,
            message: 'error al insertar los datos'
        })

    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json(error.issues.map(issue => ({message: issue.message})))
        }
        return  res.status(500).json({
            success:false,
            message: 'Error del servidor (create package)'
        })
    }
}

const deletePackage = async (req, res) => {
    const {id} = req.params;

    if (!parseInt(id)) {
        return res.status(400).json({
            success:false,
            message: 'se reuqiere el id del recurso' 
        })
    }

    try {
        const [data] = await conn.query(`delete from ${dbtable} where id = ?`, [id]);
        if (data.affectedRows > 0) {
            res.status(204).send();
        }

        if (data.affectedRows == 0) {
            res.status(404).json({
                success:false,
                message: 'Paquete no encontrado'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error del servidor (delete package)'
        })
    }
}

export {getAll, createPackage, getById, updatePackage, deletePackage};
