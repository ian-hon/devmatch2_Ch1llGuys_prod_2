import { ConnectButton } from "@mysten/dapp-kit";
import { Link } from "react-router-dom";

function Navbar({ onListNFTClick }: { onListNFTClick: any }) {
  return (
    <>
      <header className="relative flex items-center justify-between px-8 py-6">
        <Link to="/" className="text-2xl font-bold text-orange-500 hover:text-orange-400">
          N
        </Link>
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/marketplace" className="text-gray-300 hover:text-white">
            Marketplace
          </Link>
          <Link to="/auctions" className="text-gray-300 hover:text-white">
            Auctions
          </Link>
          <Link to="/minting" className="text-gray-300 hover:text-white">
            Minting
          </Link>
          <Link to="/my-collections" className="text-gray-300 hover:text-white">
            My Collection
          </Link>
        </nav>
        <div className="flex gap-[12px]">
          <button
            className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-medium"
            onClick={() => onListNFTClick()}
          >
            Listing
          </button>
          <ConnectButton />

        </div>


      </header>
    </>
  );
}

export default Navbar;