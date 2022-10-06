const knex = require("../config/koneksi")
module.exports = {
    tambahTodo: (nama_todo,callback)=>{
        knex("todo").insert({
            nama_todo:nama_todo,
            status:"Pending"
        }).then(callback)
    },
    listTodo:(callback) => {
      knex("todo").then(callback)
    },
    hapusTodo:(id_todo,callback)=>{
        knex("todo").where("id_todo",id_todo).del().then(callback)
    },
    ubahTodo:(id_todo,status,callback)=>{
        knex('todo')
        .where('id_todo',id_todo)
        .update({
            status:status
        }).then( callback)
    }
}