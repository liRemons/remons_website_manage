import Search from '@components/Search'
import Image from '@components/Image'
import { Table, Button, Form, Input, Modal, message } from 'antd';
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import AddOrEdit from './addOrEdit'
import actionCreators from '@store/content/actions'
import { connect } from '@utils'
import { HOST_URL } from '@config'
const { confirm } = Modal;
function TechClass(props) {
  const [form] = Form.useForm();
  const { techClassList, getTechClassList, delTechClass } = props;
  const [visible, setVisible] = useState(false);
  const [checkedTable, setCheckedTable] = useState([])
  const [editData, setEditData] = useState({})
  const [handleType, setHandleType] = useState('');
  const add = () => {
    setHandleType('add')
    setVisible(true)
  }
  const del = () => {
    if (checkedTable.length === 0) return
    confirm({
      title: '删除后不可恢复，确认?',
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: '确定',
      async onOk() {
        const res = await delTechClass({ ids: checkedTable })
        if (res.success) {
          props.getTechClassList(form.getFieldsValue())
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
  const onFinish = (values) => {
    getTechClassList(values)
  };
  const reset = () => {
    getTechClassList({})
  }
  useEffect(() => {
    getTechClassList({})
  }, [])
  const columns = [
    { title: '技术名称', dataIndex: 'name', key: 'name' },
    {
      title: 'icon', dataIndex: 'icon', key: 'icon',
      render: (text, record) => <Image
        height={50}
        width={50}
        src={HOST_URL + record.icon}
      />
    },

    {
      title: '操作',
      key: 'id',
      render: (text, record) => <Button type="primary" shape="circle" size="small" icon={<EditOutlined />} onClick={() => edit(record)} />,
    },
  ];
  const rowSelection = {
    checkedTable,
    onChange: val => setCheckedTable(val),
  };
  // table props
  const tableProps = {
    size: "small",
    rowSelection,
    rowKey: record => record.id,
    columns,
    dataSource: techClassList
  }
  // modal props
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
    { name: 'name', label: "技术名称", childNode: <Input /> },
  ]

  const searchProps = {
    itemData,
    add,
    reset,
    del,
    onFinish,

  }
  return <>
    <Search {...searchProps}></Search>
    <Table {...tableProps} />
    <Modal {...modalProps}>
      <AddOrEdit {...addOrEditProps}></AddOrEdit>
    </Modal>
  </>
}

export default connect({ attr: 'content', actionCreators })(TechClass)