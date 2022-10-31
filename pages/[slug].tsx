import React, {useEffect} from "react";

import {Buffer} from "buffer";
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
    useColorModeValue, useToast,
} from '@chakra-ui/react';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import axios from "axios";


function DiemDanhPage({activity}) {
    const url = "http://localhost:3000/";
    const router = useRouter();
    useEffect(() => {
        if (!activity) {
            router.push("/");
        }
    }, [activity, router]);


    interface MyInputTypes {
        identifier: string;
    }

    const toast = useToast();
    const validationSchema = Yup.object().shape({
        identifier: Yup.string().required("Mã định danh không được để trống"),
    });
    const formOptions = {resolver: yupResolver(validationSchema)};
    const {register, handleSubmit, formState} =
        useForm<MyInputTypes>(formOptions);
    const {errors} = formState;

    const submitSend = async (data: any) => {
        const {identifier} = data;
        const res = await axios.post(url + "api/diemdanh", {
            identifier: identifier,
            slug: activity.slug
        }).catch((err) => {
            toast({
                title: "Lỗi",
                description: err.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        });
        if (res?.status === 200) {
            toast({
                title: "Điểm danh thành công",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Điểm danh</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit(submitSend)}>


                            <Stack spacing={5}>
                                <FormControl id="id">
                                    <FormLabel>Mã định danh</FormLabel>
                                    <Input type="text" {...register("identifier")}/>
                                    <Text color="red.500">{errors.identifier?.message}</Text>
                                </FormControl>
                                <Button type={'submit'}
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                    Điểm danh
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );


}
export async function getServerSideProps({params}) {

    const slug = params.slug;
    const res = await axios.post("http://localhost:3000/api/get-activity", {
        slug: slug
    }).catch((err) => {

    })
    if (res?.status === 200) {
        return {
            props: {
                activity: res.data.activity,
            }
        }
    }
    return {
        props: {
            activity: null
        }
    }
}

export default DiemDanhPage;