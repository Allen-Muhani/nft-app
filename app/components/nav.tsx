// components/NavBar.tsx
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="bg-gray-900 shadow-md p-4 flex justify-center">
            <div className="flex gap-6">
                <Link to="/" className="text-white font-semibold hover:text-blue-400">
                    Home
                </Link>
                <Link to="/mint-certificate" className="text-white font-semibold hover:text-blue-400">
                    Mint Certificate
                </Link>
            </div>
        </nav>
    );
}
