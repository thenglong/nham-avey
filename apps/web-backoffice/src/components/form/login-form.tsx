import { LockOutlined, MailOutlined } from "@ant-design/icons"
import { Alert, Button, Form, Input } from "antd"
import { motion } from "framer-motion"
import useSignInWithEmailAndPassword from "src/hooks/firebase/use-sign-in-with-email-and-password"
import firebaseService from "src/services/firebase-service"

const { getErrorMessage } = firebaseService

export const LoginForm = () => {
  const { error, signIn, isLoading: isSigningIn } = useSignInWithEmailAndPassword()

  const initialCredential = {
    email: "",
    password: "",
  }

  /**
   * @todo fix unmount memory leak
   * @todo add remember me
   */
  const onLogin = async ({ email, password }: { email: string; password: string }) => {
    await signIn({ email, password })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: error ? 1 : 0,
          marginBottom: error ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={error && getErrorMessage(error)} />
      </motion.div>
      <Form
        layout="vertical"
        name="login-form"
        initialValues={initialCredential}
        onFinish={onLogin}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Please enter a validate email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isSigningIn}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginForm
