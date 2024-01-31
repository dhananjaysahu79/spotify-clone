"use client"

import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/types"
import Image from "next/image";

interface SongItemProps {
    song: Song;
    onClick: () => void;
}

const SongItem: React.FC<SongItemProps> = ({
    song,
    onClick
}) => {
    const imageUrl = useLoadImage(song);
    console.log(imageUrl)
    if(!imageUrl) return (<div>Failed to load image</div>)
    return (
        <div onClick={onClick}
            className="
            relative
            group
            flex
            flex-col
            items-center
            justify-center
            rounded-md
            overflow-hidden
            gap-x-4
            bg-neutral-400/5
            cursor-pointer
            hover:bg-neutral-400/10
            transition
            p-3
            "
        >
            <div className="
                relative
                aspect-square
                w-full
                h-full
                rounded-md
                overflow-hidden
            ">
                <Image className="object-cover" 
                src={imageUrl} 
                fill
                alt={"image"} 
                />
            </div>
        </div>
    );
}

export default SongItem;