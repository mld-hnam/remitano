import { Layout, Space } from "antd";
import React, { Suspense } from "react";

import { Footer } from "antd/lib/layout/layout";
import GeneralErrorBoundry from "@/libs/common/generalErrorBoundry";
import { HomeFilled } from "@ant-design/icons";
import PageLoading from "@/components/PageLoading";
import PrivateHeader from "./component/privateHeader";
import PublicHeader from "./component/publicHeader";
import styles from "./style.less";
import { useAuth } from "@/contexts/AuthContext";

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  const { profile } = useAuth();
  return (
    <Layout>
      <Header
        style={{
          background: "#fff",
          height: "72px",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #000",
          alignItems: "center",
        }}
        className={styles.siteLayoutBackground}
      >
        <Space className="logo" style={{ lineHeight: 0 }}>
          <HomeFilled style={{ fontSize: 32 }} />
          <span
            style={{
              fontSize: 32,
              textTransform: "uppercase",
              paddingLeft: 10,
            }}
          >
            Funny Movie
          </span>
        </Space>
        {profile ? <PrivateHeader /> : <PublicHeader />}
      </Header>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              margin: 0,
              padding: 50,
              minHeight: "100vh",
            }}
          >
            <GeneralErrorBoundry>
              <Suspense fallback={<PageLoading />}>{children}</Suspense>
            </GeneralErrorBoundry>
          </Content>
          <Footer style={{ textAlign: "center", color: "#999" }}>
            Copyright © 2022
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
