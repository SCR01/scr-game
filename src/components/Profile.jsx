import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
const Profile = ({ user, setUser }) =>
{
    const handleLogout = async () =>
    {
        await signOut(auth);
        setUser(null);
    };
    return (
        <div className="flex flex-col items-center mt-8">
            <img src={user.photoURL}
            alt="profile"
            className="w-16 h-16 rounded-full mb-2 border-2 border-yellow-400" /> 
            <h3 className="text-lg font-semibold">{user.displayName}</h3>
            <p className="text-sm text-gray-400">{user.email}</p>
            <button onClick={handleLogout}
            className="mt-3 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600" >
            Sign Out 
            </button>
        </div>);
    }; 
export default Profile;
