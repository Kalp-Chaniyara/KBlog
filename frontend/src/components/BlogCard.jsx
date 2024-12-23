function BlogCard({ title, categoryOfPost, summary, author, image }) {
     return (
          <div className="border rounded-lg shadow-md overflow-hidden bg-white max-w-sm sm:max-w-md md:max-w-lg mx-auto bg-slate-400">
               {image && (
                    <img
                         src={image}
                         alt={title}
                         className="w-full max-w-full h-auto object-contain"
                    />
               )}
               <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <p className="text-sm text-gray-600 mb-2">Category: {categoryOfPost}</p>
                    <p className="text-gray-700 mb-4">{summary}</p>
                    <p className="text-sm text-gray-500">Author: {author}</p>
               </div>
          </div>
     );
}

export default BlogCard;
