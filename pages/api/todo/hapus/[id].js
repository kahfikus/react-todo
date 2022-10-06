const knex = require("../../../../config/koneksi")
const Todo = require("../../../../models/todo")
export default (req,res)=>{
    switch(req.method){
        case "GET":
            Todo.hapusTodo(req.query.id,()=>{
                res.status(200).json({
                    sukses:1,
                    pesan:"Data berhasil dihapus"
                })    
            })
            break;
        default:
            res.status(404).json("404 Not Found")
    }
    
}


  