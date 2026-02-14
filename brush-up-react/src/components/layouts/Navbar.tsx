import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/createContext";

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <nav style={{ background: theme === 'dark' ? '#333' : '#fff'}} className="flex justify-between items-center text-black p-4">
      <div className="text-2xl font-bold">MyApp</div>
        <ul className="flex space-x-4">
            <li>
                <Link to="/" className="hover:underline text-xl font-semibold">Home</Link>
            </li>
            <li>
                <Link to="/about" className="hover:underline text-xl font-semibold">About</Link>
            </li>
            <li>
                <Link to="/products" className="hover:underline text-xl font-semibold">Products</Link>
            </li>
            <li>
                <Link to="/game" className="hover:underline text-xl font-semibold">Game</Link>
            </li>
            <li>
                <Link to="/hook-practice" className="hover:underline text-xl font-semibold">Hooks</Link>
            </li>
            <li>
                <Link to="/optimization" className="hover:underline text-xl font-semibold">Optimization</Link>
            </li>
            <li className=" bg-amber-700">
              <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Toggle Theme
              </button>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
