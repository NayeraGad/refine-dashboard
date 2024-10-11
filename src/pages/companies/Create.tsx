import React from "react";
import { Companies } from ".";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { CREATE_COMPANY_MUTATION } from "@/graphql/mutations";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import SelectOptionWithAvatar from "@/components/SelectOptionWithAvatar";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";

export const Create = () => {
  const go = useGo();

  const goToListPage = () => {
    go({
      to: { resource: "companies", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm({
    redirect: false,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
    action: "create",
    defaultVisible: true,
    resource: "companies",
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
  });

  const { selectProps, query } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: "users",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
    optionLabel: "name",
  });

  return (
    <Companies>
      <Modal
        {...modalProps}
        mask={true}
        title="Create Company"
        onCancel={goToListPage}
        width={512}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="Company name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please enter a company name" />
          </Form.Item>

          <Form.Item
            label="Sales owner"
            name="salesOwnerId"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Please enter sales owner user"
              {...selectProps}
              options={
                query.data?.data.map((user) => ({
                  value: user.id,
                  label: (
                    <SelectOptionWithAvatar
                      name={user.name}
                      avatarUrl={user.avatarUrl ?? undefined}
                    />
                  ),
                })) ?? []
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </Companies>
  );
};
