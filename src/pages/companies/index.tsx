import React from "react";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  useTable,
} from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { Input, Space, Table } from "antd";
import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { SearchOutlined } from "@ant-design/icons";
import CustomAvatar from "@/components/CustomAvatar";
import { Text } from "@/components/text";
import { Company } from "@/graphql/schema.types";
import { currencyNumber } from "@/Utilities";

export const Companies = () => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "companies",
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
    onSearch: (value) => {
        return [
            {
                field: 'name',
                operator: 'contains',
                value: value.name
            }
        ]
    },
    pagination: {
      pageSize: 12,
    },
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
          operator: "contains",
          value: undefined,
        },
      ],
    },
  });
  console.log(tableProps);
  

  return (
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
          onClick={() => {
            go({
              to: {
                resource: "companies",
                action: "create",
              },
              options: {
                keepQuery: true,
              },
              // There are three types: 'replace, 'push', 'reload'
              type: "replace",
            });
          }}
        />
      )}
    >
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: () => (
            <Text>{tableProps?.pagination?.total} companies in total</Text>
          ),
        }}
      >
        <Table.Column<Company>
          dataIndex="name"
          title="Company title"
          defaultFilteredValue={getDefaultFilter("id", filters)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Company" />
            </FilterDropdown>
          )}
          render={(value, record) => (
            <Space>
              <CustomAvatar
                shape="square"
                name={record.name}
                src={record.avatarUrl}
              />
              <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
            </Space>
          )}
        />

        <Table.Column<Company>
          dataIndex="totalRevenue"
          title="Open deals amount"
          render={(value, company) => (
            <Text>
              {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
            </Text>
          )}
        />

        <Table.Column
          dataIndex="id"
          title="Actions"
          fixed="right"
          render={(value) => (
            <Space>
              <EditButton hideText size="small" recordItemId={value} />
              <DeleteButton hideText size="small" recordItemId={value} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
