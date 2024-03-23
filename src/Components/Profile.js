import React, { useState, useEffect } from 'react';
import '../Styles/profile.css';
import ProfileSVG from "../Assets/user.png";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUser(storedUser);

      // Fetch user details using the saved ID
      fetch(`https://dummyjson.com/users/${storedUser.id}`)
        .then((res) => res.json())
        .then((userData) => {
          // Save the extended user details
          setUser({ ...storedUser, ...userData });
          localStorage.setItem('user', JSON.stringify({ ...storedUser, ...userData }));
        })
        .catch((error) => console.error('Error fetching user details:', error));
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('user');

    // Show logout alert
    alert('Logged out successfully!');
    // Use navigate to redirect to the sign-in page
    window.location.href = '/signIn';
  };


  if (!user) {
    return null;
  }

  return (
    <div className='main-container'>
      <div className="background-design">
        <div className='line1'></div>
      </div>
      <h1>Signup Successful!</h1>
      <div className="form">
        <h2>Profile</h2>
        <img src={ProfileSVG} alt="user" />
        <div className="details">
          <p id="fullName">User Id: {user.id}</p>
          <p id="username">Username: {user.username}</p>
          <p id="email">Email: {user.email}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
};
export default Profile;