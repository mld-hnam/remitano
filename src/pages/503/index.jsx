import React from "react";
import { DefaultError } from "@/components";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { FormattedMessage } from "react-intl";

const Page503 = () => {
  const navigate = useNavigate();

  return (
    <DefaultError
      title={<FormattedMessage id="page.503.title" />}
      content={<FormattedMessage id="page.503.content" />}
      actions={
        <Button
          type="link"
          style={{ fontWeight: "bold" }}
          size={40}
          onClick={navigate(-1)}
        >
          <FormattedMessage id="action.tryAgain" />
        </Button>
      }
    />
  );
};
export default Page503;
