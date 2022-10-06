const knex = require("../../../config/koneksi")
const Todo = require("../../../models/todo")
export default (req,res)=>{
    switch(req.method){
        case "GET":
            Todo.listTodo((result)=>{
                     res.status(200).json(
                         {
                             sukses:1,
                             jumlah:result.length,
                             data:result
                         }
                     )
             })
            break;
        default:
            res.status(404).json("404 Not Found")
    }
    
}