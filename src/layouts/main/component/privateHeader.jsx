import { Button, Space, Typography } from "antd";

import { FormattedMessage } from "react-intl";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";

export default function PrivateHeader() {
  const { logout, profile } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      logout();
    } catch (error) {}
  };
  const handleRedirectShare = () => {
    navigate("/share");
  };
  return (
    <Space>
      <Typography>
        <FormattedMessage id="common_welcome" />
        {profile?.name}
      </Typography>
      <Button
        block
        size="large"
        htmlType="submit"
        onClick={handleRedirectShare}
        data-testid="login-btn"
      >
        <FormattedMessage id="action.shareMovie" />
      </Button>
      <Button
        block
        size="large"
        htmlType="submit"
        onClick={onSubmit}
        data-testid="login-btn"
      >
        <FormattedMessage id="action.logout" />
      </Button>
    </Space>
  );
}
