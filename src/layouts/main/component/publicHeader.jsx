import { Button, Form, Input } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import React, { useEffect } from "react";

import styles from "./publicHead.less";
import { useAuth } from "@/contexts/AuthContext";

export default function PublicHeader() {
  const { formatMessage } = useIntl();
  const [form] = Form.useForm();
  const { setUser } = useAuth();

  useEffect(() => {});

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      setUser(values);
    } catch (error) {}
  };

  return (
    <div className={styles.header}>
      <Form form={form} colon={false} layout="inline">
        <Form.Item
          name="email"
          rules={[
            {
              whitespace: true,
              message: formatMessage({
                id: "email.required",
              }),
            },
            {
              required: true,
              type: "email",
              message: "",
            },
          ]}
        >
          <Input
            name="email"
            size="large"
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
              message: "",
            },
          ]}
        >
          <Input.Password
            size="large"
            name="password"
            placeholder={formatMessage({ id: "common_password" })}
            data-testid="password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            size="large"
            htmlType="submit"
            onClick={onSubmit}
            data-testid="login-btn"
          >
            <FormattedMessage id="action.login/register" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
