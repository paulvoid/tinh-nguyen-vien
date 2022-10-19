import { Text, Link } from "@nextui-org/react";
import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "../layout/layout-context";
import { Flex } from "../styles/flex";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export function SidebarItem({ icon, title, isActive, href = "" }: Props) {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink href={href}>
      <Link
        css={{
          color: "var(--nextui-colors-accents9)",
          maxWidth: "100%",
        }}
      >
        <Flex
          onClick={handleClick}
          css={{
            gap: "0.75rem",
            width: "100%",
            minHeight: "44px",
            height: "100%",
            alignItems: "center",
            "padding-left": "0.875rem",
            "padding-right": "0.875rem",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.15s ease",
            "&:active": {
              transform: "scale(0.98)",
            },
            ...(isActive
              ? {
                  background: "$blue200",
                  "& svg path": {
                    fill: "$blue600",
                  },
                }
              : { "&:hover": { background: "var(--nextui-colors-accents2)" } }),
          }}
          align={"center"}
        >
          {icon}
          <Text
            span
            weight={"normal"}
            size={"$base"}
            css={{
              color: "var(--nextui-colors-accents9)",
            }}
          >
            {title}
          </Text>
        </Flex>
      </Link>
    </NextLink>
  );
}
