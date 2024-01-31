import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";


const useLoadImage = (song: Song) => {
    if (!song) return;
    const supabaseClient = useSupabaseClient();
    const {
        data: imageData
    } =  supabaseClient.storage.from('images').getPublicUrl(song.image_path);

    return imageData.publicUrl;
}

export default useLoadImage;