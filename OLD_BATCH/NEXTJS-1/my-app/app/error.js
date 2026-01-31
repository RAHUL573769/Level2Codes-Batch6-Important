"use client";

const Error = ({ error, reset }) => {
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-red-500 text-xl font-semibold">
        Error Found: {error.message}
      </h1>

      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;
