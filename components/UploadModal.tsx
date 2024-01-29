"use client";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";

const UploadModal = () => {
    const uploadModal = useUploadModal();
    return <Modal 
        isOpen={uploadModal.isOpen} 
        onChange={() => uploadModal.onClose()} 
        title={"upload song"} 
        description={"Upload any songs as per your wish"}>
        This is upload Modal
    </Modal>
}

export default UploadModal;