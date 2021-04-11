import { Select } from 'antd';
const { Option } = Select;
export default (props) => {
  const {placeholder,allowClear,dataSource} = props
  return <Select allowClear={allowClear} placeholder={placeholder}>
    {
      dataSource.map(item=> <Option value="ddd" key={item.id}>deded</Option>)
    }
  </Select>
}