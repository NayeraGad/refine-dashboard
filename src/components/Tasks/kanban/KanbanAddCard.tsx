import { Text } from "@/components/text";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

interface Props {
  onClick: () => void;
}

const KanbanAddCard = ({
  children,
  onClick,
}: React.PropsWithChildren<Props>) => {
  return (
    <Button
      size="large"
      style={{
        margin: "16px",
        backgroundColor: "white",
      }}
      icon={<PlusSquareOutlined />}
      onClick={onClick}
    >
      {children ?? (
        <Text size="md" type="secondary">
          Add new task
        </Text>
      )}
    </Button>
  );
};

export default KanbanAddCard;
