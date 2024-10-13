import React, { memo, useMemo } from "react";
import {
  Button,
  Card,
  ConfigProvider,
  Dropdown,
  MenuProps,
  Space,
  Tag,
  theme,
  Tooltip,
} from "antd";
import { Text } from "../text";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { TextIcon } from "../TextIcon";
import dayjs from "dayjs";
import { getDateColor } from "@/Utilities";
import CustomAvatar from "../CustomAvatar";
import { User } from "@/graphql/schema.types";
import { useDelete, useNavigation } from "@refinedev/core";

// Define the props type for the ProjectCard component
type Props = {
  id: string;
  title: string;
  updatedAt: string;
  dueDate?: string;
  users?: {
    id: string;
    name: string;
    avatarUrl?: User["avatarUrl"];
  }[];
};

// Main ProjectCard component
const ProjectCard = ({ id, title, dueDate, users, updatedAt }: Props) => {
  const { token } = theme.useToken();

  const { edit } = useNavigation();

  const { mutate: deleteCard } = useDelete();

  // Memoized dropdown menu items for card actions
  const dropdownItems = useMemo(() => {
    const dropdownItems: MenuProps["items"] = [
      {
        key: "1",
        label: "View card",
        icon: <EyeOutlined />,
        onClick: () => {
          // TODO Handle edit action
          edit("tasks", id, "replace");
        },
      },
      {
        key: "2",
        label: "Delete card",
        danger: true,
        icon: <DeleteOutlined />,
        // Todo: Handle delete action
        onClick: () => {
          deleteCard({
            resource: "tasks",
            meta: {
              operation: "task",
            },
            id,
          });
        },
      },
    ];

    return dropdownItems;
  }, []);

  // Memoized due date options for displaying the due date
  const dueDateOptions = useMemo(() => {
    if (!dueDate) return null;

    const date = dayjs(dueDate);

    return {
      color: getDateColor({ date: dueDate }) as string,
      text: date.format("MMM DD"), // Format due date
    };
  }, [dueDate]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: "transparent",
          },
        },
      }}
    >
      <Card
        size="small"
        title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
        onClick={() => edit} // Handle click on card to edit
        extra={
          <Dropdown
            trigger={["click"]}
            menu={{
              items: dropdownItems,
            }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button
              icon={<MoreOutlined style={{ rotate: "90deg" }} />}
              shape="circle"
              type="text"
              onPointerDown={(e) => {
                e.stopPropagation(); // Prevent click event from bubbling up
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from bubbling up
              }}
            />
          </Dropdown>
        }
      >
        {/* Card Body */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TextIcon style={{ marginRight: "4px" }} />

          {dueDateOptions && (
            <Tag
              icon={<ClockCircleOutlined style={{ fontSize: "12px" }} />}
              style={{
                marginInlineEnd: "0",
                padding: "0 4px",
                backgroundColor:
                  dueDateOptions.color === "default" ? "transparent" : "unset",
              }}
              color={dueDateOptions.color}
              bordered={dueDateOptions.color !== "default"}
            >
              {/* Display due date text */}
              {dueDateOptions.text}
            </Tag>
          )}

          {!!users?.length && (
            <Space
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "0",
                marginLeft: "auto",
              }}
              size={4}
              wrap
              direction="horizontal"
            >
              {users.map((user) => (
                <Tooltip placement="top" title={user.name} key={user.id}>
                  <CustomAvatar
                    name={user.name}
                    shape="circle"
                    src={user.avatarUrl}
                  />
                </Tooltip>
              ))}
            </Space>
          )}
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default ProjectCard;

export const ProjectCardMemo = memo(ProjectCard, (prev, next) => {
  return (
    prev.users?.length === next.users?.length &&
    prev.id === next.id &&
    prev.title === next.title &&
    prev.dueDate === next.dueDate &&
    prev.updatedAt === next.updatedAt
  );
});
