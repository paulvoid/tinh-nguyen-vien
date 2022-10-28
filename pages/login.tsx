import React, {useEffect} from "react";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter} from "next/router";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../state/slices/auth";
import authService from "../services/auth.service";
import MySwal from "../lib/swal";

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();

    interface MyInputTypes {
        email: string;
        password: string;
    }

    const isLoggedIn = useSelector(
        (state: any) => state.auth.isLoggedIn
    ) as boolean;
    useEffect(() => {
        if (isLoggedIn) {
            router.push("/user", undefined, {shallow: true});
        }
    }, [isLoggedIn, router]);


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Email không được để trống"),
        password: Yup.string().required("Mật khẩu không được để trống"),
    });
    const formOptions = {resolver: yupResolver(validationSchema)};
    const {register, handleSubmit, formState} =
        useForm<MyInputTypes>(formOptions);
    const {errors} = formState;

    // form submit handler
    const submitLogin = async (data: any) => {
        const {email, password} = data;
        try {
            const res = await authService.login(email, password);
            if (res.status === 200) {
                MySwal.fire({
                    icon: "success",
                    title: "Đăng nhập thành công",
                    showConfirmButton: false,
                    timer: 1500,
                });
                dispatch(login(res.data));
                router.push("/user", undefined, {shallow: true});
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
                title: "Đăng nhập thất bại",
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
                    <Heading fontSize={'4xl'}>Đăng nhập vào tài khoản</Heading>

                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit(submitLogin)}>
                            <FormControl id="email">
                                <FormLabel>Email</FormLabel>
                                <Input type="email" {...register("email")} />
                                <Text color="red.500" fontSize="sm">
                                    {errors.email?.message}
                                </Text>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Mật khẩu</FormLabel>
                                <Input type="password" {...register("password")} />
                                <Text color="red.500" fontSize="sm">
                                    {errors.password?.message}
                                </Text>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{base: 'column', sm: 'row'}}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Lưu mật khẩu</Checkbox>
                                    <Link color={'blue.400'}>Quên mật khẩu?</Link>
                                </Stack>
                                <Button type={'submit'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>

    );
}
