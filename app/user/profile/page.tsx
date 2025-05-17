"use client"

import { getUsersDetail } from "@/service/userService";
import ProfilePageContent from "./page-content";
import { getUserId } from "@/utils/auth";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = getUserId();
            if (userId) {
                const userData = await getUsersDetail(userId);
                setUser(userData);
            }
        };
        fetchUser();
    }, []);

    if (!user) return null;

    return (
        <ProfilePageContent usersEdit={user} />
    );
}