import {
  Accordion,
  DescriptionForm,
  DescriptionHeader,
  DueDateForm,
  DueDateHeader,
  StageForm,
  TitleForm,
  UsersForm,
  UsersHeader,
} from "@/components";
import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";
import { Task } from "@/graphql/schema.types";
import {
  AlignLeftOutlined,
  FieldTimeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { DeleteButton, useModalForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";
import { Form, Modal } from "antd";
import React, { useState } from "react";

const EditTaskPage = () => {
  const [activeKey, setActiveKey] = useState<string | undefined>();

  const {
    modalProps,
    query: queryResult,
    close,
  } = useModalForm<Task>({
    action: "edit",
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
    defaultVisible: true,
  });

  const { title, description, dueDate, users } = queryResult?.data?.data ?? {};

  const isLoading = queryResult?.isLoading ?? true;

  const { list } = useNavigation();

  return (
    <Modal
      {...modalProps}
      title={<TitleForm initialValues={{ title }} isLoading={isLoading} />}
      onCancel={() => {
        close();

        list("tasks", "replace");
      }}
      width={586}
      footer={
        <DeleteButton
          type="link"
          onSuccess={() => {
            list("tasks", "replace");
          }}
        >
          Delete Card
        </DeleteButton>
      }
    >
      <StageForm isLoading={isLoading} />

      {/* Description's Accordion */}
      <Accordion
        accordionKey="description"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<DescriptionHeader description={description} />}
        isLoading={isLoading}
        icon={<FieldTimeOutlined />}
        label="Description"
      >
        <DescriptionForm
          initialValues={{ description }}
          cancelForm={() => setActiveKey(undefined)}
        />
      </Accordion>

      {/* Due date's Accordion */}
      <Accordion
        accordionKey="dueDate"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<DueDateHeader dueData={dueDate} />}
        isLoading={isLoading}
        icon={<AlignLeftOutlined />}
        label="Due Date"
      >
        <DueDateForm
          initialValues={{ dueDate: dueDate ?? undefined }}
          cancelForm={() => setActiveKey(undefined)}
        />
      </Accordion>

      {/* Users' Accordion */}
      <Accordion
        accordionKey="users"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<UsersHeader users={users} />}
        isLoading={isLoading}
        icon={<UsergroupAddOutlined />}
        label="Users"
      >
        <UsersForm
          initialValues={{
            userIds: users?.map((user) => ({
              value: user.id,
              label: user.name,
            })),
          }}
          cancelForm={() => setActiveKey(undefined)}
        />
      </Accordion>
    </Modal>
  );
};

export default EditTaskPage;
