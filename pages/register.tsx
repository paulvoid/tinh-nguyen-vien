import React, {useEffect} from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link, InputLeftAddon,
} from '@chakra-ui/react';
import {PhoneIcon, ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter} from "next/router";

import {useForm} from "react-hook-form";
import authService from "../services/auth.service";
import MySwal from "../lib/swal";
import {useSelector} from "react-redux";

export default function Login() {
    const router = useRouter();

    interface MyInputTypes {
        name: string;
        dateOfBirth: string;
        email: string;
        password: string;
        confirmPassword: string;
        phoneNumber: string;
        address: string;
        indentifyCard: string;
        dateOfIssue: string;
        placeOfIssue: string;
        unit: string;

    }

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const isLoggedIn = useSelector(
        (state: any) => state.auth.isLoggedIn
    ) as boolean;
    useEffect(() => {
        if (isLoggedIn) {
            router.push("/user", undefined, {shallow: true});
        }
    }, [isLoggedIn, router]);
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên không được để trống"),
        // dd/mm/yyyy
        dateOfBirth: Yup.string().required("Ngày sinh không được để trống")
            .test("is-date", "Ngày sinh không hợp lệ", (value ) => {
                if (!value) return false;
                const date = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - date.getFullYear();
                return age >= 16 && date <= today;
            }),

        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Email không được để trống"),
        password: Yup.string()
            .required("Mật khẩu không được để trống")
            .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        confirmPassword: Yup.string()
            .required("Mật khẩu không được để trống")
            .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
        phoneNumber: Yup.string()
            .required("Số điện thoại không được để trống")
            .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
            .min(10, "Số điện thoại không hợp lệ")
            .max(11, "Số điện thoại không hợp lệ"),
        address: Yup.string().required("Địa chỉ không được để trống"),
        indentifyCard: Yup.string()
            .required("CMND không được để trống")
            .matches(/^[0-9]+$/, "CMND không hợp lệ")
            .min(9, "CMND không hợp lệ")
            .max(12, "CMND không hợp lệ"),
        dateOfIssue: Yup.string().required("Ngày cấp không được để trống"),
        placeOfIssue: Yup.string().required("Nơi cấp không được để trống"),
        unit: Yup.string().required("Đơn vị không được để trống"),


    });
    const formOptions = {resolver: yupResolver(validationSchema)};
    const {register, handleSubmit, formState} =
        useForm<MyInputTypes>(formOptions);
    const {errors} = formState;
    const submitRegister = async (data: any) => {
        const {name, email, password, dateOfBirth, phoneNumber, address, indentifyCard, dateOfIssue, placeOfIssue, unit} = data;
        try {
            const res = await authService.register(name, email, password, dateOfBirth, phoneNumber, address, indentifyCard, dateOfIssue, placeOfIssue, unit);
            if (res.status === 200) {
                MySwal.fire({
                    icon: "success",
                    title: "Đăng ký thành công",
                    showConfirmButton: false,
                    timer: 1500,
                });
                router.push("/user");

            } else {
                MySwal.fire({
                    icon: "error",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "Đăng ký thất bại",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Đăng ký
                    </Heading>

                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={handleSubmit(submitRegister)}>
                        <Stack spacing={4}>

                            <HStack>
                                <Box>
                                    <FormControl id="name">
                                        <FormLabel>Họ và tên</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Họ và tên"
                                            {...register("name")}
                                        />
                                        <Text color="red.500">
                                            {errors.name?.message}
                                        </Text>

                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="dateOfBirth">
                                        <FormLabel>Ngày sinh</FormLabel>

                                        <Input type="date" placeholder="Ngày sinh" {...register("dateOfBirth")}/>
                                        <Text color="red.500" fontSize="sm">
                                            {errors.dateOfBirth?.message}
                                        </Text>
                                    </FormControl>

                                </Box>

                            </HStack>


                            <FormControl id="email">
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                />
                                <Text color="red.500">
                                    {errors.email?.message}
                                </Text>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} {...register("password")}></Input>
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>

                                </InputGroup>
                                <Text color="red.500">
                                    {errors.password?.message}
                                </Text>
                            </FormControl>
                            <FormControl id="confirmPassword">
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'} {...register("confirmPassword")}></Input>
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
                                            }>
                                            {showConfirmPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <Text color="red.500">
                                    {errors.confirmPassword?.message}
                                </Text>
                            </FormControl>
                            <FormControl id="phoneNumber">
                                <FormLabel>Số điện thoại</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon>
                                        +84
                                    </InputLeftAddon>
                                    <Input type="tel" placeholder="Số điện thoại" {...register("phoneNumber")}/>
                                </InputGroup>
                                <Text color="red.500">
                                    {errors.phoneNumber?.message}
                                </Text>
                            </FormControl>
                            <FormControl id="address">
                                <FormLabel>Địa chỉ</FormLabel>
                                <Input type="text" placeholder="Địa chỉ" {...register("address")}/>
                                <Text color="red.500">
                                    {errors.address?.message}
                                </Text>
                            </FormControl>
                            <FormControl id="indentifyCard">
                                <FormLabel>CMND</FormLabel>
                                <Input type="text" placeholder="CMND" {...register("indentifyCard")}/>
                                <Text color="red.500">
                                    {errors.indentifyCard?.message}
                                </Text>
                            </FormControl>
                            <HStack>
                                <Box>
                                    <FormControl id="dateOfIssue">
                                        <FormLabel>Ngày cấp</FormLabel>
                                        <Input type="date" placeholder="Ngày cấp" {...register("dateOfIssue")}/>
                                        <Text color="red.500">
                                            {errors.dateOfIssue?.message}
                                        </Text>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="placeOfIssue">
                                        <FormLabel>Nơi cấp</FormLabel>
                                        <Input type="text" placeholder="Nơi cấp" {...register("placeOfIssue")}/>
                                        <Text color="red.500">
                                            {errors.placeOfIssue?.message}
                                        </Text>
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="unit">
                                <FormLabel>Đơn vị</FormLabel>
                                <Input type="text" placeholder="Đơn vị" {...register("unit")}/>
                                <Text color="red.500">
                                    {errors.unit?.message}
                                </Text>

                            </FormControl>


                            <Stack spacing={10} pt={2}>
                                <Button
                                    type={'submit'}
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Đăng ký
                                </Button>
                            </Stack>

                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Bạn đã có tài khoản?{' '}
                                    <Link color={'blue.400'} href={'/login'}>
                                        Đăng nhập
                                    </Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}
