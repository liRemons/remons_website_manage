import { connect } from '@utils'
import actionCreators from '@store/music/actions'
import AddOrEdit from './addOrEdit'
import Search from '@components/Search'
import { Table, Button, Input, Modal, Select, message, Form } from 'antd';
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
const { Option } = Select
const { confirm } = Modal
function SongList(props) {
  const [form] = Form.useForm();
  const { musicList, getMusicList, getSingerList, getCollectionList, singerList, collectionList, delSong } = props;
  const [visible, setVisible] = useState(false);
  const [checkedTable, setCheckedTable] = useState([])
  const [handleType, setHandleType] = useState('');
  const [editData, setEditData] = useState({})
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
        const res = await delSong({ ids: checkedTable })
        if (res.success) {
          getMusicList(form.getFieldsValue())
          message.success(res.msg)
        }
      },
      onCancel() { },
    });

  }

  const edit = (data) => {
    setHandleType('edit');
    setEditData(data)
    setVisible(true)
  }
  const onFinish = (val) => {
    getMusicList(val)
  }
  useEffect(() => {
    getMusicList({})
    getSingerList({})
    getCollectionList({})
  }, [])
  const itemData = [
    { name: 'name', label: "歌曲名", childNode: <Input /> },
    {
      name: 'authorId', label: "歌手", childNode:
        <Select placeholder="请选择歌手" allowClear >
          {singerList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
        </Select>
    },
    {
      name: 'collectionId', label: "专辑", childNode:
        <Select placeholder="请选择专辑" allowClear>
          {collectionList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
        </Select>
    },
  ]
  const searchProps = {
    itemData,
    add,
    del,
    onFinish
  }

  const columns = [
    { title: '歌曲名称', dataIndex: 'name', key: 'name' },
    { title: '所属专辑', dataIndex: 'collectionName', key: 'collectionId' },
    { title: '歌手', dataIndex: 'authorName', key: 'authorId' },
    {
      title: '播放地址', key: 'url', dataIndex: 'url',
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

  const tableProps = {
    rowKey: record => record.id,
    columns,
    dataSource: musicList,
    rowSelection
  }

  const modalProps = {
    title: handleType === 'add' ? '新增' : "修改",
    visible,
    footer: null,
    destroyOnClose: true,
    onCancel: () => setVisible(false)
  }

  const addOrProps = {
    onCancel: () => setVisible(false),
    itemData,
    handleType,
    editData,
    ...props
  }
  return <>
    <Search {...searchProps}></Search>
    <Table {...tableProps} />
    <Modal {...modalProps}>
      <AddOrEdit {...addOrProps}></AddOrEdit>
    </Modal>
  </>
}

export default connect({ attr: 'music', actionCreators })(SongList)