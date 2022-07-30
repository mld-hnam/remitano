import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";

import React from "react";
import { Space } from "antd";

export function Reaction({ like, dislike }) {
  return (
    <Space direction="horizontal">
      <Space>
        <LikeOutlined />
        {like}
      </Space>
      <Space>
        <DislikeOutlined />
        {dislike}
      </Space>
    </Space>
  );
}
