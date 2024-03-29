import React from 'react'
import { Modal, Input, Select } from "antd"

const CreateModal = ({ data, onChange, openCreate, setOpenCreate, submit, changeStatus, changeTag }) => {

    return (
        <>
            <Modal
                title="Create Todo Item"
                okText="Submit"
                open={openCreate}
                onCancel={() => setOpenCreate(false)}
                onOk={submit}
                style={{ gap: "1rem" }}
                className="modalStyle"
            >
                <div className='input-container'>
                    <Input value={data.title} name='title' onChange={onChange} size='large' placeholder='Title' maxLength={100} addonBefore="Title" showCount={true} />
                    <Input value={data.description} name='description' onChange={onChange} size='large' placeholder='Description' maxLength={1000} addonBefore="Description" showCount={true} />
                    <Input value={data.dueDate} name='dueDate' onChange={onChange} size='large' placeholder='Due date' type='date' addonBefore="Due Date" />
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Tags"
                        onChange={changeTag}
                        value={data.tag}
                        size='large'
                    />
                    <Select
                        defaultValue="OPEN"
                        onChange={changeStatus}
                        size='large'
                        value={data.status}
                        options={[
                            {
                                label: 'Status',
                                options: [
                                    {
                                        label: 'OPEN',
                                        value: 'OPEN',
                                    },
                                    {
                                        label: 'WORKING',
                                        value: 'WORKING',
                                    },
                                    {
                                        label: 'DONE',
                                        value: 'DONE',
                                    },
                                    {
                                        label: 'OVERDUE',
                                        value: 'OVERDUE',
                                    },
                                ],
                            }
                        ]}
                    />
                </div>
            </Modal>
        </>
    )
}

export default CreateModal
