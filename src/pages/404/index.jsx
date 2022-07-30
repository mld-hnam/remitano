import { Result, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { FormattedMessage } from "react-intl";
import { HomeFilled } from "@ant-design/icons";

const NoFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      icon={null}
      title={<FormattedMessage id="page.404.title" />}
      subTitle={<FormattedMessage id="page.404.content" />}
      extra={
        <Button
          type="primary"
          onClick={() => navigate("/")}
          icon={<HomeFilled />}
        >
          <span>
            <FormattedMessage id="action.backHome" />
          </span>
        </Button>
      }
    />
  );
};
export default NoFoundPage;
