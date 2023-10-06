// import {API_URL} from './config'

const getById = async (id) => {
    try {
        const req = await fetch(`/get/${id}`);
        const res = await req.json();
        // console.log(res);
        return res
    } catch (error) {
        console.log(error);
    }
}

export default getById;