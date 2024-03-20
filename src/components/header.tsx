function Header() {
  return (
    <div className="container header_inner">
      <div className="links">
        <a href="#" className="text-gray-800 hover:text-gray-600 font-semibold">
          Home
        </a>
        <a href="#" className="text-gray-800 hover:text-gray-600 font-semibold">
          About
        </a>
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
    </div>
  );
}

export default Header;
