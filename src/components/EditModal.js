import React from 'react'
import { Modal, Input, Select } from "antd"

const CreateModal = ({ data, onChange, openEdit, setOpenEdit, submit, changeStatus }) => {

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
                <div className="input-container">
                    <Input
                        value={data?.title}
                        name='title'
                        size='large'
                        placeholder='Title'
                        onChange={onChange}
                        maxLength={100}
                        addonBefore="Title"
                        showCount={true}
                    />

                    <Input
                        value={data?.description}
                        name='description'
                        size='large'
                        placeholder='Description'
                        onChange={onChange}
                        maxLength={1000}
                        addonBefore="Description"
                        showCount={true}
                    />

                    <Input
                        value={data?.created}
                        name='created'
                        size='large'
                        type='date'
                        onChange={onChange}
                        disabled={true}
                        addonBefore="Created"
                    />

                    <Input
                        value={data?.dueDate}
                        name='dueDate'
                        size='large'
                        placeholder='Due date'
                        type='date'
                        onChange={onChange}
                        addonBefore="Due Date"
                    />

                    <Input
                        value={data?.tag}
                        name='tag'
                        size='large'
                        placeholder='Tag'
                        onChange={onChange}
                        addonBefore="Tag"

                    />

                    <Select
                        defaultValue="OPEN"
                        onChange={changeStatus}
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
