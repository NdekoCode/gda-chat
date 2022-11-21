import React from "react";

const UserList2 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="mb-4">
          <h1 className="font-semibold text-gray-50">Mutual Followers</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center flex-col bg-gray-700 p-4 rounded-lg w-48 space-y-4">
            <img
              className="rounded-full border-gray-100 shadow-sm w-24 h-24"
              src="https://randomuser.me/api/portraits/women/43.jpg"
              alt="user image"
            />
            <h1 className="text-gray-50 font-semibold">Vivian Davie</h1>
            <button className="px-8 py-1 border-2 border-indigo-600 bg-indigo-600 rounded-full text-gray-50 font-semibold">
              Follow
            </button>
          </div>
          <div className="flex items-center justify-center flex-col bg-gray-700 p-4 rounded-lg w-48 space-y-4">
            <img
              className="rounded-full border-gray-100 shadow-sm w-24 h-24"
              src="https://randomuser.me/api/portraits/men/81.jpg"
              alt="user image"
            />
            <h1 className="text-gray-50 font-semibold">Derry Harris</h1>
            <button className="px-8 py-1 border-2 border-indigo-600 bg-indigo-600 rounded-full text-gray-50 font-semibold">
              Follow
            </button>
          </div>
          <div className="flex items-center justify-center flex-col bg-gray-700 p-4 rounded-lg w-48 space-y-4">
            <img
              className="rounded-full border-gray-100 shadow-sm w-24 h-24"
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt="user image"
            />
            <h1 className="text-gray-50 font-semibold">Aliesha Hanson</h1>
            <button className="px-8 py-1 border-2 border-indigo-600 bg-indigo-600 rounded-full text-gray-50 font-semibold">
              Follow
            </button>
          </div>
          <div className="flex items-center justify-center flex-col bg-gray-700 p-4 rounded-lg w-48 space-y-4">
            <img
              className="rounded-full border-gray-100 shadow-sm w-24 h-24"
              src="https://randomuser.me/api/portraits/women/13.jpg"
              alt="user image"
            />
            <h1 className="text-gray-50 font-semibold">Cristina Frederick</h1>
            <button className="px-6 py-1 border-2 border-indigo-600 rounded-full text-gray-50 font-semibold">
              Following
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList2;
