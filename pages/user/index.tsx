import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import SidebarWithHeader from "../../components/layout/layout";
import ActivityPost from "../../components/user/activityPost";
import {SimpleGrid} from "@chakra-ui/react";
import {wrapper} from "../../state";
import UserService from "../../services/user.service";
import {setUserInfo} from "../../state/slices/auth";
import axios from "axios";

function Dashboard({data}) {
    const router = useRouter();
    const isLoggedIn = useSelector(
        (state: any) => state.auth.isLoggedIn
    ) as boolean;
    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, router]);
    return (
        <SidebarWithHeader>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={5}>
                {data.map((activity) => (
                    <ActivityPost isNew={true} name={activity.name} location={activity.location}
                                  startTime={activity.startDate}
                                  imageURL={"https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F376272649%2F239078127498%2F1%2Foriginal.20221019-064143?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C14%2C1200%2C600&s=5c49f2823c919ead9bae438aa1057204"}
                                  followers={activity.count} key={activity.id} activityId={activity.id}/>
                ))}
            </SimpleGrid>
        </SidebarWithHeader>

    );
}

export async function getServerSideProps(context) {
    const user = await axios.get("http://localhost:3000/api/get-activities", {
        headers: {
            cookie: context.req.headers.cookie,
        }
    });
    return {
        props: {
            data: user.data,
        }
    }
}

export default Dashboard;