import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex mt-16 justify-center h-screen">
      <FaSpinner className="text-blue-600 text-4xl animate-spin" />
      <span className="ml-2 text-lg font-medium">Loading...</span>
    </div>
  );
};

export default Loader;
