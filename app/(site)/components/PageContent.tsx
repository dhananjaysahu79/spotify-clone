"use client"
import SongItem from "@/components/SongItem"
import useOnPlay from "@/hooks/useOnPlay"
import { Song } from "@/types"
import React from "react"

interface PageContentProps {
    songs: Song[]
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);
    if (!songs){
        return (
            <div className="mt-4 text-neutral-400">
                No songs avalaible
            </div>
        )
    }
    return (
        <div className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-4
            mt-4
        ">
            {songs.map(
                (song) => 
                    <SongItem 
                        onClick={(id: string) => onPlay(id)} 
                        key={song.id} 
                        song={song} 
                     />
                )
            }
        </div>
    );
}

export default PageContent;