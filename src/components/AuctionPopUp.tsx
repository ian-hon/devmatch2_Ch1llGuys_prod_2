import { useState } from 'react';

const ListingPopup = ({ isOpen, onClose, startAuction, userNFTs }: { isOpen: boolean, onClose: any, startAuction: any, userNFTs: any[] }) => {

  const [selectedNFT, setSelectedNFT] = useState<any>("");
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('7');

  const handleNFTSelect = (nftId: string) => {
    setSelectedNFT(nftId === selectedNFT ? '' : nftId);
  };

  const handleSubmitListing = () => {
    if (selectedNFT === "") {
      alert('Please select at least one NFT');
      return;
    }
    if (!price) {
      alert('Please enter a price');
      return;
    }

    const listingData = {
      nftId: selectedNFT,
      //Round Down to Smallest Unit of Billion
      price: Math.floor(parseFloat(price) * 1e9),
      duration: parseInt(duration) * 86400000
    };


    startAuction(listingData.price, listingData.duration, listingData.nftId.id);

    // Reset form and close popup
    setSelectedNFT("");
    setPrice('');
    setDuration('7');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Auction Your NFTs</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* NFT Selection Grid */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Select NFT To Auction
            </h3>

            {userNFTs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-400">No NFTs found in your wallet</p>
                <p className="text-gray-500 text-sm mt-2">Connect your wallet or mint some NFTs first</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {userNFTs.map((nft, key) => (
                  <div
                    key={key}
                    className={`bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedNFT === nft.id
                      ? 'border border-orange-500 rounded-md bg-gray-700'
                      : 'hover:bg-gray-700'
                      }`}
                    onClick={() => handleNFTSelect(nft.id)}
                  >
                    <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-4xl">
                      <img
                        src={nft.mediaURL}
                        alt={nft.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-white text-sm mb-1">{nft.name}</h4>
                      <p className="text-gray-400 text-xs">{nft.collection}</p>
                      {selectedNFT === nft.id && (
                        <div className="mt-2">
                          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                            Selected ✓
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Listing Configuration */}
          {selectedNFT != "" ?
            <div className="px-6 pb-6 border-t border-gray-700 pt-6 flex flex-col gap-[15px]">
              <h3 className="text-lg font-semibold text-white mb-4">Listing Details - Users Need To Pay 0.1 SUI as Deposit (Taxed 5% If No One Bids)</h3>
              {/* Price */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Starting Price (SUI)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={
                    (e) => {
                      if (parseFloat(e.target.value) < 0) {
                        setPrice("0")
                      }
                      else {
                        setPrice(e.target.value)
                      }

                    }
                  }
                  placeholder="0.00"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-orange-500 focus:outline-none"
                />
              </div>


              {/* Auction Duration */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Auction Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-orange-500 focus:outline-none"
                >
                  <option value="1">1 Day</option>
                  <option value="3">3 Days</option>
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="30">30 Days</option>
                </select>
              </div>
            </div>
            : null
          }

          {/* Footer */}
          <div className="p-6 border-t border-gray-700 flex justify-between items-center">

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => { handleSubmitListing() }}
                disabled={selectedNFT === ""}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                List NFT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPopup;