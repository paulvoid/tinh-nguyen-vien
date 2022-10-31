import React, {useEffect} from "react";
import QRCode from "react-qr-code";
import {Box, Center} from "@chakra-ui/react";
import {useRouter} from "next/router";
import axios from "axios";

function QRCodePage({data}){
    const url = "http://localhost:3000/";
    const router = useRouter();
    const activity = data.activity;
    const slug = activity.slug;


    return (
        <Center display={"flex"} flexDirection={"column"} minH={"100vh"}>
            <div style={{maxWidth: "300px"}}>
                <QRCode style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={url+slug} />
            </div>

        </Center>
    );
}

export async function getServerSideProps(context) {
    const {id} = context.params;
    const cookie = context.req.headers.cookie;
    const res = await axios.post("http://localhost:3000/api/admin/get-activity", {id}, {headers: {cookie}});
    const data = res.data;
    return {
        props: {
            data,
        }
    };
}

export default QRCodePage;

