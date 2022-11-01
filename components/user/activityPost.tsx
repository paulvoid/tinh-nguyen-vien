import {
    Badge,
    Box,
    Button,
    chakra,
    Circle,
    Flex,
    Icon,
    Image,
    Tooltip,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import {MdFavoriteBorder, MdOutlinePeopleOutline} from "react-icons/md";
import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import axios from "axios";

const data = {
    isNew: true,
    imageURL:
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F376272649%2F239078127498%2F1%2Foriginal.20221019-064143?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C14%2C1200%2C600&s=5c49f2823c919ead9bae438aa1057204',
    name: 'Traders Fair 2022 - Vietnam HCMC (Financial Education Event)',
    organizer: 'FINEXPO PTE LTD.',
    startTime: '2022-12-10T00:00:00.000Z',
    followers: 1152,
};

interface RatingProps {
    rating: number;
    numReviews: number;
}

const minifyNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num;
}


function ActivityPost({isNew, imageURL, name, location, startTime, followers, activityId}) {
    const [isOpen, setIsOpen] = React.useState(false)
    const toast = useToast()
    const joinButton = async () => {
        axios.post("http://localhost:3000/api/user/join-activity", {id: activityId})
            .then((res) => {
                if (res.status === 200) {
                    toast({
                        title: "Tham gia thành công",
                        description: "Bạn đã đăng ký tham gia hoạt động thành công",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                }
            }).catch((err) => {
            toast({
                title: "Tham gia thất bại",
                description: err.response.data.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        })
    }


    return (

        <Flex p={25} w="full" alignItems="center" justifyContent="center">
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Tham gia sự kiện</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <p>Bạn có muốn tham gia sự kiện này không?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => {
                            joinButton()
                            setIsOpen(false)
                        }}>
                            Tham gia
                        </Button>
                        <Button onClick={() => setIsOpen(false)}>Hủy</Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>


            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative">
                {isNew && (
                    <Circle
                        size="10px"
                        position="absolute"
                        top={2}
                        right={2}
                        bg="red.200"
                    />
                )}

                <Image
                    src={imageURL}
                    alt={`Picture of ${name}`}
                    roundedTop="lg"
                />

                <Box p="6">
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        {isNew && (
                            <>
                                <Box display="flex" alignItems="baseline">


                                    <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                                        New
                                    </Badge>

                                </Box>
                                <Tooltip
                                    label="Tham gia sự kiện"
                                    bg="white"
                                    placement={'top'}
                                    color={'gray.800'}
                                    fontSize={'1.2em'}>
                                    <Button display={'flex'} bg={'white'} rounded={'full'} p={2}
                                            _hover={{bg: 'gray.100'}} onClick={() => setIsOpen(true)}>
                                        <Icon as={MdFavoriteBorder} h={7} w={7} alignSelf={'center'}/>
                                    </Button>
                                </Tooltip>
                            </>
                        )}
                    </Flex>
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            textOverflow={"ellipsis"}>
                            {name}
                        </Box>

                    </Flex>

                    {//Sat, Dec 10, 10:00 AM
                    }
                    <Box as="span" color="red.500" fontWeight={"bold"} fontSize="sm">
                        {new Date(startTime).toLocaleString('vi-VN', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit',
                                weekday: 'long',
                            }
                        )}
                    </Box>


                    <Flex justifyContent="space-between" alignContent="center">
                        <Box fontSize="xl" color={useColorModeValue('gray.800', 'white')}>

                            {location}
                        </Box>


                    </Flex>
                    <Box fontSize="md" color={useColorModeValue('gray.800', 'white')}>
                        <Box as="span" color="gray.600" fontSize="md">
                            <Icon as={MdOutlinePeopleOutline} alignSelf={'center'}/>
                        </Box>
                        {minifyNumber(followers)} người tham gia
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
}

export default ActivityPost;