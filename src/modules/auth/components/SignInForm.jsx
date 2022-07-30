import { Button, Form, Input } from "antd";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import { useAuthLogin } from "@/modules/auth/services";
import styles from "./SignInForm.less";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function SignInForm() {
  const { formatMessage } = useIntl();
  const [form] = Form.useForm();

  const { mutateAsync: login, isLoading } = useAuthLogin();
  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      login(values, {
        onSuccess: () => navigate("/"),
      });
    } catch (error) {}
  };

  return (
    <div className={styles.wrapper}>
      <Form form={form} className={styles.form}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              whitespace: true,
              message: formatMessage({
                id: "email.required",
              }),
            },
            {
              type: "email",
              message: formatMessage({
                id: "email.invalid",
              }),
            },
          ]}
        >
          <Input
            addonBefore={<UserOutlined />}
            name="email"
            size="large"
            className={styles.input}
            placeholder={formatMessage({ id: "common_email" })}
            data-testid="common_email"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              whitespace: true,
              message: formatMessage({
                id: "password.required",
              }),
            },
          ]}
        >
          <Input.Password
            size="large"
            name="password"
            addonBefore={<LockOutlined />}
            className={styles.password}
            placeholder={formatMessage({ id: "common_password" })}
            data-testid="password"
          />
        </Form.Item>
        <Form.Item className={styles.forgotPassword}>
          <Button
            type="link"
            style={{ padding: "0 0" }}
            data-testid="reset-password-btn"
            // onClick={onResetPassword}
          >
            <Link
              to="/auth/reset-password"
              style={{ fontSize: 14, lineHeight: "32px" }}
            >
              <FormattedMessage id="account_forgot_password" />
            </Link>
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
            onClick={onSubmit}
            data-testid="login-btn"
          >
            <FormattedMessage id="action.login" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
