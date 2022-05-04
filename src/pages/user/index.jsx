import { useState, useEffect } from 'react';
import { connect  } from '@utils'
import Search from '@components/Search';
import actionCreators from '@store/user/actions';
import AddOrEdit from './addOrEdit'
import { Table, Button, Input, Modal, message, Form } from 'antd';
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal;

function User(props) {
  const { queryUser, userList, deleteUser } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState({})
  const [handleType, setHandleType] = useState('');
  const [checkedTable, setCheckedTable] = useState([])

  useEffect(() => {
    queryUser({})
  }, [])

  const del = () => {
    if (checkedTable.length === 0) return
    confirm({
      title: '删除后不可恢复，确认?',
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: '确定',
      async onOk() {
        const res = await deleteUser({ ids: checkedTable })
        if (res.success) {
          queryUser(form.getFieldsValue())
          message.success(res.msg)
        }
      },
      onCancel() { },
    });
  }
  const edit = (data) => {
    setHandleType('edit')
    setEditData(data)
    setVisible(true)
  }
  const add = () => {
    setHandleType('add')
    setVisible(true)
  }
  const onFinish = (values) => {
    queryUser(values)
  };
  const reset = () => {
    queryUser({})
  }
  const columns = [
    { title: '用户名', dataIndex: 'name', key: 'name' },
    { title: '账号', dataIndex: 'account', key: 'account' },
    {
      title: 'photo', key: 'photo', dataIndex: 'photo',
    },
    {
      title: '操作',
      key: 'id',
      render: (text, record) =>
        <Button type="primary" shape="circle" size="small" onClick={() => edit(record)} icon={<EditOutlined />} />,
    },
  ];


  const rowSelection = {
    checkedTable,
    onChange: val => setCheckedTable(val),
  };

  const modalProps = {
    visible,
    onCancel: () => setVisible(false),
    destroyOnClose: true,
    footer: null,
    title: handleType === 'add' ? '新增' : '修改'
  }
  // addOrEdit props 
  const addOrEditProps = {
    tableForm: form,
    onCancel: () => setVisible(false),
    editData,
    handleType,
    ...props
  }

  const itemData = [
    { name: 'name', label: "用户名", childNode: <Input /> },
    { name: 'account', label: "账号", childNode: <Input /> },
  ]

  const searchProps = {
    itemData,
    add,
    reset,
    del,
    onFinish,
  }


  const tableProps = {
    rowKey: record => record.id,
    columns,
    dataSource: userList,
    rowSelection
  }
  return <>
    <Search {...searchProps}></Search>
    <Table {...tableProps} />
    <Modal {...modalProps}>
      <AddOrEdit {...addOrEditProps}></AddOrEdit>
    </Modal>
  </>

}

export default connect({ attr: 'user', actionCreators })(User)