const knex = require("../../../../config/koneksi")
const Todo = require("../../../../models/todo")
const formidable = require("formidable");
export default (req,res)=>{
    switch(req.method){
        case "POST":
            const form = formidable({ multiples: true });
            form.parse(req, (err, fields, files) => {
                if (err) {
                    next(err);
                    return res.send(err);
                  }

                  const status =fields.status
                  const id = req.query.id
                  Todo.ubahTodo(id,status,()=>{
                        res.status(200).json({
                            sukses:1,
                            pesan:"Data berhasil diubah"
                        })
                    })
            })
            break;
        default:
            res.status(404).json("404 Not Found")
    }
    
}

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };
  