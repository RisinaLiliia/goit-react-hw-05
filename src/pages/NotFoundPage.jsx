import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => (
  <div className="text-center mt-5">
    <h1 className="display-1 text-danger">404</h1>
    <p className="lead">Oops! Page not found.</p>
    <Link to="/" className="btn btn-primary btn-lg">
      <FaHome className="me-2" />
      Go to Home
    </Link>
  </div>
);

export default NotFoundPage;
