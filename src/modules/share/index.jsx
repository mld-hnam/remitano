import { Button, Form, Input } from "antd";
import { FormattedMessage, useIntl } from "react-intl";

import MainLayout from "@/layouts/main";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";
import { youtubeLinkParser } from "@/utils/utils";

export default function SharedForm() {
  const { post, setPost, profile } = useAuth();
  const { formatMessage } = useIntl();
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const item = {
        url: values.url,
        mime: "video/mp4",
        title: values.url,
        sharedBy: profile.email,
        like: 0,
        dislike: 0,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quidem molestiae laborum cupiditate, libero natus! Aliquam ad mollitia in aperiam dolor, ea fugit? Exercitationem cum id delectus, commodi soluta sed!",
      };
      setPost([...post, item]);
      navigate("/");
    } catch (error) {}
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          {...layout}
          form={form}
          style={{
            position: "relative",
            width: "600px",
            border: "2px solid #000",
            padding: 32,
          }}
          colon={false}
        >
          <span
            style={{
              position: "absolute",
              top: "-16px",
              left: "8px",
              backgroundColor: "    #f0f2f5",
            }}
          >
            Share a Youtube movie
          </span>
          <Form.Item
            label="Youtube Url:"
            name="url"
            rules={[
              {
                required: true,
                whitespace: true,
                message: formatMessage({
                  id: "url.required",
                }),
              },
            ]}
          >
            <Input size="large" data-testid="common_url" autoFocus />
          </Form.Item>
          <Form.Item label=" ">
            <Button
              block
              type="primary"
              size="large"
              htmlType="submit"
              onClick={onSubmit}
              data-testid="login-btn"
            >
              <FormattedMessage id="action.share" />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </MainLayout>
  );
}
