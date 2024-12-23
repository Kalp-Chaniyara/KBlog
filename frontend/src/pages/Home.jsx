import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios'
import BlogCard from '../components/BlogCard'
import useSearchParams, { Navigate } from "react-router-dom"

function Home() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [query,setQuery] = useState(useSearchParams.get("category") || "")

    const [post, setPost] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get("/post/allPosts");
                setPost(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [setPost]);

    const handleSearch = (e)=>{
        e.preventDefault();
        setSearchParams({category:query});
        Navigate(`/search?category=${encodeURIComponent(query)}`);
    }

    return (
        <div className='p-4'>
            <form onSubmit={handleSearch} className='flex items-center mb-6'>
                <input
                type="text"
                value={query}
                placeholder='Search by Category'
                onChange={(e)=>setQuery(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {post && post.map((item) => (
                    <BlogCard
                    key={item._id}
                        title={item.title}
                        categoryOfPost={item.categoryOfPost}
                        summary={item.summary}
                        author={item.author.fullName}
                        image={item.image}
                        />
                ))}
            </div>
        </div>
    )
}

export default Home