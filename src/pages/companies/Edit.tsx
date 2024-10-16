import React from "react";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutations";
import CustomAvatar from "@/components/CustomAvatar";
import { getNameInitials } from "@/Utilities";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import SelectOptionWithAvatar from "@/components/SelectOptionWithAvatar";
import {
  GetFields,
  GetFieldsFromList,
  GetVariables,
} from "@refinedev/nestjs-query";
import {
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables,
  UsersSelectQuery,
} from "@/graphql/types";

import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from "@/constants";
import { HttpError } from "@refinedev/core";
import ContactsTable from "./ContactsTable";

export const EditPage = () => {
  const { formProps, saveButtonProps, formLoading, query } = useForm<
    GetFields<UpdateCompanyMutation>,
    HttpError,
    GetVariables<UpdateCompanyMutationVariables>
  >({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  const { selectProps, query: selectQuery } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
    optionLabel: "name",
    pagination: { mode: "off" },
  });

  const { name, avatarUrl } = query?.data?.data || {};

  return (
    <div style={{ overflowX: "hidden" }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form {...formProps} layout="vertical">
              <CustomAvatar
                shape="square"
                src={avatarUrl}
                name={getNameInitials(name || "")}
                style={{ width: 96, height: 96, marginBottom: "24px" }}
              />

              <Form.Item
                label="Sales owner"
                name="salesOwnerId"
                initialValue={formProps?.initialValues?.salesOwner?.id}
              >
                <Select
                  {...selectProps}
                  options={selectQuery?.data?.data.map((user) => ({
                    value: user.id,
                    label: (
                      <SelectOptionWithAvatar
                        name={user.name}
                        avatarUrl={user.avatarUrl ?? undefined}
                        shape="circle"
                      />
                    ),
                  }))}
                />
              </Form.Item>

              <Form.Item label="Company size" name="companySize">
                <Select options={companySizeOptions} />
              </Form.Item>

              <Form.Item label="Total revenue" name="totalRevenue">
                <InputNumber
                  autoFocus
                  addonBefore="$"
                  min={0}
                  placeholder="0,00"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
              </Form.Item>

              <Form.Item label="Industry" name="industry">
                <Select options={industryOptions} />
              </Form.Item>

              <Form.Item label="Business type" name="businessType">
                <Select options={businessTypeOptions} />
              </Form.Item>

              <Form.Item label="Country" name="country">
                <Input placeholder="Country" />
              </Form.Item>

              <Form.Item label="Website" name="website">
                <Input placeholder="Website" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>

        <Col xs={24} xl={12}>
          <ContactsTable />
        </Col>
      </Row>
    </div>
  );
};
