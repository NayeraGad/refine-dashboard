import { UnorderedListOutlined } from "@ant-design/icons";
import { Card, List, Space } from "antd";
import React from "react";
import { Text } from "../text";
import LatestActivitiesSkeleton from "../skeleton/latest-activities";
import { useList } from "@refinedev/core";
import {
  DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
  DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
} from "@/graphql/queries";
import dayjs from "dayjs";
import CustomAvatar from "../CustomAvatar";

const DashboardLatestActivities = () => {
  const {
    data: audit,
    isLoading: isLoadingAudit,
    isError,
    error,
  } = useList({
    resource: "audits",
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    },
    pagination: { pageSize: 5 },
  });

  const dealIds = audit?.data?.map((audit) => audit?.targetId);

  const { data: deals } = useList({
    resource: "deals",
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
    },
    queryOptions: {
      enabled: !!dealIds?.length,
    },
    pagination: {
      mode: "off",
    },
    filters: [
      {
        field: "id",
        operator: "in",
        value: dealIds,
      },
    ],
  });

  if (isError) {
    console.log(error);
    return null;
  }

  return (
    <Card
      styles={{ header: { padding: "16px" }, body: { padding: "0 1rem" } }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UnorderedListOutlined />
          <Text size="sm" style={{ marginLeft: "0.5rem" }}>
            Latest activities
          </Text>
        </div>
      }
    >
      {isLoadingAudit ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, i) => ({
            id: i,
          }))}
          renderItem={(_, index) => <LatestActivitiesSkeleton key={index} />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={audit?.data}
          renderItem={(item) => {
            const deal =
              deals?.data.find((deal) => deal.id == item.targetId) || undefined;

            return (
              <List.Item>
                <List.Item.Meta
                  title={dayjs(deal?.createdAt).format("MMM DD, YYYY - HH:MM")}
                  avatar={
                    <CustomAvatar
                      shape="square"
                      size={48}
                      src={deal?.company.avatarUrl}
                      name={deal?.company.name}
                    />
                  }
                  description={
                    <Space
                      size={4}
                      style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      <Text strong>{item.user?.name}</Text>

                      <Text>
                        {item.action === "CREATE" ? "created" : "moved"}
                      </Text>

                      <Text strong> {deal?.title} </Text>

                      <Text>deal {item.action === "CREATE" ? "in" : "to"}</Text>

                      <Text strong> {deal?.stage?.title || "Unassigned"} </Text>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};

export default DashboardLatestActivities;
