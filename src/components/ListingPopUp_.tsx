import { Transaction } from '@mysten/sui/transactions';
import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit'

import { useState } from 'react';
import { AUCTIONHOUSE_ID, CLOCK_ID, MARKETPLACE_ID } from '../constants';
import { useNetworkVariable } from '../networkConfig';
import { useNavigate } from 'react-router-dom';

type ListingProps = {
  isOpen: boolean,
  onClose: any,
  userNFTs: any
};

const ListingPopUp = (props: ListingProps) => {
  const navigate = useNavigate();

  const suiClient = useSuiClient();
  const packageID = useNetworkVariable("PackageId");
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const [selectedNFT, setselectedNFT] = useState('');
  const [listingType, setListingType] = useState('fixed');
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState("7");

  const handleNFTSelect = (nftId: string) => {
    if (nftId === selectedNFT) {
      setselectedNFT('');
    } else {
      setselectedNFT(nftId);
    }

  };

  const handleSubmitListing = () => {
    if (selectedNFT.length === 0) {
      alert('Please select at one NFT');
      return;
    }
    if (price === 0) {
      alert('Please enter a price');
      return;
    }

    const listingData = {
      nftIds: selectedNFT,
      type: listingType,
      price: price,
      duration: listingType === 'auction' ? duration : null
    };
    console.log('Listing data:', listingData);
    console.log(selectedNFT, price)
    // Reset form and close popup
    setselectedNFT('');
    setPrice(0);
    setDuration('7');

    props.onClose();
  };

  async function startAuction(minPrice: number, duration: number, nft: string) {
    const tx = new Transaction();

    //Convert to SUI and Days
    minPrice = Math.floor(minPrice * 1e9);
    duration = duration * 86400000;

    let deposit = tx.splitCoins(tx.gas, [tx.pure.u64(100000000)]);

    tx.moveCall({
      arguments: [tx.object(AUCTIONHOUSE_ID), tx.object(deposit), tx.pure.u64(minPrice), tx.pure.u64(duration), tx.object(nft), tx.object(CLOCK_ID)],
      target: `${packageID}::bidding::startAuction`
    })

    signAndExecute({ transaction: tx },
      {
        onSuccess: async ({ digest }) => {
          await suiClient.waitForTransaction({
            digest: digest,
            options: {
              showEffects: true,
            },
          });
          // refresh (settled)
          window.location.reload();
          navigate('/auctions');
        }
      }
    )
  }

  async function createListing(nft: string, price: number) {
    handleSubmitListing();

    const tx = new Transaction();
    price = Math.floor(price * 1e9);

    tx.moveCall({
      arguments: [tx.object(MARKETPLACE_ID), tx.object(nft), tx.pure.u64(price), tx.object(CLOCK_ID)],
      target: `${packageID}::marketplace::createListing`
    });

    signAndExecute({ transaction: tx },
      {
        onSuccess: async ({ digest }) => {
          await suiClient.waitForTransaction({
            digest: digest,
            options: {
              showEffects: true,
            },
          });
          // refresh (settled)
          navigate('/marketplace');
        }
      }
    )
  }

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">List Your NFTs</h2>
          <button
            onClick={() => props.onClose()}

            className="text-gray-400 hover:text-white text-2xl"
          >

          </button>
        </div >

        <div className="flex-1 overflow-y-auto">
          {/* NFT Selection Grid */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Select NFTs to List
            </h3>


            {props.userNFTs.length === 0 ? (

              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-400">No NFTs found in your wallet</p>
                <p className="text-gray-500 text-sm mt-2">Connect your wallet or mint some NFTs first</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                {props.userNFTs.map((nft: any) => (
                  <div
                    key={nft.id.id}
                    className={`bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all ${nft.id.id == selectedNFT
                      ? 'border border-orange-500 rounded-md bg-gray-700'
                      : 'hover:bg-gray-700'
                      }`}
                    onClick={() => handleNFTSelect(nft.id.id)}
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
                      {(selectedNFT === nft.id.id) && (
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
          {selectedNFT && (
            <div className="px-6 pb-6 border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Listing Details</h3>

              {/* Listing Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Listing Type
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setListingType('fixed')}

                    className={`px-4 py-2 rounded-lg font-medium ${listingType === 'fixed'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    Fixed Price
                  </button>
                  <button
                    onClick={() => setListingType('auction')}

                    className={`px-4 py-2 rounded-lg font-medium ${listingType === 'auction'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}

                  >
                    Auction
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {listingType === 'fixed' ? 'Price' : 'Starting Price'} (SUI)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}

                  onChange={(e) => setPrice(Math.max(parseFloat(e.target.value), 0))}

                  placeholder="0.00"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Auction Duration */}
              {listingType === 'auction' && (
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
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex justify-between items-center">
          <div />
          <div className="flex space-x-3">
            <button
              onClick={props.onClose}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={listingType === "fixed" ? () => {
                createListing(selectedNFT, price)
              } : () => { startAuction(price, parseInt(duration), selectedNFT) }}
              disabled={!selectedNFT}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              List NFT
            </button>
          </div>
        </div>
      </div >
    </div >
  );
};

export default ListingPopUp;