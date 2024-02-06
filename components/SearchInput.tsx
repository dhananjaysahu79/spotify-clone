"use client"
import qs from 'query-string'
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Input from './Input';

const SearchInput = () => {
    const router = useRouter();
    const [searchString, setSearchString] = useState('');
    const debouncedValue = useDebounce<string>(searchString);

    useEffect(() => {
        const query = {
            title: searchString
        }

        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        })

        router.push(url)
    }, [debouncedValue, router])
    return (
        <Input 
            placeholder='What you want to listen to?'
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
        />
    )
}

export default SearchInput;