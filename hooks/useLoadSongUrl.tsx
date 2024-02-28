import { Song } from "@/types";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";


const useLoadSongUrl = (song: Song) => {
    if (!song) return;
    const { supabaseClient } = useSessionContext();
    const {
        data: imageData
    } =  supabaseClient.storage.from('songs').getPublicUrl(song.song_path);

    return imageData.publicUrl;
}

export default useLoadSongUrl;