import { connect } from '@utils'
import actionCreators from '@store/music/actions'
import Select from '@components/Select'
import AddOrEdit from './addOrEdit'
import Search from '@components/Search'
import { Table, Button, Input, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

const columns = [
  { title: '歌曲名称', dataIndex: 'name', key: 'name' },
  { title: '所属专辑', dataIndex: 'age', key: 'collectionId' },
  { title: '歌手', dataIndex: 'address', key: 'authorId' },
  {
    title: '播放地址', key: 'url', dataIndex: 'url',
  },
  {
    title: '操作',
    key: 'id',
    render: (text, record) => <Button type="primary" shape="circle" size="small" icon={<EditOutlined />} />,
  },
];

function SongList(props) {
  const { musicList } = props;
  const [visible, setVisible] = useState(false);
  const add = () => {
    setVisible(true)
  }
  useEffect(() => {
    props.getMusicList({})
  }, [])
  const itemData = [
    { name: 'name', label: "歌曲名", childNode: <Input /> },
    { name: 'authorId', label: "歌手", childNode: <Select placeholder="请选择歌手" dataSource={[]} allowClear /> },
    { name: 'collecttionId', label: "专辑", childNode: <Select placeholder="请选择专辑" dataSource={[]} allowClear /> },
  ]
  const searchProps = {
    itemData,
    add
  }

  const tableProps = {
    rowKey: record => record.id,
    columns,
    dataSource: musicList
  }

  const modalProps = {
    title: '',
    visible,
    footer: null,
    destroyOnClose: false,
    onCancel: () => setVisible(false)
  }
  return <>
    <Search {...searchProps}></Search>
    <Table {...tableProps} />
    <Modal {...modalProps}>
      <AddOrEdit></AddOrEdit>
    </Modal>
  </>
}

export default connect({ attr: 'music', actionCreators })(SongList)