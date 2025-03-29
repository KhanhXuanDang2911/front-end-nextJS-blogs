import { getUsersDetail } from "@/service/userService";
import ProfilePageContent from "./page-content";

export default async function ProfilePage() {
    const usersId = 5
    const user = await getUsersDetail(usersId)    
    return(
        <>
            <ProfilePageContent usersEdit={user}/>
        </>
    )
}