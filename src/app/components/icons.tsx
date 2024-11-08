import React from "react";
import { IoDocument } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { IconsEnum } from "@src/types/icons";

const Icons = {
  [IconsEnum.document]: <IoDocument />,
  [IconsEnum.profile]: <FaCircleUser />,
};

export default Icons;
