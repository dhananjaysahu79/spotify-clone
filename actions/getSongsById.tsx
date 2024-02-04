import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import toast from "react-hot-toast";

const getSongsById = async (): Promise<Song[]> =>  {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: sessionData,
        error: errorData
    } = await supabase.auth.getSession();

    if(errorData){
        return [];
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', sessionData.session?.user.id)
        .order('created_at', {ascending: false});

    if(error){
        toast.error("Something went wrong!")
    }

    return (data as any) || [];
}

export default getSongsById;
