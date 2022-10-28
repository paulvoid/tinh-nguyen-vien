import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import SidebarWithHeader from "../../components/layout/layout";
import ActivityPost from "../../components/user/activityPost";
import {SimpleGrid} from "@chakra-ui/react";
import {wrapper} from "../../state";
import UserService from "../../services/user.service";
import {setUserInfo} from "../../state/slices/auth";

function Dashboard() {
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
            <SimpleGrid columns={[1, 2, 3]} spacing={5}>
                <ActivityPost/>
                <ActivityPost/>
                <ActivityPost/>
                <ActivityPost/>
                <ActivityPost/>
            </SimpleGrid>
        </SidebarWithHeader>

    );
}

export default Dashboard;