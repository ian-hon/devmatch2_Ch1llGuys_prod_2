import { Link } from "react-router-dom";
import PlaceholderNFTCard from "./PlaceholderNFTCard";

// Type for a single NFT
export interface NFTItem {
  UID: string;
  nftName: string;
  description: string;
  asset_url: string; // could be emoji or image URL
  level: number;
  XP: number;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic";
  price: string; // formatted string, e.g., "4.20 SUI"
  currentOwner: string;
  previousOwners: string[];
  tags: string[];
}

// Mock data
const trendingNFTs: NFTItem[] = [
  {
    UID: "nft001",
    nftName: "Colorful Dog",
    description: "A vibrant NFT of a colorful dog emoji.",
    asset_url: "🐕",
    level: 1,
    XP: 100,
    rarity: "common",
    price: "4.20 SUI",
    currentOwner: "jk",
    previousOwners: [],
    tags: ["animal", "emoji", "dog"],
  },
  {
    UID: "nft002",
    nftName: "Space Dressing",
    description: "A rocket emoji symbolizing a journey into space.",
    asset_url: "🚀",
    level: 2,
    XP: 240,
    rarity: "uncommon",
    price: "4.20 SUI",
    currentOwner: "jk",
    previousOwners: ["kai"],
    tags: ["space", "emoji", "rocket"],
  },
  {
    UID: "nft003",
    nftName: "Angel Comes",
    description: "An angel emoji representing purity and grace.",
    asset_url: "👼",
    level: 3,
    XP: 400,
    rarity: "rare",
    price: "4.20 SUI",
    currentOwner: "jk",
    previousOwners: ["kai"],
    tags: ["angel", "emoji", "heaven"],
  },
  {
    UID: "nft004",
    nftName: "Pinky Girl",
    description: "A pink girl emoji full of charm.",
    asset_url: "👧",
    level: 1,
    XP: 90,
    rarity: "mythic",
    price: "4.20 SUI",
    currentOwner: "jk",
    previousOwners: [],
    tags: ["girl", "pink", "emoji"],
  },
];

function TrendingNFTSection() {
  return (
    <section className="px-8 py-12 my-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-orange-500 text-sm font-medium mb-2">NFTs</div>
          <h2 className="text-3xl font-bold">Trending NFTs</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {trendingNFTs.map((item, index) => (
          <PlaceholderNFTCard item={item} key={index} />
        ))}
      </div>

      {/* Link to marketplace */}
      <Link to="/marketplace">
        <div className="text-center mt-8">
          <button className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-lg">
            Explore More
          </button>
        </div>
      </Link>
    </section>
  );
}

export default TrendingNFTSection;