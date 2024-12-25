// import React from 'react'
// import { Link } from 'react-router-dom'

// function SinglePage({ id, image, title, summary, categoryOfPost, author, discription }) {
//      return (
//           <div className=' flex flex-col'>
//                <div className="flex flex-col md:flex-row gap-8">
//                     {/* image */}
//                     {image && (
//                          <div className="md:hidden xl:block xl:w-1/3">
//                               <img src={image} className="rounded-2xl object-cover w-full h-full" />
//                          </div>
//                     )}
//                     {/* details */}
//                     <div className="flex flex-col gap-4 xl:w-2/3">
//                          <Link to='/' className="text-4xl font-semibold">
//                               {title}
//                          </Link>
//                          <div className="flex items-center gap-2 text-gray-400 text-sm">
//                               <span>Written by</span>
//                               {/* <Link className="text-blue-800" to='/'>{author}</Link> */}
//                               <span className='text-blue-800'>{author}</span>
//                               <span>category is</span>
//                               <Link
//                                    className="text-blue-800"
//                                    to={`/search?category=${encodeURIComponent(categoryOfPost)}`}
//                               >
//                                    {categoryOfPost}
//                               </Link>
//                          </div>
//                          <p>{summary}</p>
//                     </div>
//                </div>

//                <div className="text-lg text-justify font-bold mr-[10%] ml-[10%]">
//                     {discription}
//                </div>
//           </div>
//      )
// }

// export default SinglePage

import React from 'react';
import { Link } from 'react-router-dom';
import './SinglePage.css'; // Import the CSS file

function SinglePage({ id, image, title, summary, categoryOfPost, author, discription }) {
     return (
          <div className="container">
               <div className="flex flex-col md:flex-row gap-8">
                    {/* image */}
                    {image && (
                         <div className="md:hidden xl:block xl:w-1/3">
                              <img src={image} alt={title} className="rounded-2xl object-cover w-full h-full" />
                         </div>
                    )}
                    {/* details */}
                    <div className="flex flex-col gap-4 xl:w-2/3">
                         <h1 className="text-4xl font-semibold">{title}</h1>
                         <div className="flex items-center gap-2 text-gray-400 text-sm">
                              <span>Written by</span>
                              <span className='text-blue-800'>{author}</span>
                              <span> | </span>
                              <span>Category:</span>
                              <Link
                                   className="text-blue-800"
                                   to={`/search?category=${encodeURIComponent(categoryOfPost)}`}
                              >
                                   {categoryOfPost}
                              </Link>
                         </div>
                         <p className='text-gray-500 font-medium'>
                              {summary}
                         </p>
                    </div>
               </div>

               <div className="article-content">
                    <h2 className="text-2xl font-semibold mt-8">Article</h2>
                    <div
                         dangerouslySetInnerHTML={{ __html: discription }}
                         className="text-xl text-justify mt-4"
                    />
               </div>
          </div>
     );
}

export default SinglePage;