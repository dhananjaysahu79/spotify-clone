"use client"
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const session = useSessionContext();
    const {isOpen, onClose } = useAuthModal();

    useEffect(() => {
        if(session){
            router.refresh()
            onClose()
        }
    },[session, router, onClose])
    return (
        <Modal 
            isOpen={isOpen} 
            onChange={() => onClose()}
            title={"Welcome Guest!!"} 
            description={"Login to your account"} 
        >
            <Auth 
                theme="dark"
                providers={["github", "google"]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa
                }}
            />
        </Modal>
    );
}

export default AuthModal;