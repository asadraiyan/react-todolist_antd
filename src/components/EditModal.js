import React from 'react'
import { Modal, Input } from "antd"

const CreateModal = ({ data, onChange, openEdit, setOpenEdit, submit }) => {

    return (
        <>
            <Modal
                title="Edit Todo Item"
                okText="Save"
                open={openEdit}
                onCancel={() => setOpenEdit(false)}
                onOk={() => submit(data)}
                style={{ gap: "1rem" }}
                className="modalStyle"
            >
                <Input
                    value={data?.title}
                    name='title'
                    size='large'
                    placeholder='Title'
                    onChange={onChange}
                />

                <Input
                    value={data?.description}
                    name='description'
                    size='large'
                    placeholder='Description'
                    onChange={onChange}
                />

                <Input
                    value={data?.created}
                    name='created'
                    size='large'
                    type='date'
                    onChange={onChange}
                />

                <Input
                    value={data?.dueDate}
                    name='dueDate'
                    size='large'
                    placeholder='Due date'
                    type='date'
                    onChange={onChange}
                />

                <Input
                    value={data?.tag}
                    name='tag'
                    size='large'
                    placeholder='Tag'
                    onChange={onChange}

                />

                <Input
                    value={data?.status}
                    name='status'
                    size='large'
                    placeholder='Status'
                    onChange={onChange}
                />
            </Modal>
        </>
    )
}

export default CreateModal
