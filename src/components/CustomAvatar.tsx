import { getNameInitials } from "@/Utilities";
import { Avatar, AvatarProps } from "antd";

type Props = AvatarProps & {
  name?: string;
};

const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <Avatar
      alt={name}
      size="small"
      shape="circle"
      style={{
        display: "flex",
        alignItems: "center",
        border: "none",
        backgroundColor: "#69c0ff",
        ...style,
      }}
      {...rest}
    >
      {getNameInitials(name || "")}
    </Avatar>
  );
};

export default CustomAvatar;
