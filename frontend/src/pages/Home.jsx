import { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios'
import BlogCard from '../components/BlogCard'
import { useSearchParams, useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom'
import SinglePage from '../components/SinglePage'

function Home() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("category") || "")
    // const [id,setId] = useState(searchParams.get("id") || "")
    const { id } = useParams();
    const currentID = id || "";

    // const [id, setId] = use

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
        navigate("/");
    }

    useEffect(() => {

        const queryy = searchParams.get("category") || "";
        setQuery(queryy);

        const fetchData = async () => {
            try {
                if (currentID) {
                    // console.log("IDDD", currentID);
                    const res = await axiosInstance.get(`/post${`/id/${encodeURIComponent(currentID)}`}`);  //! here query is not going to work bcz useState is asyncronous
                    setPost([res.data]);
                } else if (queryy) {
                    const res = await axiosInstance.get(`/post/allPosts${`?category=${encodeURIComponent(queryy)}`}`);  //! here query is not going to work bcz useState is asyncronous
                    setPost(res.data);
                } else {
                    const res = await axiosInstance.get(`/post/allPosts`);  //! here query is not going to work bcz useState is asyncronous
                    setPost(res.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [setPost, setSearchParams, id]);

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
            <div className='pl-40 pt-10 pr-40'>
                {
                    currentID ? (
                        post && post.map((item) => (
                            <SinglePage
                                key={item._id}
                                id={item._id}
                                title={item.title}
                                categoryOfPost={item.categoryOfPost}
                                summary={item.summary}
                                author={item.author.fullName}
                                image={item.image}
                                discription={item.discription}
                            />
                        ))
                    ) : (
                        post && post.map((item) => (
                            <BlogCard
                                key={item._id}
                                id={item._id}
                                title={item.title}
                                categoryOfPost={item.categoryOfPost}
                                summary={item.summary}
                                author={item.author.fullName}
                                image={item.image}
                            />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Home





//!!!!!!!!!!!!!!!!!!!!!!!!!












// import React from "react";
// import "./Home.css"; // Import the CSS file

// const Home = () => {
//     // Sample data for the cards
//     const articles = [
//         {
//             id: 1,
//             image: "https://images.pexels.com/photos/4238994/pexels-photo-4238994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//             title: "Understanding React",
//             summary: "Learn the basics of React and how it revolutionizes frontend development.",
//             category: "Web Development",
//             author: "John Doe",
//         },
//         {
//             id: 2,
//             image: "https://via.placeholder.com/150",
//             title: "CSS Grid Layout",
//             summary: "Master CSS Grid to create modern and responsive layouts with ease.",
//             category: "CSS Design",
//             author: "Jane Smith",
//         },
//         {
//             id: 3,
//             image: "https://via.placeholder.com/150",
//             title: "Node.js Essentials",
//             summary: "A beginner's guide to building backend applications using Node.js.",
//             category: "Backend Development",
//             author: "Alice Johnson",
//         },
//         {
//             id: 4,
//             image: "https://via.placeholder.com/150",
//             title: "JavaScript Tips",
//             summary: "Tips and tricks for writing clean and efficient JavaScript code.",
//             category: "Programming",
//             author: "Michael Lee",
//         },
//         {
//             id: 5,
//             image: "https://via.placeholder.com/150",
//             title: "Mastering MongoDB",
//             summary: "An introduction to MongoDB and how to use it effectively.",
//             category: "Databases",
//             author: "Chris Wilson",
//         },
//         {
//             id: 6,
//             image: "https://via.placeholder.com/150",
//             title: "React Hooks Guide",
//             summary: "A comprehensive guide to React Hooks for modern React development.",
//             category: "React",
//             author: "Sarah Brown",
//         },
//         {
//             id: 7,
//             image: "https://via.placeholder.com/150",
//             title: "React Hooks Guide",
//             summary: "A comprehensive guide to React Hooks for modern React development.",
//             category: "React",
//             author: "Sarah Brown",
//         },
//         {
//             id: 8,
//             image: "https://via.placeholder.com/150",
//             title: "React Hooks Guide",
//             summary: "A comprehensive guide to React Hooks for modern React development.",
//             category: "React",
//             author: "Sarah Brown",
//         },
//     ];

//     return (
//         <div className="container bg-orange-500">
//             {articles.map((article) => (
//                 <div key={article.id} className="grid-item bg-green-400">
//                     <img src={article.image} alt={article.title} className="card-image" />
//                     <div className="card-content">
//                         <h3 className="card-title">{article.title}</h3>
//                         <p className="card-summary">{article.summary}</p>
//                         <div className="card-details">
//                             <span className="category">{article.category}</span>
//                             <span className="author">by {article.author}</span>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Home;
