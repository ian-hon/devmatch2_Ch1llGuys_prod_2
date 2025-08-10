import { Link } from "react-router-dom";

const rarityBorderColors = {
  common: "border-black hover:border-gray-400",
  uncommon: "border-black hover:border-green-500",
  rare: "border-black hover:border-blue-500",
  epic: "border-black hover:border-purple-500",
  legendary: "border-black hover:border-yellow-400",
  mythic: "border-black hover:border-pink-500"
};

const rarityTextColors = {
  common: "text-gray-400",
  uncommon: "text-green-500",
  rare: "text-blue-500",
  epic: "text-purple-500",
  legendary: "text-yellow-400",
  mythic: "text-pink-500"
};

function OwnedNFTCard({ item }: { item: any }) {
  let rarity: string = item.rarity.variant;
  const borderColor = rarityBorderColors[rarity as keyof typeof rarityBorderColors] || "border-white";
  const textColor = rarityTextColors[rarity as keyof typeof rarityTextColors] || "text-white";

  return (
    <div className={`bg-[rgb(15,15,15)] rounded-xl hover:bg-[rgb(20,20,20)] transition-colors p-4 border ${borderColor} group h-full flex flex-col`}>
      {/* Image Container */}
      <div className="w-full h-64 aspect-square bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-6xl rounded-lg mb-4 overflow-hidden">
        <img src={item.mediaURL} className="w-full h-full object-cover" />
      </div>


      <div className="flex-1 flex flex-col justify-between">

        {/* Header Section  */}
        <div className="mb-3">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-white text-lg font-semibold leading-tight flex-1 min-w-0">
              <span className="block truncate" title={item.name}>
                {item.name}
              </span>
            </h3>
            <p className="text-orange-500 text-sm whitespace-nowrap">Level {item.level}</p>
          </div>
        </div>

        {/* rarity */}
        <div className="flex justify-between gap-4 mb-4">
          <div className="flex flex-col min-w-0 flex-1">
            <p className="text-gray-400 text-xs uppercase tracking-wide">Rarity</p>
            <p className={`${textColor} text-sm font-medium capitalize truncate`}>
              {rarity}
            </p>
          </div>
        </div>

        {/* Button Section  */}
        <Link to="/owned-nft-details" state={{ collectionNFT: item }}>
          <div className="flex justify-center">
            <button className="relative z-10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:translate-y-8 transition duration-300 py-2 px-4 rounded-md font-medium transition-all duration-300 text-sm">
              Learn More
            </button>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default OwnedNFTCard;