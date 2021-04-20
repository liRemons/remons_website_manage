import Search from '@components/Search'
import Image from '@components/Image'
import { Table, Button, Form, Input, Modal, message } from 'antd';
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import AddOrEdit from './addOrEdit'
import actionCreators from '@store/music/actions'
import { connect } from '@utils'
import { HOST_URL } from '@config'
const { confirm } = Modal;
function Singer(props) {
  const [form] = Form.useForm();
  const { singerList, getSingerList, delSinger } = props;
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
        const res = await delSinger({ ids: checkedTable })
        if (res.success) {
          props.getSingerList(form.getFieldsValue())
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
    getSingerList(values)
  };
  const reset = () => {
    getSingerList({})
  }
  useEffect(() => {
    getSingerList({})
  }, [])
  const columns = [
    { title: '歌手名称', dataIndex: 'name', key: 'name' },
    {
      title: '歌手图片', dataIndex: 'photo', key: 'photo',
      render: (text, record) => <Image
        height={50}
        width={50}
        src={HOST_URL + record.photo}
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
    dataSource: singerList
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
    { name: 'name', label: "歌手名称", childNode: <Input /> },
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

export default connect({ attr: 'music', actionCreators })(Singer)