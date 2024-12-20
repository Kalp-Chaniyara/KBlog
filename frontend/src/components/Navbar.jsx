import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../features/authSlice';

function Navbar() {
    const isLogin = useSelector((state) => state.auth.isLogin);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route
    const dispatch = useDispatch();

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogOut = () => {
        dispatch(logout());
    };

    const handleNewPost = () => {
        navigate('/newpost');
    };

    // Check if the current route is `/newpost`
    const isOnNewPostPage = location.pathname === '/newpost';

    return (
        <nav className="bg-blue-600 text-white px-4 py-2 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div className="text-2xl font-bold">
                    KBLOG
                </div>

                {/* Buttons Section */}
                <div className="flex space-x-4 items-center">
                    {isLogin ? (
                        isOnNewPostPage ? (
                            // Show only logout button when on NewPost page
                            <button
                                onClick={handleLogOut}
                                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                                Logout
                            </button>
                        ) : (
                            <>
                                {/* Create Post Button */}
                                <button
                                    onClick={handleNewPost}
                                    className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
                                    Create New Post
                                </button>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogOut}
                                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                                    Logout
                                </button>
                            </>
                        )
                    ) : (
                        <>
                            {/* Signup Button */}
                            <button
                                onClick={handleSignUp}
                                className="bg-[#AAAAAA] px-4 py-2 rounded hover:bg-[#6d768d]">
                                Sign Up
                            </button>

                            {/* Login Button */}
                            <button
                                onClick={handleLogin}
                                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
