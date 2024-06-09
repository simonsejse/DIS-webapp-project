import { Loader, Info } from "lucide-react";

const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <h1 className="text-3xl font-semibold text-gray-800 mt-4">Indlæser</h1>
      <p className="text-gray-700 text-lg mt-2 mb-4">
        Vent venligst mens vi indlæser siden.
      </p>
      <div className="flex items-center justify-center pt-5">
        <div className="relative">
          <div className="h-14 w-14 rounded-full border-t-[4px] border-b-[4px] border-gray-200"></div>
          <div className="absolute top-0 left-0 h-14 w-14 rounded-full border-t-[4px] border-b-[4px] border-blue-500 animate-spin"></div>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingComponent;
