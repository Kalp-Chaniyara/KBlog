import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios'
import BlogCard from '../components/BlogCard'

function Home() {

    const [post, setPost] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get("/post/allPosts");
                setPost(res.data);
                // console.log(res);
            } catch (err) {
                console.error(err); // Handle errors properly
            }
        };

        fetchData();
    }, [setPost]);

    return (
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
    )
}

export default Home