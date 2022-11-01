import {
    Box,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Input, HStack, FormControl, FormLabel, Button
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import SidebarWithHeader from "../../components/layout/layout";
import {CSVLink} from "react-csv";
import React from "react";
import axios from "axios";

function Users({data,user}: { data: any, user: any }) {
    const router = useRouter();
    const [filter, setFilter] = React.useState("");
    const filteredData = data.filter((user: any) => {
        return user.identifier.toLowerCase().includes(filter.toLowerCase());
    });
    return (
        <SidebarWithHeader user={user}>
            <Box bg={"white"} p={5} borderRadius={"md"} boxShadow={"md"}>
                <HStack justify="space-between" align="center">
                    <Text fontSize={"xl"} fontWeight={"bold"}>Danh sách người dùng</Text>
                    <Box>
                        <HStack justify={"space-between"} align={"center"}>
                            <FormControl id="search">
                                <Input type="text" placeholder="Search" value={filter} onChange={(e) => {
                                    setFilter(e.target.value);
                                }}/>
                            </FormControl>
                            <CSVLink data={filteredData} filename={"users.csv"} separator={";"}>
                                <Button colorScheme={"green"}>Xuất CSV</Button>
                            </CSVLink>
                        </HStack>

                    </Box>

                </HStack>

                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Họ và tên</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Mã định danh</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredData.map((user: any) => (
                                <Tr key={user.id}>
                                    <Td>{user.id}</Td>
                                    <Td>{user.name}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.role}</Td>
                                    <Td>{user.identifier}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </SidebarWithHeader>
    );
}

export async function getServerSideProps(context) {
    const res = await fetch("http://localhost:3000/api/admin/get-users", {
        headers: {
            cookie: context.req.headers.cookie,
        },
    });
    const user = await axios.get("http://localhost:3000/api/user/get-info", {
        headers: {
            cookie: context.req.headers.cookie,
            Authorization: `Bearer ${context.req.cookies.token}`
        }
    })
    const data = await res.json();
    return {
        props: {
            data: data.users,
            user: user.data,
        },
    };
}

export default Users;