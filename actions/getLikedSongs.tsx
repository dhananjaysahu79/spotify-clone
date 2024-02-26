import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: sessionData,
        error: errorData
    } = await supabase.auth.getSession();

    const {data, error} = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', {ascending: false});

    if(!error && data){
        return data.map((x) => ({...x.songs}));
    }
    else {
        return [];
    }
}
export default getLikedSongs;