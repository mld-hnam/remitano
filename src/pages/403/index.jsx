import React from "react";
import { Button, Space, Result } from "antd";

import Image from "@/assets/images/403.jpg";
import { useNavigate } from "react-router";

import { FormattedMessage } from "react-intl";
import { useAuth } from "@/contexts/AuthContext";

const ForbiddenPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const loginWithAnotherAccount = () => auth.logout();

  return (
    <Result
      style={{
        height: "100vh",
        background: "white",
      }}
      icon={<img alt="403" src={Image} />}
      title={<FormattedMessage id="page.403.title" />}
      subTitle={<FormattedMessage id="page.403.content" />}
      extra={
        <Space direction="vertical">
          <Button size="large" type="primary" onClick={() => navigate("/")}>
            <FormattedMessage id="action.backHome" />
          </Button>
          <Button size="large" type="link" onClick={loginWithAnotherAccount}>
            <FormattedMessage id="page.loginWithAnotherAccount" />
          </Button>
          <Button size="large" type="link" onClick={() => navigate(-1)}>
            <FormattedMessage id="action.tryAgain" />
          </Button>
        </Space>
      }
    />
  );
};

export default ForbiddenPage;
