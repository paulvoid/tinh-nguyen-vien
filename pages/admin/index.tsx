import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import SidebarWithHeader from "../../components/layout/layout";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast
} from "@chakra-ui/react";
import AdminService from "../../services/admin.service";
import axios from "axios";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

// data props
function Dashboard({data}: any) {
    const router = useRouter();
    const toast = useToast();
    const isLoggedIn = useSelector(
        (state: any) => state.auth.isLoggedIn
    ) as boolean;
    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, router]);
    const [isAddActivityModalOpen, setIsAddActivityModalOpen] = React.useState(false);
    const [isEditActivityModalOpen, setIsEditActivityModalOpen] = React.useState(false);
    const [propsData, setPropsData] = React.useState(data);
    useEffect(() => {
        setPropsData(data);
    }, [data]);

    interface MyInputTypes {
        name: string;
        startDate: string;
        endDate: string;
        location: string;
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Tiêu đề không được để trống"),
        startDate: Yup.string()
            .required("Ngày bắt đầu không được để trống"),
        endDate: Yup.string()
            .required("Ngày kết thúc không được để trống"),
        location: Yup.string()
            .required("Địa điểm không được để trống"),
    });
    const formOptions = {resolver: yupResolver(validationSchema)};
    const timeToString = (time: any) => {
        let date = new Date(time);
        return date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }) + " " + date.toLocaleTimeString("vi-VN");
    }
    const [dataEdit, setDataEdit] = React.useState({
        id: "",
        name: "",
        startDate: "",
        endDate: "",
        location: "",
    });
    const {register, handleSubmit, formState} =
        useForm<MyInputTypes>(formOptions);
    const {errors} = formState;
    const addActivity = async (data: any) => {
        const {name, startDate, endDate, location} = data;
        try {
            const res = await AdminService.addActivity(name, "test", startDate, endDate, location);
            if (res.status === 200) {
                toast({
                    title: "Thêm hoạt động thành công",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                console.log(res);
            }
        } catch (error) {
        }
    }
    const timeToDateLocal = (time: any, type: string) => {
        let date = new Date(time);
        date.setHours(date.getHours() + 7);
        if (type === "start") {

            setDataEdit({
                ...dataEdit,
                startDate: date.toISOString().slice(0, 16)
            })
        } else
            setDataEdit({
                ...dataEdit,
                endDate: date.toISOString().slice(0, 16)
            })

        return date.toISOString().slice(0, 16);
    }

    const editActivity = async (data: any) => {
        const {id, name, startDate, endDate, location} = data;
        try {
            const res = await AdminService.updateActivity(id, name, "test", startDate, endDate, location);
            if (res.status === 200) {
                toast({
                    title: "Sửa hoạt động thành công",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            }
        } catch (error) {

        }
    }


    return (
        <SidebarWithHeader>
            <Box w="100%" p={4} bg={"white"} borderRadius={8}>
                <Flex justify="space-between" align="center">
                    <Box>
                        <Box fontSize="2xl"> Tất cả hoạt động </Box>
                    </Box>
                    <Box>
                        <Button colorScheme="blue" size="sm" onClick={() => setIsAddActivityModalOpen(true)}>
                            Thêm hoạt động
                        </Button>
                    </Box>
                </Flex>

                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th isNumeric>#</Th>
                                <Th>Tiêu đề</Th>
                                <Th>Thời gian bắt đầu</Th>
                                <Th>Thời gian kết thúc</Th>
                                <Th>Địa điểm</Th>
                                <Th>Trạng thái</Th>
                                <Th>Hành động</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {propsData && propsData.reverse().map((item: any, index: number) => (
                                <Tr key={index}>
                                    <Td isNumeric>{item.id}</Td>
                                    <Td>{item.name}</Td>
                                    <Td>{timeToString(item.startDate)}</Td>
                                    <Td>{timeToString(item.endDate)}</Td>
                                    <Td>{item.location}</Td>
                                    <Td>{
                                        item.status === "PUBLISHED" ? "Đã xuất bản" : "Chưa xuất bản"
                                    }
                                    </Td>
                                    <Td>
                                        <ButtonGroup>
                                            <Button colorScheme="blue" size="sm" onClick={() => {
                                                setDataEdit({
                                                    id: item.id,
                                                    name: item.name,
                                                    startDate: timeToDateLocal(item.startDate, "start"),
                                                    endDate: timeToDateLocal(item.endDate, "end"),
                                                    location: item.location,
                                                });
                                                setIsEditActivityModalOpen(true);
                                            }}>
                                                Sửa
                                            </Button>
                                            <Button colorScheme="red" size="sm">
                                                Xóa
                                            </Button>
                                        </ButtonGroup>
                                    </Td>

                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Modal isOpen={isAddActivityModalOpen} onClose={() => setIsAddActivityModalOpen(false)}>
                    <ModalOverlay/>
                    <form onSubmit={handleSubmit(addActivity)}>
                        <ModalContent>
                            <ModalHeader>Thêm hoạt động</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <Stack spacing={3}>

                                    <FormControl id="name">
                                        <FormLabel>Tiêu đề</FormLabel>
                                        <Input type="text" {...register("name")}/>
                                        <Text color="red.500">{errors.name?.message}</Text>
                                    </FormControl>
                                    <FormControl id="startDate">
                                        <FormLabel>Thời gian bắt đầu</FormLabel>
                                        <Input type="datetime-local" {...register("startDate")}/>
                                        <Text color="red.500">{errors.startDate?.message}</Text>
                                    </FormControl>
                                    <FormControl id="endDate">
                                        <FormLabel>Thời gian kết thúc</FormLabel>
                                        <Input type="datetime-local" {...register("endDate")}/>
                                        <Text color="red.500">{errors.endDate?.message}</Text>
                                    </FormControl>
                                    <FormControl id="location">
                                        <FormLabel>Địa điểm</FormLabel>
                                        <Input type="text" {...register("location")}/>
                                        <Text color="red.500">{errors.location?.message}</Text>
                                    </FormControl>

                                </Stack>

                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} type="submit">
                                    Thêm
                                </Button>
                                <Button onClick={() => setIsAddActivityModalOpen(false)}>Hủy</Button>

                            </ModalFooter>

                        </ModalContent>
                    </form>
                </Modal>
                <Modal isOpen={isEditActivityModalOpen} onClose={() => {
                    setIsEditActivityModalOpen(false);

                }}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Sửa hoạt động</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Stack spacing={3}>
                                {isEditActivityModalOpen && (
                                    <>
                                        <Input type="hidden" value={dataEdit.id}/>
                                        <FormControl id="name">
                                            <FormLabel>Tiêu đề</FormLabel>
                                            <Input type="text" value={dataEdit.name} onChange={(e) => {
                                                setDataEdit({...dataEdit, name: e.target.value});
                                            }}/>
                                            <Text color="red.500">{errors.name?.message}</Text>
                                        </FormControl>
                                        <FormControl id="startDate">
                                            <FormLabel>Thời gian bắt đầu</FormLabel>
                                            <Input type="datetime-local" value={
                                                // 2022-10-24T16:10:00.000Z
                                                dataEdit.startDate
                                            } onChange={(e) => {
                                                setDataEdit({...dataEdit, startDate: e.target.value});
                                            }}/>
                                            <Text color="red.500">{errors.startDate?.message}</Text>
                                        </FormControl>
                                        <FormControl id="endDate">
                                            <FormLabel>Thời gian kết thúc</FormLabel>
                                            <Input type="datetime-local" value={
                                                // 2022-10-24T16:10:00.000Z
                                                dataEdit.endDate
                                            } onChange={(e) => setDataEdit({...dataEdit, endDate: e.target.value})}/>
                                            <Text color="red.500">{errors.endDate?.message}</Text>
                                        </FormControl>
                                        <FormControl id="location">
                                            <FormLabel>Địa điểm</FormLabel>
                                            <Input type="text" {...register("location")} value={dataEdit.location}
                                                   onChange={(e) => setDataEdit({
                                                       ...dataEdit,
                                                       location: e.target.value
                                                   })}/>
                                            <Text color="red.500">{errors.location?.message}</Text>
                                        </FormControl>
                                    </>
                                )}

                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3}>
                                Sửa
                            </Button>
                            <Button onClick={() => setIsEditActivityModalOpen(false)}>Hủy</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </SidebarWithHeader>
    );
}

export async function getStaticProps() {

    const res = await axios.get("http://localhost:3000/api/get-activities");
    const data = await res.data;
    return {
        props: {
            data,
        }
    }
}

export default Dashboard;