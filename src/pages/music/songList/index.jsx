import { connect } from '@utils'
import actionCreators from '@store/music/actions'
import Select from '@components/Select'
import AddOrEdit from './addOrEdit'
import { Table, Button, Space, Form, Input, Card, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
const AdvancedSearchForm = (props) => {
  const { openModal } = props
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const add = () => {
    openModal({ type: 'add' })
  }

  const ItemData = [
    { name: 'name', label: "歌曲名", childNode: <Input /> },
    { name: 'authorId', label: "歌手", childNode: <Select placeholder="请选择歌手" dataSource={[]} allowClear /> },
    { name: 'collecttionId', label: "专辑", childNode: <Select placeholder="请选择专辑" dataSource={[]} allowClear /> },
  ]

  const SearchFrom = [
    { type: 'primary', htmlType: 'submit', icon: <SearchOutlined />, onClick: () => { form.resetFields() } },
    { type: 'primary', icon: <ReloadOutlined /> },
    { type: 'primary', icon: <PlusOutlined />, onClick: add },
    { type: 'primary', danger: true, icon: <DeleteOutlined /> },
  ]

  return (
    <Form
      form={form}
      name="advanced_search"
      onFinish={onFinish}
      layout='inline'
      size="small"
    >
      {
        ItemData.map(item =>
          <Form.Item key={item.name} name={item.name} label={item.label}>
            {item.childNode}
          </Form.Item>
        )
      }
      <Space>
        {SearchFrom.map((item, index) => <Button {...item} key={index}></Button>)}
      </Space>
    </Form>
  );
};
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
  const handleOk = () => {

  }
  const openModal = ({ type }) => {
    if (type === 'add') setVisible(true)

  }
  useEffect(() => {
    props.getMusicList()
  }, [])
  return <>
    <Card bordered={false} className="search">
      <AdvancedSearchForm {...props} openModal={openModal}></AdvancedSearchForm>
    </Card>
    <Table rowKey={record => record.id} columns={columns} dataSource={musicList} />
    <Modal title="Basic Modal" visible={visible} footer={null} onCancel={() => setVisible(false)}>
      <AddOrEdit></AddOrEdit>
    </Modal>
  </>
}

export default connect({ attr: 'music', actionCreators })(SongList)