import React from "react";
import Header from "./Header";

const UserProfile = () => {
  return (
    <div className="flex w-full">
      <Header />
      <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
        User Profile
      </div>
    </div>
  );
};

export default UserProfile;
