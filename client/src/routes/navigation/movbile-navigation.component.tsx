import React from "react";
import {
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { NavItem } from "./navigation.component";
import { useNavigate } from "react-router-dom";
type MobileNavProps = {
  navItems: NavItem[];
};

const MobileNav = ({ navItems}: MobileNavProps) => {
  return (
    <Stack
      bg={useColorModeValue("transparent", "transparent")}
      p={4}
      display={{ md: "none" }}
    >
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, path}: NavItem) => {
  const { onToggle } = useDisclosure();
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Flex
        py={2}
        as={Link}
        onClick={() => navigateTo(path ?? "")}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color={useColorModeValue("white", "white")}>
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};

export default MobileNav;
