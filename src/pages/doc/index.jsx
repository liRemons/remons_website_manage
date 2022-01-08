import { useState, useEffect } from 'react';
import { connect } from '@utils'
import Search from '@components/Search';
import actionCreators from '@store/doc/actions';
import AddOrEdit from './addOrEdit'
import { Table, Button, Input, Modal, Select, message, Form } from 'antd';
import { EditOutlined, ExclamationCircleOutlined, PaperClipOutlined } from '@ant-design/icons'
import { HOST_URL } from '@config'
const { confirm } = Modal;

function Doc(props) {
  const { queryDocList, docList, deleteDoc } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState({})
  const [handleType, setHandleType] = useState('');
  const [checkedTable, setCheckedTable] = useState([])

  useEffect(() => {
    queryDocList({})
  }, [])

  const del = () => {
    if (checkedTable.length === 0) return
    confirm({
      title: '删除后不可恢复，确认?',
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: '确定',
      async onOk() {
        const res = await deleteDoc({ ids: checkedTable })
        if (res.success) {
          queryDocList(form.getFieldsValue())
          message.success(res.msg)
        }
      },
      onCancel() { },
    });
  }
  const edit = (data) => {
    console.log(data);
    setHandleType('edit')
    setEditData(data)
    setVisible(true)
  }
  const add = () => {
    setHandleType('add')
    setVisible(true)
  }
  const onFinish = (values) => {
    queryDocList(values)
  };
  const reset = () => {
    queryDocList({})
  }
  const columns = [
    { title: '名称', dataIndex: 'title', key: 'title' },
    {
      title: '资源地址', key: 'url', dataIndex: 'url',
    },

    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
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
    { name: 'title', label: "名称", childNode: <Input /> },
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
    dataSource: docList,
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

export default connect({ attr: 'doc', actionCreators })(Doc)