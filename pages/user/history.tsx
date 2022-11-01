import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import SidebarWithHeader from "../../components/layout/layout";
import ActivityPost from "../../components/user/activityPost";
import {SimpleGrid} from "@chakra-ui/react";
import {wrapper} from "../../state";
import UserService from "../../services/user.service";
import {setUserInfo} from "../../state/slices/auth";
import axios from "axios";

function Dashboard({data, user}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(
        (state: any) => state.auth.isLoggedIn
    ) as boolean;
    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, router]);
    useEffect(() => {
        dispatch(setUserInfo(user));
    }, [user, dispatch]);
    return (
        <SidebarWithHeader user={user}>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={5}>
                {data.map((activity : any) => (
                    <ActivityPost isNew={false} name={activity.name} location={activity.location}
                                  startTime={activity.startDate}
                                  imageURL={"https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F376272649%2F239078127498%2F1%2Foriginal.20221019-064143?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C14%2C1200%2C600&s=5c49f2823c919ead9bae438aa1057204"}
                                  followers={activity.count} key={activity.id} activityId={activity.id}/>
                ))}
            </SimpleGrid>
        </SidebarWithHeader>

    );
}

export async function getServerSideProps(context) {
    const activities = await axios.get("http://localhost:3000/api/user/activity-history", {
        headers: {
            cookie: context.req.headers.cookie,
        }
    }).catch((err) => {
        console.log(err);
    });
    const user = await axios.get("http://localhost:3000/api/user/get-info", {
        headers: {
            cookie: context.req.headers.cookie,
            Authorization: `Bearer ${context.req.cookies.token}`
        }
    })

    return {
        props: {
            data: activities.data,
            user: user.data
        }
    }
}

export default Dashboard;