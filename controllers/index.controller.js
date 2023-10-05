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

        let separator;
        // let codigo_peso;
        let newCode;
        // let libra;
        let optionItems = [];

        // * separacion de los datos
        if (helper.regex.test(codigo)) {
            separator = codigo.split(helper.regex);


            separator.forEach((item, i) => {
                if (i >= 2) {
                    optionItems.push(item)
                }
            })

            // codigo_peso = parseInt(separator[2]);
            newCode = parseInt(separator[1]);
            // libra = codigo_peso / 100;
        }else {
            let newArray = Array.from(codigo);
            newArray.splice(0, 2);
            newArray.splice(14, 4);
            newArray.splice(20, 2);
            newArray.splice(26, 2);
            newArray.splice(14, 0, ')');
            newArray.splice(21, 0, ')');
            let join = newArray.join('');
            separator = join.split(')');
            // codigo_peso = parseInt(separator[1]);
            separator.forEach((item, i) => {
                if (i >= 2) {
                    optionItems.push(item)
                }
            })

            newCode = parseInt(separator[0]);
            // libra = codigo_peso / 100
        }


        const [data] = await conn.query(`insert into ${dbtable} set nombre_paquete = ?, codigo = ? `, [nombre_paquete, newCode]);
        if (data.affectedRows > 0) {
            return res.status(201).json({
                success:true,
                data,
                weightOptions: optionItems,
                newId: data.insertId
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

    let separator;
    let newCode;
    let optionItems = [];

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
        // * separacion de los datos
        if (helper.regex.test(codigo)) {
            separator = codigo.split(helper.regex);
            // codigo_peso = parseInt(separator[2]);

            separator.forEach((item, i) => {
                if (i >= 2) {
                    optionItems.push(item)
                }
            })

            newCode = parseInt(separator[1]);
            // libra = codigo_peso / 100;
        }else {
            let newArray = Array.from(codigo);
            newArray.splice(0, 2);
            newArray.splice(14, 4);
            newArray.splice(20, 2);
            newArray.splice(26, 2);
            newArray.splice(14, 0, ')');
            newArray.splice(21, 0, ')');
            let join = newArray.join('');
            separator = join.split(')');

            separator.forEach((item, i) => {
                if (i >= 2) {
                    optionItems.push(item)
                }
            })


            // codigo_peso = parseInt(separator[1]);
            newCode = parseInt(separator[0]);
            // libra = codigo_peso / 100
        }

        console.log(separator);
        console.log("opciones de peso", optionItems);


        const [data] = await conn.query(`update ${dbtable} set nombre_paquete = ?, codigo = ?  where id = ? `, [nombre_paquete, newCode, id]);
        if (data.affectedRows > 0) {
            return res.status(200).json({
                success:true,
                data,
                weightOptions: optionItems
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

const countPackage = async (req, res) => {
    const {cantidad, action} = req.body;
    // console.log(req.body);
    let currentAction;
    const {id} = req.params;

    if (!parseInt(id)) {
        return res.status(400).json({
            success:false,
            message: 'se reuqiere el id del recurso' 
        })
    }


    try {

        const [prevCount] = await conn.query(`Select cantidad from ${dbtable} where id = ?`, [id]);

        if (action) {
            currentAction = prevCount[0].cantidad + parseInt(cantidad);
        }else {
            currentAction = prevCount[0].cantidad - parseInt(cantidad);
            
            if (currentAction < 0) {
                currentAction = 0
            }
        }

        const [data] = await conn.query(`update ${dbtable} set cantidad = ? where id = ?`, [currentAction, id]);  
        
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
        return res.status(500).json({
            success: false,
            message: "Error en el servidor",
            error
        })
    }
}

const weightUpdate = async(req, res) => {
    const {id} = req.params;
    const {weight} = req.body;

    if (!parseInt(id) || !parseFloat(weight)) {
        return res.status(400).json({
            success:false,
            message: 'se reuqiere el id del recurso o el peso no es el indicado' 
        })
    }

    try {

        // * transformar el codigo a peso
        const libra = parseFloat(weight) / 100;
        

        const [data] = await conn.query(`update ${dbtable} set codigo_peso = ?, libra = ? where id = ?`, [weight, libra, id]);

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
        return res.status(500).json({
            success: false,
            message:'Error en el servidor (weightUpdate)',
            error
        })
    }
}

export {getAll, createPackage, getById, updatePackage, deletePackage, countPackage, weightUpdate};
