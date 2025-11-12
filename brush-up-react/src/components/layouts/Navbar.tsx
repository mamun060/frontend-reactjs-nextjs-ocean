import { Link } from "react-router-dom"
function Navbar() {
  return (
    <nav className="flex justify-between items-center text-black p-4">
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
        </ul>
    </nav>
  )
}

export default Navbar
