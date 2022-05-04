import { Form } from 'antd'
function FormItem(props) {
  const { itemData } = props;
  return <>
    {
      itemData.map((item, index) => {
        const { childNode, ...other } = item;
        return <Form.Item key={item.name + index} {...other}>
          {item.childNode}
        </Form.Item>
      })
    }</>
}

export default FormItem