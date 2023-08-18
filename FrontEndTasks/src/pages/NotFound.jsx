import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card.jsx";

function NotFound() {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h1 className="text-4xl font-bold my-2">PageNot Found </h1>
        <h3 className="text-2xl">404</h3>
        <Link to="/">Go back to home</Link>
      </Card>
    </div>
  );
}
export default NotFound;
