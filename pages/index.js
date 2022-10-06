import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Form,
  Alert,
  Row,
  Col,
  Popconfirm,
  Checkbox,
  Spin,Progress
} from "antd";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { base_url } from "../config/fungsi";

export default function Home() {
  // const dataTodo = [
  //   { id: 1, nama: "Mandi", status: "Pending" },
  //   { id: 2, nama: "Makan", status: "Pending" },
  //   { id: 3, nama: "Tidur", status: "Pending" },
  // ];
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [persen, setPersen] = useState(0);
  const [form] = Form.useForm();
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    axios
      .get(base_url + "todo")
      .then((res) => {
        let arr_todo = res.data.data;
        var jumlah_semua = arr_todo.length
        var jumlah_selesai = arr_todo.filter(x => {
          return x.status == "Selesai";
        }).length

        let persen = Math.floor((jumlah_selesai/jumlah_semua) * 100)
        //alert(persen.toString())
        setPersen(persen)
        setTodoList(arr_todo);
        setIsLoading(false);
        


        // alert("Pending:"+lists_pending.length)
        // alert("Selesai:"+lists_selesai.length)
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
      });
  };

  const tambahTodo = (values) => {
    // let arr_todo = todoList;
    // let id_nya = 0;
    // if (arr_todo.length == 0) {
    //   id_nya = 1;
    // } else {
    //   const ids = arr_todo.map((object) => {
    //     return object.id;
    //   });

    //   const max = Math.max.apply(null, ids);
    //   id_nya = max + 1;
    // }

    // arr_todo.push({ id: id_nya, nama: values.todo, status: "Pending" });
    
    // setTodoList([...arr_todo])
    setIsLoading(true);
    axios
      .post(base_url + "todo/tambah", { txt_nama: values.todo })
      .then((res) => {
        setIsLoading(false);
        form.resetFields();
        loadData();
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
      });

    // console.log(todoList)
  };

  const hapusTodo = (id) => {
    // let arr_todo = todoList;
    // var lists = arr_todo.filter(x => {
    //   return x.id != id;
    // })
    // setTodoList(lists)
    setIsLoading(true);
    axios
      .get(base_url + "todo/hapus/" + id)
      .then((res) => {
        setIsLoading(false);
        loadData();
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
      });

    // alert(JSON.stringify(lists))
  };

  const updateTodo = (id, st) => {
    //alert(JSON.stringify(st))
    //let arr_todo = todoList;
    let status = "";
    if (st.target.checked) {
      status = "Selesai";
    } else {
      status = "Pending";
    }
    //alert("Todo "+id+" "+status)
    // const newState = arr_todo.map((obj) =>
    //   obj.id === id ? { ...obj, status: status } : obj
    // );
    // setTodoList(newState);
    setIsLoading(true)
    axios.post(base_url+"todo/ubah/"+id,{status:status}).then((result)=>{
      setIsLoading(false)
      loadData()
    }).catch((err)=>{
      alert(err)
      setIsLoading(false)
    })
    
  };

  return (
    <>
      <Spin spinning={isLoading} size="large">
        <Row style={{ paddingTop: "20px" }}>
          <Col span={8} offset={8}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={tambahTodo}
              autoComplete="off"
            >
              {/* <Form.Item
              label=""
              name="todo"
              rules={[{ required: true, message: "Masukkan Todo!" }]}
            >
              <Input.Group compact>
                <Input
                  style={{ width: "calc(100% - 200px)" }}
                  placeholder="Masukkan Todo"
                />
                <Button type="primary" htmlType="submit" >
                  <PlusOutlined />
                </Button>
              </Input.Group>
            </Form.Item> */}
              <Form.Item
                label=""
                name="todo"
                rules={[
                  {
                    required: true,
                    message: "Harap diisi Todo nya!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Tambah Todo
                </Button>
              </Form.Item>
            </Form>
            Progress Todo:
                <Progress percent={persen} />
            {todoList.length == 0 ? (
              <Alert message="Belum ada todo " type="error" />
            ) : (
              <>
                <ul
                  style={{
                    border: "solid 1px #f0ebeb",
                    listStyle: "none",
                    padding: 0,
                  }}
                >
                  {todoList.map((el, idx) => {
                    return (
                      <li
                        style={{
                          borderBottom: "solid 1px #f0ebeb",
                          padding: "10px",
                        }}
                      >
                       
                        {el.status == "Selesai" ? (
                          <>
                           <span style={{ float: "left", paddingRight: "10px" }}>
                          <Checkbox
                            value={el.id_todo}
                            onChange={(st) => updateTodo(el.id_todo, st)}
                            checked
                          />
                        </span>
                          
                          <span
                            style={{
                              float: "left",
                              textDecoration: "line-through",
                            }}
                          >
                            {el.nama_todo}
                          </span>
                          </>
                        ) : (
                          <>
                          <span style={{ float: "left", paddingRight: "10px" }}>
                          <Checkbox
                            value={el.id_todo}
                            onChange={(st) => updateTodo(el.id_todo, st)}
                            checked={false}
                          />
                        </span>
                        <span style={{ float: "left" }}>{el.nama_todo}</span>
                          </>
                          
                        )}

                        <Popconfirm
                          title={
                            'Anda yakin mau hapus todo  "' +
                            el.nama_todo +
                            '" ?'
                          }
                          onConfirm={() => {
                            hapusTodo(el.id_todo);
                          }}
                          //onCancel={cancel}
                          okText="Ya"
                          cancelText="Tidak"
                        >
                          <Button
                            style={{ float: "right" }}
                            type="primary"
                            danger
                            title="Hapus"
                          >
                            {" "}
                            <CloseOutlined />{" "}
                          </Button>
                        </Popconfirm>
                        <br style={{ clear: "both" }} />
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </Col>
        </Row>
      </Spin>
    </>
  );
}
