import './App.css';
import 'antd/dist/reset.css';
import { Table, Button, Input, Modal, Tag } from 'antd'
import { useState, useEffect } from 'react';
import CreateModal from './components/CreateModal';
import EditModal from './components/EditModal';
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [search, setSearch] = useState("")
  const [todoList, setTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem("todoList")) || []
  })
  // console.log("todolist", todoList)
  const [data, setData] = useState({
    title: "",
    description: "",
    created: "",
    dueDate: "",
    tag: [],
    status: "OPEN"
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
      defaultSortOrder: "descend",
      sorter: (a, b) => new Date(a.created) - new Date(b.created)
    },
    {
      title: "Due date",
      dataIndex: "dueDate",
      sorter: (a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: 'OPEN', value: "OPEN" },
        { text: 'WORKING', value: "WORKING" },
        { text: 'DONE', value: 'DONE' },
        { text: 'OVERDUE', value: 'OVERDUE' },
      ],
      onFilter: (value, record) => {
        return record.status.includes(value)
      }
    },
    {
      title: "Tags",
      dataIndex: "tag",
      render: (record) => {
        // console.log("tagrecord", record)
        return (
          Array.isArray(record) && record?.map(tag => {
            return (
              <Tag color="success">{tag}</Tag>
            )
          })
        )
      }
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
      tag: [],
      status: "OPEN"
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
    const timeStamp = generateTimeStamp();
    const finalDueDate = new Date(data.dueDate).getTime()
    const createdDate = new Date(timeStamp);
    const finalCreatedDate = createdDate.getTime();
    // console.log("submit data =", data)
    if (data.title === "" || data.description === "" || data.status === "") {
      toast.warning("Please fill all the input details", {
        position: "top-center"
      })
      return;
    }

    if (finalDueDate < finalCreatedDate) {
      toast.error("Invalid due date", {
        position: "top-center"
      })
      return;
    }

    const randomId = parseInt(Math.random() * 1000)
    setTodoList([
      ...todoList,
      {
        ...data,
        created: timeStamp,
        id: randomId
      }
    ])
    setOpenCreate(false)
    toast.success("Todo created successfully", {
      position: "top-center"
    })
    resetData()
  }

  const onSubmitEdit = (data) => {
    const finalDueDate = new Date(data.dueDate).getTime()
    const finalCreatedDate = new Date(data.created).getTime();
    if (data.title === "" || data.description === "" || data.status === "") {
      toast.warning("Please fill all the input details", {
        position: "top-center"
      })
    }

    if (finalDueDate < finalCreatedDate) {
      toast.error("Invalid due date", {
        position: "top-center"
      })
    }
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
    toast.success("Todo updated successfully", {
      position: "top-center"
    })
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
  const handleTagChange = (value) => {
    // console.log("tags", value)
    setData({
      ...data,
      tag: value
    })
  }

  // console.log("data =", data)

  return (
    <div className="App">
      <header className='App-header'>
        <div className="todo-container">
          <h3>To-Do List</h3>
          <Input.Search placeholder="Search keywords..." onSearch={(value) => {
            setSearch(value)
          }} className='search-input' type='search' onChange={(e) => setSearch(e.target.value)} ></Input.Search>
          <Button type='primary' onClick={() => setOpenCreate(!openCreate)}>
            Add Todo
          </Button>
        </div>
        <Table columns={coloumns} dataSource={todoList} className="modalStyle" key={todoList?.id} pagination={{
          pageSize: 5
        }}>
        </Table>
        <CreateModal onChange={change} data={data} openCreate={openCreate} setOpenCreate={setOpenCreate} submit={(data) => onSubmitCreate(data)} changeStatus={statusHandler} changeTag={handleTagChange} />
        <EditModal onChange={change} data={data} openEdit={openEdit} setOpenEdit={setOpenEdit} submit={(data) => onSubmitEdit(data)} changeStatus={statusHandler} changeTag={handleTagChange} />
      </header>
      <ToastContainer />

    </div>
  );
}

export default App;
