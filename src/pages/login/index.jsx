import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { encrypt } from '@utils';
import { connect } from '@utils'
import { DES_KEY, DES_IV } from '@config'
import actionCreators from '@store/user/actions';
import styled from './index.module.less'
const NormalLoginForm = (props) => {
  const { userLogin } = props;
  const onFinish = async (values) => {
    const { pwd, account } = values
    const res = await userLogin({
      account,
      password: encrypt({ DES_IV, DES_KEY, MSG: pwd })
    })
    if (res?.success) {
      message.success('成功')
      localStorage.setItem('REMONS_TOKEN', res.data.token);
      const params = new URLSearchParams(props.history.location.search);
      if (params.get('form')) {
        window.location.href = params.get('form')
      } else {
        props.history.replace('/manange/home')
      }
    }
  };

  return (
    <div className={styled.login}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="account"
          rules={[
            {
              required: true,
              message: '请输入账号!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="账号" />
        </Form.Item>
        <Form.Item
          name="pwd"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>

  );
};


export default connect({ attr: 'user', actionCreators })(NormalLoginForm)