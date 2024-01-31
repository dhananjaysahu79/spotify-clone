"use client";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import uniqid from 'uniqid';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const uploadModal = useUploadModal();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
          reset();
          uploadModal.onClose();
        }
      }
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        // Upload to supabase
        try{
            setIsLoading(true);
            const song = values?.song?.[0];
            const image = values?.image?.[0];
            const title = values?.title;

            if(!song || !image || !title){
                toast.error("Please fill required fields")
                return;
            }

            const uniqId = uniqid();

            // upload Song
            const {
                data: songRes,
                error: songError
            } = await supabaseClient
            .storage
            .from('songs')
            .upload(`song-${title}-${uniqId}`, song, {
                cacheControl: '3600',
                upsert: false
            });

            if(songError){
                setIsLoading(false);
                toast.error("Failed to upload song");
                return;
            }

            // upload image
            const {
                data: imageRes,
                error: imageError
            } = await supabaseClient
            .storage
            .from('images')
            .upload(`image-${title}-${uniqId}`, image, {
                cacheControl: '3600',
                upsert: false
            });

            if(imageError){
                setIsLoading(false);
                toast.error("Failed to upload image");
                return;
            }

            // add the song on songs table
            const {
                error: insertError
            } = await supabaseClient
            .from('songs')
            .insert({
                user_id: user?.id,
                title: title,
                author: values.author,
                image_path: imageRes.path,
                song_path: songRes.path
            });

            if(insertError){
                setIsLoading(false);
                toast.error("Unable to add song in our record");
                return;
            }

            router.refresh()
            setIsLoading(false);
            toast.success("Song uploaded")
            reset()
            uploadModal.onClose()
        }
        catch (error){
            setIsLoading(false);
            toast.error('Something went wrong') 
        }
    }

    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col gap-y-4"
        >
            <Input
                id="title"
                disabled={isLoading}
                {...register('title', { required: true })}
                placeholder="Song title"
            />
            <Input
                id="author"
                disabled={isLoading}
                {...register('author', { required: true })}
                placeholder="Song author"
            />
            <div>
                <div className="pb-1">
                    Select a song file
                </div>
                <Input
                    placeholder="test" 
                    disabled={isLoading}
                    type="file"
                    accept=".mp3"
                    id="song"
                    {...register('song', { required: true })}
                />
                </div>
            <div>
                <div className="pb-1">
                    Select an image
                </div>
                <Input
                    placeholder="test" 
                    disabled={isLoading}
                    type="file"
                    accept="image/*"
                    id="image"
                    {...register('image', { required: true })}
                />
            </div>
            <Button disabled={isLoading} type="submit">
                Create
            </Button>
        </form>
        </Modal>
    );
}

export default UploadModal;