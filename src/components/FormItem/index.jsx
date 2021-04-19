import { Form } from 'antd'
function FormItem(props) {
  const { itemData } = props;
  return <>
    {
      itemData.map((item, index) =>
        <Form.Item key={item.name + index} name={item.name} label={item.label}>
          {item.childNode}
        </Form.Item>
      )
    }</>
}

export default FormItem