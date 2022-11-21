import React from "react";

const Alerts = () => {
  return (
    <div className="container text-white">
      <div className="ml-auto mr-3 flex flex-col gap-2 w-72 border-b-4 border-b-blue-600">
        <div
          className="bg-blue-50 rounded-t text-blue-900 px-4 py-3"
          role="alert"
        >
          <div className="flex">
            <div>
              <svg
                className="fill-current h-6 w-6 text-blue-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-blue-500">
                Lorem ipsum dolor sit amet, consectetur adip!.
              </p>
            </div>
            <p className="flex cursor-pointer">
              <svg
                className="text-blue-500 text-xl"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" />
                <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              </svg>
            </p>
          </div>
        </div>
      </div>
      <br />
      <div className="ml-auto mr-3 flex flex-col gap-2 w-72 border-b-4 border-b-blue-600">
        <div
          className="bg-green-50 rounded-t text-green-900 px-4 py-3"
          role="alert"
        >
          <div className="flex">
            <div>
              <svg
                className="fill-current h-6 w-6 text-green-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4l8-8l-1.41-1.42z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-green-500">
                Lorem ipsum dolor sit amet, consectetur adip!.
              </p>
            </div>
            <p className="flex cursor-pointer">
              <svg
                className="text-green-500 text-xl"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" />
                <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              </svg>
            </p>
          </div>
        </div>
      </div>
      <br />
      <div className="ml-auto mr-3 flex flex-col gap-2 w-72 border-b-4 border-b-blue-600">
        <div
          className="bg-yellow-50 rounded-t text-yellow-900 px-4 py-3"
          role="alert"
        >
          <div className="flex">
            <div>
              <svg
                className="fill-current h-6 w-6 text-yellow-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path d="M13 14h-2V9h2m0 9h-2v-2h2M1 21h22L12 2L1 21z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-yellow-500">
                Lorem ipsum dolor sit amet, consectetur adip!.
              </p>
            </div>
            <p className="flex cursor-pointer">
              <svg
                className="text-yellow-500 text-xl"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" />
                <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              </svg>
            </p>
          </div>
        </div>
      </div>
      <br />
      <div className="ml-auto mr-3 flex flex-col gap-2 w-72 border-b-4 border-b-blue-600">
        <div
          className="bg-red-50 rounded-t text-red-900 px-4 py-3"
          role="alert"
        >
          <div className="flex">
            <div>
              <svg
                className="fill-current h-6 w-6 text-red-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2m0 2c-1.9 0-3.6.6-4.9 1.7l11.2 11.2c1-1.4 1.7-3.1 1.7-4.9c0-4.4-3.6-8-8-8m4.9 14.3L5.7 7.1C4.6 8.4 4 10.1 4 12c0 4.4 3.6 8 8 8c1.9 0 3.6-.6 4.9-1.7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-red-500">
                Lorem ipsum dolor sit amet, consectetur adip!.
              </p>
            </div>
            <p className="flex cursor-pointer">
              <svg
                className="text-red-500 text-xl"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" />
                <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              </svg>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center min-h-screen pt-4 min-w-screen">
        <div
          className="w-full px-2 py-4 overflow-x-auto text-center whitespace-no-wrap rounded-md"
          role="alert"
        >
          <div className="relative inline-flex w-full max-w-sm ml-3 overflow-hidden bg-green-500 rounded shadow-sm hover:bg-green-600 hover:shadow-lg">
            <div className="flex items-center justify-center w-12">
              <svg
                className="w-10 h-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="px-3 py-2 text-left">
              <span className="font-semibold text-white">Success</span>
              <p className="mb-1 text-sm leading-none text-white">
                Successfully Done!
              </p>
            </div>
            <div className="absolute right-0 p-1">
              <svg
                className="w-6 h-6 text-white fill-current"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </div>
          </div>
        </div>
        <div
          className="w-full px-2 py-4 overflow-x-auto text-center whitespace-no-wrap rounded-md"
          role="alert"
        >
          <div className="relative inline-flex w-full max-w-sm ml-3 overflow-hidden bg-blue-500 rounded shadow-sm hover:bg-blue-600 hover:shadow-lg">
            <div className="flex items-center justify-center w-12">
              <svg
                className="w-10 h-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="px-4 py-2 text-left">
              <span className="font-semibold text-white">Info</span>
              <p className="mb-1 text-sm leading-none text-white">
                You should read this.
              </p>
            </div>
            <div className="absolute right-0 p-1">
              <svg
                className="w-6 h-6 text-white fill-current"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </div>
          </div>
        </div>
        <div
          className="w-full px-2 py-4 overflow-x-auto text-center whitespace-no-wrap rounded-md"
          role="alert"
        >
          <div className="relative inline-flex w-full max-w-sm ml-3 overflow-hidden bg-yellow-500 rounded shadow-sm hover:shadow-lg hover:bg-yellow-600">
            <div className="flex items-center justify-center w-12">
              <svg
                className="w-10 h-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="px-4 py-2 text-left">
              <span className="font-semibold text-white">Warning</span>
              <p className="mb-1 text-sm leading-none text-white">
                Something could go wrong.
              </p>
            </div>
            <div className="absolute right-0 p-1">
              <svg
                className="w-6 h-6 text-white fill-current"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </div>
          </div>
        </div>
        <div
          className="w-full px-2 py-4 overflow-x-auto text-center whitespace-no-wrap rounded-md"
          role="alert"
        >
          <div className="relative inline-flex w-full max-w-sm ml-3 overflow-hidden bg-red-500 rounded shadow-sm hover:shadow-lg hover:bg-red-600">
            <div className="flex items-center justify-center w-12">
              <svg
                className="w-10 h-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="px-4 py-2 text-left">
              <span className="font-semibold text-white">Error</span>
              <p className="mb-1 text-sm leading-none text-white">
                Something went wrong.
              </p>
            </div>
            <div className="absolute right-0 p-1">
              <svg
                className="w-6 h-6 text-white fill-current"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
