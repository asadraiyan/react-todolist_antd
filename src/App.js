import './App.css';
import 'antd/dist/reset.css';
import { Table, Button, Input, Modal } from 'antd'
import { useState, useEffect } from 'react';
import CreateModal from './components/CreateModal';
import EditModal from './components/EditModal';
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons'

function App() {
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [search, setSearch] = useState("")
  const [todoList, setTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem("todoList")) || []
  })
  console.log("todolist", todoList)
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
      dataIndex: "id",
      sorter: (record1, record2) => {
        return record1.id - record2.id
      }
    },
    {
      title: "Title",
      dataIndex: "title",
      filteredValue: [search],
      onFilter: (value, record) => {
        console.log("value", value)
        console.log("record", record)
        return String(record.title).toLowerCase().includes(value.toLowerCase()) ||
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.description).toLowerCase().includes(value.toLowerCase()) ||
          String(record.created).toLowerCase().includes(value.toLowerCase()) ||
          String(record.dueDate).toLowerCase().includes(value.toLowerCase()) ||
          String(record.status).toLowerCase().includes(value.toLowerCase()) ||
          String(record.tag).toLowerCase().includes(value.toLowerCase())
      },
      sorter: (record1, record2) => {
        return record1.title.length - record2.title.length
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (record1, record2) => {
        return record1.description.length - record2.description.length
      },
    },
    {
      title: "Created",
      dataIndex: "created",
      // sorter: (record1, record2) => {
      //   return record1.created.length - record2.created.length
      // },
      sorter: (a, b) => new Date(a.date) - new Date(b.date)
    },
    {
      title: "Due date",
      dataIndex: "dueDate",
      // sorter: (record1, record2) => {
      //   return record1.dueDate.length - record2.dueDate.length
      // },
      sorter: (a, b) => new Date(a.date) - new Date(b.date)
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: 'OPEN', value: 'OPEN' },
        { text: 'WORKING', value: 'WORKING' },
        { text: 'DONE', value: 'DONE' },
        { text: 'OVERDUE', value: 'OVERDUE' },
      ],
      onFilter: (value, record) => {
        console.log("value", value)
        console.log("record", record)
        return record.status === value
      }
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

  const generateTimeStamp = () => {
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const formattedDate = currentDayOfMonth < 10 ? "0" + currentDayOfMonth : currentDayOfMonth;
    const currentMonth = currentDate.getMonth() + 1;
    const formattedMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;
    const currentYear = currentDate.getFullYear();
    const dateString = currentYear + "-" + formattedMonth + "-" + formattedDate;
    return dateString
  }

  const onSubmitCreate = (data) => {
    // console.log("submit data =", data)
    const randomId = parseInt(Math.random() * 100)
    setTodoList([
      ...todoList,
      {
        ...data,
        created: generateTimeStamp(),
        id: randomId
      }
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
    // console.log("data", data)
  }
  const onEditItem = (record) => {
    // console.log("record =", record)
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
  // console.log("todoList =", todoList)

  const onDeleteItem = (record) => {
    // console.log("record = ", record)
    Modal.confirm({
      title: "Are you sure, you want to delete this item ?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setTodoList((todoList) => {
          return todoList.filter((data) => {
            return data.id !== record.id;
          })
        })
      }
    })
  }

  const statusHandler = (value) => {
    setData({
      ...data,
      status: value
    })
  }

  console.log("data =", data)

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
        <CreateModal onChange={change} data={data} openCreate={openCreate} setOpenCreate={setOpenCreate} submit={(data) => onSubmitCreate(data)} changeStatus={statusHandler} />
        <EditModal onChange={change} data={data} openEdit={openEdit} setOpenEdit={setOpenEdit} submit={(data) => onSubmitEdit(data)} changeStatus={statusHandler} />
      </header>

    </div>
  );
}

export default App;
