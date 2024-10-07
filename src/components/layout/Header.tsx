import React from "react";
import CurrentUser from "./CurrentUser";
import { Layout, Space } from "antd";

const Header = () => {
  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingInline: "24px",
        background: "white",
        zIndex: 999,
      }}
    >
      <Space align="center" size="middle">
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};

export default Header;
