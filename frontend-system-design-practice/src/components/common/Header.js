
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-bold">E-commerce</div>
        </Link>
        <nav className='flex gap-4 items-center font-medium text-xl capitalize'>
          <Link href="/">
            <div className="mr-4">Home</div>
          </Link>
          <Link href="/performance">
            <div className="mr-4">performance</div>
          </Link>
          <Link href="/products">
            <div className="mr-4">products</div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
