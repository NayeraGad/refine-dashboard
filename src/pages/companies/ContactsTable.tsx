import { ContactsStatusTag } from "@/components/ContactsStatusTag";
import CustomAvatar from "@/components/CustomAvatar";
import { Text } from "@/components/text";
import { statusOptions } from "@/constants";
import { COMPANY_CONTACTS_TABLE_QUERY } from "@/graphql/queries";
import {
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { FilterDropdown, useTable } from "@refinedev/antd";
import { Button, Card, Input, Select, Space, Table } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const ContactsTable = () => {
  const params = useParams();

  const { tableProps } = useTable({
    resource: "contacts",
    meta: {
      gqlQuery: COMPANY_CONTACTS_TABLE_QUERY,
    },
    syncWithLocation: false,
    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
    },
    filters: {
      initial: [
        {
          field: "name",
          value: "",
          operator: "contains",
        },
        {
          field: "jobTitle",
          value: "",
          operator: "contains",
        },
        {
          field: "status",
          value: undefined,
          operator: "contains",
        },
      ],
      permanent: [
        {
          field: "company.id",
          value: params?.id as string,
          operator: "eq",
        },
      ],
    },
  });

  return (
    <Card
      styles={{
        header: {
          marginBottom: "1px",
          borderBottom: "1px solid #d9d9d9",
        },
        body: {
          padding: 0,
        },
      }}
      title={
        <Space size="middle">
          <TeamOutlined />
          <Text>Contacts</Text>
        </Space>
      }
      extra={
        <>
          <Text>Total contacts:</Text>
          <Text>
            {tableProps?.pagination !== false && tableProps.pagination?.total}
          </Text>
        </>
      }
    >
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: false,
        }}
      >
        <Table.Column
          title="Name"
          dataIndex="name"
          render={(_, record) => (
            <Space>
              <CustomAvatar name={record.name} src={record.avatarUrl} />

              <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
            </Space>
          )}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Name" />
            </FilterDropdown>
          )}
          fixed='left'
        />

        <Table.Column
          title="Title"
          dataIndex="jobTitle"
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Title" />
            </FilterDropdown>
          )}
        />

        <Table.Column
          title="Stage"
          dataIndex="status"
          render={(_, record) => <ContactsStatusTag status={record.status} />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ width: "200px" }}
                placeholder="Select Stage"
                mode="multiple"
                options={statusOptions}
              ></Select>
            </FilterDropdown>
          )}
        />

        <Table.Column
          dataIndex="id"
          width={112}
          render={(_, record) => (
            <Space>
              <Button
                size="small"
                href={`mailto:${record.email}`}
                icon={<MailOutlined />}
              />

              <Button
                size="small"
                href={`tel:${record.phone}`}
                icon={<PhoneOutlined />}
              />
            </Space>
          )}
        />
      </Table>
    </Card>
  );
};

export default ContactsTable;
