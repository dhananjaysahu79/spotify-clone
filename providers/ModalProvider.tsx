"use client";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const[isMounted, setIsMounted] = useState(false);
    useEffect(()=> setIsMounted(true), []);
    
    if(!isMounted) return null;
    return (<>
       <Modal 
            isOpen={true} 
            onChange={function (open: boolean): void {
                
            } } 
            title={"Dialog box"} 
            description={"This is dialog box"} 
            children={undefined} 
        />
    </>)
}

export default ModalProvider;