import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp.jsx"
import Login from "./pages/Login"
import NewPost from "./pages/NewPost"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuth } from "./features/authSlice.js"
import { Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar.jsx"

function App() {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.isLogin);
    const isLoading = useSelector((state) => state.auth.isLoading);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <Toaster /> {/* Keep this always mounted */}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post/id/:id" element={<Home />} />
                    <Route path="/search" element={<Home />} />
                    <Route path="/signup" element={!isLogin ? <SignUp /> : <Navigate to="/" />} />
                    <Route path="/login" element={!isLogin ? <Login /> : <Navigate to="/" />} />
                    <Route path="/newpost" element={isLogin ? <NewPost /> : <Navigate to="/" />} />
                </Routes>
            )}
        </>
    );
}


export default App
