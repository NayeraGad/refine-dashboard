import React from "react";
import { useModalForm } from "@refinedev/antd";
import { CREATE_TASK_MUTATION } from "@/graphql/mutations";
import { Form, Input, Modal } from "antd";
import { useSearchParams } from "react-router-dom";
import { useNavigation } from "@refinedev/core";

const CreateTaskPage = () => {
  const { formProps, modalProps, close } = useModalForm({
    action: "create",
    meta: {
      gqlMutation: CREATE_TASK_MUTATION,
    },
    defaultVisible: true,
  });

  // Get search parameters from the URL
  const [searchParams] = useSearchParams();

  // Get navigation methods
  const { list } = useNavigation();

  return (
    <Modal
      {...modalProps}
      title="Add new card"
      onCancel={() => {
        close();

        // Navigate to the task list page
        list("tasks", "replace");
      }}
      width={512}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps?.onFinish?.({
            ...values,
            // Get stageId from search parameters
            stageId: searchParams.get("stageId")
              ? Number(searchParams.get("stageId")) // Convert to number if present
              : null,
            userIds: [],
          });
        }}
      >
        <Form.Item label="Title" name="title" required>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskPage;
