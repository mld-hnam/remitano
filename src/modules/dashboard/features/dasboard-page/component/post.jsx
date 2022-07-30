import { ActionReaction } from "./actionReaction";
import React from "react";
import { Reaction } from "./reaction";
import { Space } from "antd";
import { useAuth } from "@/contexts/AuthContext";

export default function Post({
  url,
  mime,
  title,
  sharedBy,
  like,
  dislike,
  description,
}) {
  const { profile } = useAuth();
  return (
    <Space
      direction="horizontal"
      style={{
        justifyContent: "center",
        alignItems: "flex-start",
        marginBottom: 24,
      }}
    >
      <iframe
        width="560"
        height="315"
        src={url}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <Space
        direction="vertical"
        style={{
          width: "400px",
          height: "200px",
          marginBottom: 24,
          paddingLeft: 24,
        }}
      >
        <span style={{ color: "red", fontSize: 24 }}>{title}</span>
        <Space direction="horizontal">
          <span>Shared by: {sharedBy}</span>
          {profile && (
            <ActionReaction handleDislike={() => {}} handleLike={() => {}} />
          )}
        </Space>
        <Reaction like={like} dislike={dislike} />
        <span>Description: {description}</span>
      </Space>
    </Space>
  );
}
