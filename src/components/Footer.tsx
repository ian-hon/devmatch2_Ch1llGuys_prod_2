import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="px-8 py-12 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-8 mb-8 ml-10">
                {/* Marketplace */}
                <div>
                    <h4 className="font-bold mb-4">Marketplace</h4>
                    <div className="space-y-2 text-gray-400">
                        <Link to="/" className="block hover:text-white transition-colors">
                            <div>Home</div>
                        </Link>
                        <Link to="/marketplace" className="block hover:text-white transition-colors">
                            <div>Marketplace</div>
                        </Link>
                        <Link to="/auctions" className="block hover:text-white transition-colors">
                            <div>Auction</div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-400 text-sm">
                © Copyright 2025 TBD, All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;