import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import React, { useEffect, useState } from 'react';
import { AUCTIONHOUSE_ID, CLOCK_ID } from '../constants';
import { useNetworkVariable } from '../networkConfig';

interface BiddingPopupProps {
    isOpen: boolean;
    onClose: () => void;
    auction: any;
}

const BiddingPopup: React.FC<BiddingPopupProps> = ({ isOpen, onClose, auction }) => {
    // TODO : check if this is ok
    // const userAccount = useCurrentAccount();
    const suiClient = useSuiClient();
    const packageID = useNetworkVariable("PackageId");
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();
    async function createBidding(auction_id: string, bidding: number) {
        const tx = new Transaction();

        bidding = Math.floor(bidding * 1e9);
        console.log(auction_id, bidding)

        let biddingCoin = tx.splitCoins(tx.gas, [tx.pure.u64(bidding)])

        tx.moveCall({
            arguments: [tx.object(AUCTIONHOUSE_ID), tx.pure.id(auction_id), tx.object(biddingCoin), tx.object(CLOCK_ID)],
            target: `${packageID}::bidding::createBidding`
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
                    //Refresh on Finish (untested)
                    window.location.reload();
                }
            }
        )
    }

    // TODO : check if this is ok
    // const nft = auction.nft.fields;
    // let rarity = nft.rarity.variant;
    let highestBidID = auction.highestBidID;
    const [highestBid, setHighestBid] = useState<any>(null)
    const [minValue, setMinValue] = useState<number>(0.00)

    const getHighestBid = async () => {
        try {
            let response = await suiClient.getObject({ id: highestBidID, options: { showContent: true, showDisplay: true } });
            setHighestBid(response.data)
            setMinValue(Number(highestBid.amount) / 1e9)
        }
        catch (err) {
            setHighestBid(null)
            setMinValue(Number(auction.minPrice) / 1e9)
        }
    }

    useEffect(() => {
        getHighestBid()
    }, [])


    const [price, setPrice] = useState<number>(0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className='flex flex-col gap-3 py-10 px-20 bg-[rgb(30,30,30)] rounded-2xl'>
                <div>
                    <button
                        onClick={() => onClose()}
                        className='text-sm text-gray-500 cursor-pointer hover:text-gray-300 transition-colors'
                    >
                        Cancel
                    </button>
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label className="block text-md font-medium text-white mb-5">
                        Enter Your Bidding Price:
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) =>
                            setPrice(Math.max(parseFloat(e.target.value), minValue))
                        }
                        placeholder="0"
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-orange-500 focus:outline-none"
                    />
                    <div className='flex justify-center pt-5 mt-4'>
                        <button
                            onClick={() => createBidding(auction.id.id, price)}
                            className='bg-orange-500 p-2 rounded-sm text-sm cursor-pointer hover:bg-orange-600 transition-colors'
                        >
                            Place Bid
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BiddingPopup;