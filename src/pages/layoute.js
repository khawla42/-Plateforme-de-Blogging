import { Link,Outlet } from "react-router-dom";
import './layoute.css';
export default function Home(){
    return(
        <div className="home-container">
            <nav>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/new">Add blog</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
            <Link to="/contact">Contact-us</Link>
            </li>
            </nav>
            <Outlet/>
        </div>
    )
}