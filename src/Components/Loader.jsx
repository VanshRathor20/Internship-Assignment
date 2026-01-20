import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <FaSpinner className="text-blue-600 text-4xl animate-spin" />
      <span className="ml-2 text-lg font-medium">Loading...</span>
    </div>
  );
};

export default Loader;
