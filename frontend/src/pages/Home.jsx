import { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios'
import BlogCard from '../components/BlogCard'
import { useSearchParams, useNavigate } from "react-router-dom"

function Home() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("category") || "")

    const [post, setPost] = useState();

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        const finalQuery = query.trim();
        setSearchParams({ category: finalQuery });
        navigate(`/search?category=${encodeURIComponent(finalQuery)}`);
    }

    const clearQuery = () => {
        setSearchParams({});
        setQuery("");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/post/allPosts${query ? `?category=${encodeURIComponent(query)}` : ""}`);
                setPost(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [setPost,query]);

    return (
        <div className='p-4'>
            <form onSubmit={handleSearch} className='flex items-center justify-center'>
                <input
                    className='mb-6 max-w-3xl w-full min-h-[60px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5  items-center gap-5'
                    type="text"
                    value={query}
                    placeholder='Search by Category'
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                    <button type="button" onClick={clearQuery} className="ml-2 p-2 bg-green-400 rounded-lg">X</button>
                )}
                <button
                    type="submit"
                    className=" ml-2 p-2 bg-blue-500 text-white rounded-lg"
                >
                    Search
                </button>
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