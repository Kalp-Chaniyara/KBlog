import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's styles
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';

function NewPost() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);  //! needed local state for loading instead of the global state which is in store bcz when we set isLoading(true) then it renders the app.jsx part also bcz where we used isLoading through useSelector(), so any chnage in the isLoading in the store useSelector() detects it and renders the page, so we see the home page for a few miliseconds. To prevent this we used local isSubmitting

    const [formData, setFormData] = useState({
        title: "",
        categoryOfPost: "",
        summary: "",
        image: "",
        discription: ""
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        const form = {file}

        console.log("Form's File",form.file);

        try {
            const res = await axiosInstance.post('/post/upload', form,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setFormData({...formData,image:res.data.localPath})
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Start local loading state
        try {
            const res = await axiosInstance.post('/post/create-post',formData);
            toast.success("Post created successfully");
            navigate('/');
        } catch (error) {
            console.log("Error while creating the post", error);
            toast.error("Failed to create post");
        } finally {
            setIsSubmitting(false); // Stop local loading state
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
                Create New Post
            </h1>
            <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="flex flex-col space-y-6 bg-white shadow-lg p-8 rounded-lg"
            >
                {/* Title Input */}
                <input
                    type="text"
                    placeholder="Title"
                    className="border border-gray-300 px-4 py-3 w-full rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />

                {/* Category Input */}
                <input
                    type="text"
                    placeholder="Category of Post"
                    className="border border-gray-300 px-4 py-3 w-full rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"
                    onChange={(e) => setFormData({ ...formData, categoryOfPost: e.target.value })}
                />

                {/* Summary Input */}
                <input
                    type="text"
                    placeholder="Summary"
                    className="border border-gray-300 px-4 py-3 w-full rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                />

                {/* Image Upload */}
                <div>
                    <label className="block text-gray-600 mb-2 font-medium">
                        Upload an Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="block w-full border border-gray-300 px-4 py-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200 file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded file:cursor-pointer file:hover:bg-blue-600"
                        onChange={handleImageUpload}
                    // onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                </div>

                {/* React Quill Editor */}
                <div>
                    <label className="block text-gray-600 mb-2 font-medium">
                        Description
                    </label>
                    <ReactQuill
                        theme="snow"
                        value={formData.discription}
                        onChange={(value) => setFormData({ ...formData, discription: value })}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`text-black text-lg font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition duration-200 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={isSubmitting}  //! preventing the user from clicking the button multiple times when the progress is going on
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default NewPost;
