import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosTrendingUp } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { FaRegClock, FaRegUser } from "react-icons/fa6";


const CollectionNFTDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nft = location.state?.collectionNFT;
  let rarity: string = nft.rarity.variant;
  let prevOwners: any[] = nft.prevOwners;
  console.log("NFT IS", nft)

  if (!nft) {
    return <div className="text-white">NFT data not found</div>;
  }

  const currentLevelXP = Number(nft.xp);
  const xpToNextLevel = Number(nft.xp_to_next_level);
  const xpProgress = (currentLevelXP / (currentLevelXP + xpToNextLevel)) * 100;

  // Rarity colors and styles for dark theme
  const getRarityStyle = (rarity: any) => {
    const baseStyles = {
      common: 'bg-gray-700 text-gray-200',
      uncommon: 'bg-green-900 text-green-200',
      rare: 'bg-blue-900 text-blue-200',
      epic: 'bg-purple-900 text-purple-200',
      legendary: 'bg-orange-900 text-orange-200',
      mythic: 'bg-pink-900 text-pink-200'
    };

    const borderStyles = {
      common: 'border-black hover:border-gray-400',
      uncommon: 'border-black hover:border-green-500',
      rare: 'border-black hover:border-blue-500',
      epic: 'border-black hover:border-purple-500',
      legendary: 'border-black hover:border-yellow-400',
      mythic: 'border-black hover:border-pink-500'
    };

    const base = baseStyles[rarity as keyof typeof baseStyles] || 'bg-gray-700 text-gray-200';
    const border = borderStyles[rarity as keyof typeof borderStyles] || 'border-black hover:border-gray-400';

    return `${base} ${border}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            className="flex items-center text-gray-300 hover:text-orange-500 transition-colors"
            onClick={() => navigate(-1)}>
            <GoArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - NFT Image */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center p-12">
                <div className="text-9xl transform hover:scale-110 transition-transform duration-300 w-full h-full">

                  <img className='w-full h-full object-cover rounded-2xl' src={nft.mediaURL} alt={nft.name} />
                </div>
              </div>
            </div>

            {/* Tags */}
            {/* <div className="flex flex-wrap gap-2">
              {nft.tags.map((tag:any, index:number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300 border border-gray-600 hover:border-orange-500 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div> */}
          </div>

          {/* Right Column - NFT Details */}
          <div className="space-y-8">
            {/* Title Section */}
            <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
              <h1 className="text-4xl font-bold text-white mb-4">{nft.name}</h1>
              <p className="text-lg text-gray-300 leading-relaxed">{nft.description}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Level */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                <div className="flex items-center mb-2">
                  <IoIosTrendingUp className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-sm font-medium text-gray-400">Level</span>
                </div>
                <div className="text-3xl font-bold text-white">{nft.level}</div>
              </div>

              {/* Rarity */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-400 ml-2">Rarity</span>
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getRarityStyle(rarity)}`}>
                  {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </div>
              </div>
            </div>

            {/* XP Progress */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FaRegClock className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="font-medium text-white">Experience Points</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white">Current XP: {currentLevelXP}</span>
                  <span className="text-white">Next Level: {xpToNextLevel} XP</span>
                </div>

                <div className="text-center text-sm text-gray-400">
                  {Math.round(xpProgress)}% to Level {Number(nft.level) + 1}
                </div>
              </div>
            </div>

            {/* Ownership Info */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h3 className="font-semibold text-white mb-4 flex items-center">
                <FaRegUser className="w-5 h-5 mr-2 text-orange-500" />
                Ownership
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col mb-[10px]">
                  <h1 className="text-gray-400">Current Owner</h1>
                  <h1 className="font-sm text-white">{nft.owner}</h1>
                </div>

                {prevOwners.length > 0 && (
                  <div className="pt-2 border-t flex flex-col border-gray-700">
                    <h1 className="text-sm text-gray-400">Previous Owners: </h1>
                    <h1 className="text-sm text-gray-300">
                      {prevOwners.map((owner) => (<h1 className="font-sm text-white">{owner}</h1>))}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionNFTDetails;