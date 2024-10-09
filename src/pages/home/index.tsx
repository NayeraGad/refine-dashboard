import React from "react";
import { Col, Row } from "antd";
import { DealsChart, UpcomingEvents } from "@/components";

export const Home = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Row
        gutter={[32, 32]}
        style={{
          marginTop: "32px",
        }}
      >
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{ height: "460px" }}
        >
          <UpcomingEvents />
        </Col>

        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{ height: "460px", backgroundColor: "turquoise" }}
        >
          <DealsChart />
        </Col>
      </Row>
    </div>
  );
};
