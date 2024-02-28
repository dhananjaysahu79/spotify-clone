"use client"

import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/types"
import Image from "next/image";
import PlayButton from "./PlayButton";

interface SongItemProps {
    song: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
    song,
    onClick
}) => {
    const imageUrl = useLoadImage(song);
    console.log(imageUrl)
    if(!imageUrl) return (<div>Failed to load image</div>)
    return (
        <div onClick={() => onClick(song.id)}
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
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="font-semibold truncate w-full">
                    {song.title}
                </p>
                <p className="text-neutral-400 text-sm pb-4 w-full trunate">
                    By {song.author}
                </p>
            </div>
            <PlayButton />
        </div>
    );
}

export default SongItem;