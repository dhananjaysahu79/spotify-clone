import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import toast from "react-hot-toast";

const getSongsByTitle = async (title: string): Promise<Song[]> =>  {
    const supabase = createServerComponentClient({
        cookies: cookies
    });


    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', {ascending: false});

    if(error){
        toast.error("Something went wrong!")
    }
    return (data as any) || [];
}

export default getSongsByTitle;
