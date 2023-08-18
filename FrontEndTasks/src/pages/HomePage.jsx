
import { useAuth } from "../context/AuthContext";

function HomePage(){
    const data = useAuth();
    console.log(data);
    return(
        <div>
            <h1 className="text-2xl font-bold text-yellow-200">Home Page</h1>
        </div>
    )
}

export default HomePage;