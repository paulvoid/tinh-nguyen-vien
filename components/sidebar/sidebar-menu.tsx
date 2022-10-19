import { Text } from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export function SidebarMenu({ title, children }: Props) {
  return (
    <Flex css={{ gap: "0.75rem" }} direction={"column"}>
      <Text
        span
        size={"$xs"}
        weight={"normal"}
        css={{
          letterSpacing: "0.04em",
          lineHeight: "1.5",
        }}
      >
        {title}
      </Text>
      {children}
    </Flex>
  );
}
