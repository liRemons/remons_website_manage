import { connect } from '@utils';
import { HOST_URL } from '@config';
import actionCreators from '@store/content/actions'
import AddOrEdit from './addOrEdit';
import { download } from 'methods-r';
import Search from '@components/Search'
import { Table, Button, Input, Modal, Select, message, Form } from 'antd';
import { EditOutlined, ExclamationCircleOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
const { Option } = Select
const { confirm } = Modal
function Article(props) {
  const [form] = Form.useForm();
  const { techArticleList, downloadMarkdown, getArticleList, getArticleDetail, getTechClassList, techClassList, delArticle, history, getUser } = props;
  const [visible, setVisible] = useState(false);
  const [checkedTable, setCheckedTable] = useState([])
  const [handleType, setHandleType] = useState('');
  const add = () => {
    setHandleType('add')
    setVisible(true)
  }


  const exportMarkdown = async () => {
    const res = await downloadMarkdown();
    if (res.success) {
      message.success('成功');
      download(`${HOST_URL}${res.path}`)
    }
  }

  const del = () => {
    if (checkedTable.length === 0) return
    confirm({
      title: '删除后不可恢复，确认?',
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: '确定',
      async onOk() {
        const res = await delArticle({ ids: checkedTable })
        if (res.success) {
          getArticleList(form.getFieldsValue())
          message.success(res.msg)
        }
      },
      onCancel() { },
    });

  }

  const edit = async (data) => {
    setHandleType('edit');
    await getArticleDetail({ id: data.id })
    // setEditData(data)
    setVisible(true)
  }
  const onFinish = (val) => {
    getArticleList(val)
  }
  useEffect(() => {
    getArticleList({})
    getTechClassList({})
    getUser({})
  }, [])
  const itemData = [
    { name: 'title', label: "标题", childNode: <Input /> },
    {
      name: 'techClassId', label: "所属分类", childNode:
        <Select allowClear >
          {techClassList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
        </Select>
    },

  ]
  const searchProps = {
    itemData,
    add,
    del,
    onFinish,
    btnItems: [
      { icon: <VerticalAlignBottomOutlined />, type: 'primary', onClick: exportMarkdown }
    ]
  }

  const columns = [
    { title: '文章名称', dataIndex: 'title', key: 'title' },
    { title: '所属分类', dataIndex: 'techClassName', key: 'techClassName' },
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

  const tableProps = {
    rowKey: record => record.id,
    columns,
    dataSource: techArticleList,
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
    ...props
  }
  return <>
    <Search {...searchProps}></Search>
    <Table {...tableProps} />
    <Modal {...modalProps} width={1000}>
      <AddOrEdit {...addOrProps}></AddOrEdit>
    </Modal>
  </>
}

export default connect({ attr: 'content', actionCreators })(Article)