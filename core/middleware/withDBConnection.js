import connection from "../db/connection";

const withDBConnection =  handler => async (req, res) => {
    try{
        await connection();
        handler(req, res)
    }catch (e) {
        res.status(500).send()
    }
}


export default withDBConnection