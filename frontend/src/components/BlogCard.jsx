import React from 'react';
import { Link } from "react-router-dom";

const BlogCard = ({ id, image, title, summary, categoryOfPost, author }) => {

     return (
          <div className="flex flex-col md:flex-row gap-8 mb-12">
               {/* image */}
               {image && (
                    <div className="md:hidden xl:block xl:w-1/3">
                         <img src={image} className="rounded-2xl object-cover w-full h-full" />
                    </div>
               )}
               {/* details */}
               <div className="flex flex-col gap-4 xl:w-2/3">
                    <Link to='/' className="text-2xl font-semibold">
                         {title}
                    </Link>
                    <div className="flex items-center gap-2 text-gray-400 text-xl">
                         <span>Written by</span>
                         {/* <Link className="text-blue-800" to='/'>{author}</Link> */}
                         <span className='text-blue-800'>{author}</span>
                         <span>category is</span>
                         <Link
                         className="text-blue-800"
                         to={`/search?category=${encodeURIComponent(categoryOfPost)}`}
                         >
                              {categoryOfPost}
                         </Link>
                    </div>
                    <p className='text-xl text-gray-500'>{summary}</p>
                    <Link to={`/post/id/${encodeURIComponent(id)}`} className="underline text-blue-800 text-xl">
                         Read More
                    </Link>
               </div>
          </div>
     );
};

export default BlogCard;