import React, { ReactNode, useEffect } from "react";
import {
    Avatar,
    Box,
    BoxProps,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    useDisclosure, useToast,
    VStack,
    Link
} from "@chakra-ui/react";
import NextLink  from "next/link";
import { FiActivity, FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { MdHistory } from "react-icons/md";
import { IconType } from "react-icons";
import { logout, setUserInfo } from "../../state/slices/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

interface LinkItemProps {
    name: string;
    icon: IconType;
    href: string;
}

const LinkItems: Array<LinkItemProps> = [
    { name: "Hoạt Động", icon: FiActivity, href: "/user" },
    { name: "Lịch Sử Tham Gia", icon: MdHistory, href: "/user/history" },
];
const AdminLinkItems: Array<LinkItemProps> = [
    { name: "Quản Lý Hoạt Động", icon: FiActivity, href: "/admin" },
    {
        name: "Quản Lý Tình Nguyện Viên",
        icon: MdHistory,
        href: "/admin/users",
    },
];
// props user
function SidebarWithHeader({ children, user }: { children: ReactNode, user: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const getUser = () => {};

    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: "none", md: "block" }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} user={user} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

export default SidebarWithHeader;

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    // current url
    const router = useRouter();
    const [isUser, setIsUser] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);
    useEffect(() => {
        if (router.pathname.startsWith("/user")) {
            setIsUser(true);
        } else if (router.pathname.startsWith("/admin")) {
            setIsAdmin(true);
        }
    }, [router.pathname]);
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    TST
                </Text>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>

            {isUser &&
                LinkItems.map((link) => (
                    <NavItem key={link.name} icon={link.icon} href={link.href}>
                        {link.name}
                    </NavItem>
                ))}
            {isAdmin &&
                AdminLinkItems.map((link) => (
                    <NavItem key={link.name} icon={link.icon} href={link.href}>
                        {link.name}
                    </NavItem>
                ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: string | number;
    href: string;
}

const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
    return (
        <Link as={NextLink}
            href={href}
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "cyan.400",
                    color: "white",
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white",
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
    user: any;
}

const MobileNav = ({ onOpen: onOpen, user ,...rest }: MobileProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const role = useSelector((state: any) => state.auth.role);
    const [isAdmin, setIsAdmin] = React.useState(false);
    useEffect(() => {
        if (role === "admin") {
            setIsAdmin(true);
        }
    }, [role]);
    const userName = useSelector((state: any) => state.auth.userName);
    const [name, setName] = React.useState("");
    useEffect(() => {
        setName(userName);
    }, [userName]);
    const toast = useToast();

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: "flex", md: "none" }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                TST
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                />
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                        >
                            <HStack>
                                <Avatar size={"sm"} />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">{name}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {isAdmin ? "Admin" : "Người dùng"}
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue("white", "gray.900")}
                            borderColor={useColorModeValue("gray.200", "gray.700")}
                        >
                            <MenuItem onClick={()=>{
                                // clipboard
                                navigator.clipboard.writeText(user.identifier);
                                toast({
                                    title: "Đã sao chép mã định danh",
                                    status: "success",
                                    duration: 3000,
                                    isClosable: true,
                                });
                            }}>Mã định danh</MenuItem>
                            {isAdmin && (
                                <MenuItem
                                    onClick={() => {
                                        router.push("/admin");
                                    }}
                                >
                                    Cổng quản trị
                                </MenuItem>
                            )}
                            <MenuItem>Cài đặt</MenuItem>
                            <MenuDivider />
                            <MenuItem
                                onClick={() => {
                                    dispatch(logout());
                                    deleteCookie("token");
                                    router.push("/login");
                                }}
                            >
                                Đăng xuất
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
