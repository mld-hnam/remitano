import React from "react";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

export function ActionReaction({ handleLike, handleDislike }) {
  return (
    <Space direction="horizontal">
      <Button
        type="text"
        onClick={handleLike}
        icon={<LikeOutlined style={{ fontSize: 32 }} />}
      />
      <Button
        type="text"
        onClick={handleDislike}
        icon={<DislikeOutlined style={{ fontSize: 32 }} />}
      />
    </Space>
  );
}
