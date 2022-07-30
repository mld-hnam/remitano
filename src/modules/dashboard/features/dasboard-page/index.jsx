import MainLayout from "@/layouts/main";
import Post from "./component/post";
import React from "react";
import { Space } from "antd";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { post: posts } = useAuth();
  return (
    <MainLayout>
      <Space
        direction="vertical"
        style={{ alignItems: "center", width: "100%" }}
      >
        {posts.map((post) => (
          <Post key={post.url} {...post} />
        ))}
      </Space>
    </MainLayout>
  );
}
