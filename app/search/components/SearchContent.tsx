"use client";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import React from "react";

interface SearchContentProps {
    songs: Song[]
}

const SearchContent: React.FC<SearchContentProps> = ({songs}) => {
    const onPlay = useOnPlay(songs);
    if (!songs || songs.length === 0){
        return (
            <div className="flex flex-col gap-y-2 w-full ps-6 text-neutral-400">
                No Songs found
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
        {songs.map((song: Song) => (
            <div 
            key={song.id} 
            className="flex items-center gap-x-4 w-full"
            >
            <div className="flex-1">
                <MediaItem 
                    onClick={(id: string) => {onPlay(song.id)}}
                    song={song} />
            </div>
            <LikeButton songId={song.id}/>
            </div>
        ))}
        </div>
    );
}

export default SearchContent;