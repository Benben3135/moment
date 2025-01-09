"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

export default function TestPage() {
    const { getToken } = useAuth();

    const fetchProfile = async () => {
        try {
            const token = await getToken();
            console.log('Got token:', token); // Debug log

            const response = await axios.get("http://localhost:4001/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Profile fetched:", response.data);
        } catch (error) {
            //@ts-ignore
            console.error("Error fetching profile:", error.response?.data || error.message);
        }
    };
    

    return (
        <div className="w-[100vw] h-[100vh] bg-red-400 overflow-hidden justify-center items-center flex">
            <Button onClick={fetchProfile}>Click me</Button>
        </div>
    )
}