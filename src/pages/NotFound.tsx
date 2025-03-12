
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 card-high-contrast rounded-lg shadow-subtle">
        <h1 className="text-4xl font-bold mb-4 text-high-contrast">404</h1>
        <p className="text-xl text-medium-contrast mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-600 hover:text-blue-700 underline dark:text-blue-400 dark:hover:text-blue-300">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
