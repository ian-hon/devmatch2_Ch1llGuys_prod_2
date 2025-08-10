import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BiddingPopup from '../components/BiddingPopup';
import { useSuiClient } from '@mysten/dapp-kit';

const AuctionNFTDetails = () => {
  const suiClient = useSuiClient()
  const [biddingPopUp, setBiddingPopUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auction = location.state?.auction;
  console.log("Auction", auction)
  const nft = auction.nft.fields;
  let rarity = nft.rarity.variant;
  let highestBidID = auction.highestBidID;
  const [highestBid, setHighestBid] = useState<any>(null)
  let endDate = new Date(Number(auction.ending));

  const getHighestBid = async () => {
    try {
      let response = await suiClient.getObject({ id: highestBidID, options: { showContent: true, showDisplay: true } });
      setHighestBid((response as any).data?.content.fields)
      console.log("Highest Bid", highestBid)
    }
    catch (err) {
      setHighestBid(null)
    }
  }

  useEffect(() => {
    getHighestBid()
  }, [])

  if (!auction) {
    return <div className="text-white">Auction data not found</div>;
  }

  // Lock background scroll when popup is open
  useEffect(() => {
    if (biddingPopUp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // return clean up function
    return () => {
      document.body.style.overflow = '';
    };
  }, [biddingPopUp]);

  if (!auction) {
    return <div className="text-white">Auction data not found</div>;
  }

  const getRarityStyle = (rarity: string) => {
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

    const base = baseStyles[rarity as keyof typeof baseStyles] || baseStyles.common;
    const border = borderStyles[rarity as keyof typeof borderStyles] || borderStyles.common;

    return `${base} ${border}`;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 overflow-hidden">
        <div className="bg-gray-800 shadow-lg border-b border-gray-700">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <button
              className="flex items-center text-gray-300 hover:text-orange-500 transition-colors"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center p-12">
                  <div className="text-9xl transform hover:scale-110 transition-transform duration-300 w-full h-full">
                    <img className='w-full h-full object-cover rounded-2xl' src={nft.mediaURL} alt={nft.name} />
                  </div>
                </div>
              </div>


            </div>

            <div className="space-y-8">
              <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
                <h1 className="text-4xl font-bold text-white mb-4">{nft.name}</h1>
                <p className="text-lg text-gray-300 leading-relaxed">{nft.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                  <div className="flex items-center mb-2">

                    <span className="text-sm font-medium text-gray-400">Level</span>
                  </div>
                  <div className="text-3xl font-bold text-white">{nft.level}</div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                  <div className="text-sm font-medium text-gray-400 mb-2">Rarity</div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getRarityStyle(rarity)}`}>
                    {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {(highestBid) ? (
                  <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                    <div className="text-sm text-gray-400 mb-2">Current Bid</div>
                    <div className="text-2xl font-bold text-orange-400">{highestBid.amount / 1e9} SUI</div>
                  </div>
                ) : (
                  <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                    <div className="text-sm text-gray-400 mb-2">Minimum Bid</div>
                    <div className="text-2xl font-bold text-green-400">{auction.minPrice / 1e9} SUI</div>
                  </div>
                )}
                <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">Ending In</div>
                  <div className="text-2xl font-bold text-red-400">{(endDate).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  onClick={() => setBiddingPopUp(true)}
                >
                  Place Bid
                </button>
              </div>



            </div>
          </div>
        </div>

      </div>
      <BiddingPopup
        isOpen={biddingPopUp}
        onClose={() => setBiddingPopUp(false)}
        auction={auction}
      />
    </>
  );
};

export default AuctionNFTDetails;
