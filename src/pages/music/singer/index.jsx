import FormItem from '@components/FormItem'
import SearchBtn from '@components/SearchBtn'
import { Table, Button, Space, Form, Input, Card, Modal, Image, message } from 'antd';
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import AddOrEdit from './addOrEdit'
import actionCreators from '@store/music/actions'
import { connect } from '@utils'
const { confirm } = Modal;
function Singer(props) {
  const [form] = Form.useForm();
  const { singerList, getSingerList, delSinger } = props;
  const [visible, setVisible] = useState(false);
  const [checkedTable, setCheckedTable] = useState([])
  const [editData, setEditData] = useState({})
  const [handleType, setHandleType] = useState('');


  const AdvancedSearchForm = (props) => {
    const onFinish = (values) => {
      getSingerList(values)
    };
    const reset = () => {
      form.resetFields()
      getSingerList({})
    }

    const itemData = [
      { name: 'name', label: "歌手名称", childNode: <Input /> },
    ]

    const searchProps = {
      form,
      add,
      reset,
      del,
      ...props
    }
    return (
      <Form
        form={form}
        name="advanced_search"
        onFinish={onFinish}
        layout='inline'
        size="small"
      >
        <FormItem itemData={itemData}></FormItem>
        <SearchBtn {...searchProps}></SearchBtn>
      </Form>
    );
  };
  const add = () => {
    setHandleType('add')
    setVisible(true)
  }
  const onCancel = () => {
    setVisible(false)
  }
  const onSelectChange = (checked) => {
    setCheckedTable(checked)
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
        src={window.photoUrl + record.photo}
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
    onChange: onSelectChange,
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
    onCancel,
    destroyOnClose: true,
    footer: null,
    title: handleType === 'add' ? '新增' : '修改'
  }
  // addOrEdit props 
  const addOrEditProps = {
    tableForm: form,
    onCancel,
    editData,
    handleType,
    ...props
  }
  return <>
    <Card bordered={false} className="search">
      <AdvancedSearchForm></AdvancedSearchForm>
    </Card>
    <Table {...tableProps} />
    <Modal {...modalProps}>
      <AddOrEdit {...addOrEditProps}></AddOrEdit>
    </Modal>
  </>
}

export default connect({ attr: 'music', actionCreators })(Singer)