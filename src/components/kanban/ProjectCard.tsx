import { Button, Card, ConfigProvider, Dropdown, MenuProps, theme } from "antd";
import React, { useMemo } from "react";
import { Text } from "../text";
import { DeleteOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";

type Props = {
  id: string;
  title: string;
  updatedAt: string;
  dueDate?: string;
  users?: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];
};

const ProjectCard = ({ id, title, dueDate, users }: Props) => {
  const { token } = theme.useToken();

  const dropdownItems = useMemo(() => {
    const dropdownItems: MenuProps["items"] = [
      {
        key: "1",
        label: "View card",
        icon: <EyeOutlined />,
        onClick: () => {
          edit();
        },
      },
      {
        key: "2",
        label: "Delete card",
        danger: true,
        icon: <DeleteOutlined />,
        onClick: () => {},
      },
    ];

    return dropdownItems;
  }, []);

  const edit = () => {};

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
        onClick={() => edit()}
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
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Dropdown>
        }
      ></Card>
    </ConfigProvider>
  );
};

export default ProjectCard;
