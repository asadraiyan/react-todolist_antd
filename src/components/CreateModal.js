import React from 'react'
import { Modal, Input } from "antd"

const CreateModal = ({ data, onChange, openCreate, setOpenCreate, submit }) => {

    return (
        <>
            <Modal
                title="Create Todo Item"
                okText="Submit"
                open={openCreate}
                onCancel={() => setOpenCreate(false)}
                onOk={() => submit(data)}
                style={{ gap: "1rem" }}
                className="modalStyle"
            >
                <Input value={data.title} name='title' onChange={onChange} size='large' placeholder='Title' />
                <Input value={data.description} name='description' onChange={onChange} size='large' placeholder='Description' />
                <Input value={data.created} name='created' onChange={onChange} size='large' placeholder='create' type='date' />
                <Input value={data.dueDate} name='dueDate' onChange={onChange} size='large' placeholder='Due date' type='date' />
                <Input value={data.tag} name='tag' onChange={onChange} size='large' placeholder='Tag' />
                <Input value={data.status} name='status' onChange={onChange} size='large' placeholder='Status' />
            </Modal>
        </>
    )
}

export default CreateModal
