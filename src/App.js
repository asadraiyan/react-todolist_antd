import './App.css';
import 'antd/dist/reset.css';
import { Table, Button, Input } from 'antd'
import { useState, useEffect } from 'react';
import CreateModal from './components/CreateModal';
import EditModal from './components/EditModal';
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons'

function App() {
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [search, setSearch] = useState("")
  // console.log("todo =", todo)
  const [todoList, setTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem("todoList")) || []
  })
  const [data, setData] = useState({
    title: "",
    description: "",
    created: "",
    dueDate: "",
    tag: "",
    status: ""
  })

  useEffect(() => {
    const saveLocalTodos = () => {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
    saveLocalTodos();
  }, [todoList])

  useEffect(() => {
    resetData()
  }, [openCreate])

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value
    })
  }
  const coloumns = [
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: "Title",
      dataIndex: "title",
      filteredValue: [search],
      onFilter: (value, record) => {
        return String(record.title).toLowerCase().includes(value.toLowerCase()) ||
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.description).toLowerCase().includes(value.toLowerCase()) ||
          String(record.created).toLowerCase().includes(value.toLowerCase()) ||
          String(record.dueDate).toLowerCase().includes(value.toLowerCase()) ||
          String(record.status).toLowerCase().includes(value.toLowerCase()) ||
          String(record.tag).toLowerCase().includes(value.toLowerCase())
      }
    },
    {
      title: "Description",
      dataIndex: "description"
    },
    {
      title: "Created",
      dataIndex: "created"
    },
    {
      title: "Due date",
      dataIndex: "dueDate"
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Tag",
      dataIndex: "tag"
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined onClick={() => onEditItem(record)} style={{ fontSize: "16px", color: "green" }}></EditOutlined>
            <DeleteOutlined onClick={() => { onDeleteItem(record) }} style={{ color: "red", marginLeft: "15px", cursor: "pointer", fontSize: "16px" }}></DeleteOutlined>
          </>
        )
      }
    }
  ]

  const resetData = () => {
    setData({
      title: "",
      description: "",
      created: "",
      dueDate: "",
      tag: "",
      status: ""
    })
  }

  const onSubmitCreate = (data) => {
    // console.log("submit data =", data)
    const randomId = parseInt(Math.random() * 100)
    setTodoList([
      ...todoList,
      { ...data, id: randomId }
    ])
    setOpenCreate(false)
    resetData()
  }

  const onSubmitEdit = (data) => {
    setTodoList(prevTodoList => {
      return prevTodoList.map(todo => {
        if (todo.id === data.id) {
          return data;
        } else {
          return todo;
        }
      })
    })
    setOpenEdit(false)
    console.log("data", data)
  }
  const onEditItem = (record) => {
    console.log("record =", record)
    setData({
      id: record.id,
      title: record.title,
      description: record.description,
      created: record.created,
      dueDate: record.dueDate,
      tag: record.tag,
      status: record.status
    })
    setOpenEdit(true)
  }
  console.log("todoList =", todoList)

  const onDeleteItem = (record) => {
    // console.log("record = ", record)
    setTodoList((todoList) => {
      return todoList.filter((data) => {
        return data.id !== record.id;
      })
    })

  }

  return (
    <div className="App">
      <header className='App-header'>
        <div className="todo-container">
          <h3>To-Do List</h3>
          <Input.Search placeholder="Search keywords..." onSearch={(value) => {
            setSearch(value)
          }} className='search-input' type='search' onChange={(e) => setSearch(e.target.value)} ></Input.Search>
          <Button type='primary' onClick={() => setOpenCreate(!openCreate)}>
            Add Todo Items
          </Button>
        </div>
        <Table columns={coloumns} dataSource={todoList} className="modalStyle" key={todoList?.id}>
        </Table>
        <CreateModal onChange={change} data={data} openCreate={openCreate} setOpenCreate={setOpenCreate} submit={(data) => onSubmitCreate(data)} />
        <EditModal onChange={change} data={data} openEdit={openEdit} setOpenEdit={setOpenEdit} submit={(data) => onSubmitEdit(data)} />
      </header>

    </div>
  );
}

export default App;
