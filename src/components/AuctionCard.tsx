import { Link } from "react-router-dom";
import { useSuiClient } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";

const rarityBorderColors = {
    'common': "border-black hover:border-gray-400",
    'uncommon': "border-black hover:border-green-500",
    'rare': "border-black hover:border-blue-500",
    'epic': "border-black hover:border-purple-500",
    'legendary': "border-black hover:border-yellow-400",
    'mythic': "border-black hover:border-pink-500"
};

const rarityTextColors = {
    'common': "text-gray-400",
    'uncommon': "text-green-500",
    'rare': "text-blue-500",
    'epic': "text-purple-500",
    'legendary': "text-yellow-400",
    'mythic': "text-pink-500"
};



// not sure what the auction prop will be
const AuctionCard = ({ auction }: { auction: any }) => {
    const suiClient = useSuiClient();
    const nft = auction.nft.fields;
    //Get Highest Bid
    let highestBidID = auction.highestBidID;
    let highestBid: any;

    const [timeText, changeTimeText] = useState(timeToText(auction.ending));

    setInterval(() => {
        changeTimeText(timeToText(auction.ending));
    }, 1000);

    const getHighestBid = async () => {
        try {
            highestBid = await suiClient.getObject({ id: highestBidID, options: { showContent: true, showDisplay: true } });
        }
        catch (err) {
            highestBid = null
        }
    }

    useEffect(() => {
        getHighestBid()
    }, [])

    const borderColor = rarityBorderColors[nft.rarity.variant as keyof typeof rarityBorderColors] || "border-white";
    const textColor = rarityTextColors[nft.rarity.variant as keyof typeof rarityTextColors] || "text-white";

    function timeToText(target: any) {
        target /= 1000;

        var result = '';
        var length = Math.ceil(target - (new Date().getTime() / 1000));

        if (length <= 0) {
            return 'Ended';
        }

        let d = Math.ceil(length / 86400);
        let h = Math.ceil((length % 86400) / 3600);
        let m = Math.ceil((length % 3600) / 60);
        let s = length % 60;

        if (s >= 60) {
            s = 0;
            m += 1;
        }

        if (m >= 60) {
            m = 0;
            h += 1;
        }

        if (h >= 24) {
            h = 0;
            d += 1;
        }

        let t = "";
        let flag = true;
        for (const e of [[d, 'd'], [h, 'h'], [m, 'm'], [s, 's']]) {
            if ((e[0] == 0) && flag) {
                continue;
            }
            flag = false;
            t += `${e[0]}${e[1]} `;
        }

        result += `${t}`;

        return result;
    }

    return (
        <div className={`bg-[rgb(15,15,15)] rounded-xl hover:bg-[rgb(20,20,20)] transition-colors p-4 border ${borderColor} group h-full flex flex-col`}>

            {/* Image / Emoji - Fixed aspect ratio */}
            <div className="aspect-square bg-gradient-to-br from-orange-400 to-red-600 flex auctions-center justify-center text-6xl rounded-lg mb-4">
                <img src={nft.mediaURL} className="w-full h-full object-cover" />
            </div>
            {/* Content Section - Grows to fill remaining space */}
            <div className="flex-1 flex flex-col justify-between">
                {/* Header Section */}
                <div className="mb-3">
                    <h3 className="text-white text-lg font-semibold leading-tight mb-2 truncate" title={nft.name}>
                        {nft.name}
                    </h3>

                    {/* Level & Rarity */}
                    <div className="flex justify-between text-xs text-gray-400 mb-3">
                        <div>
                            <span>Level: </span>
                            <span className="text-white font-medium">{nft.level}</span>
                        </div>
                        <div>
                            <span>Rarity: </span>
                            <span className={`capitalize font-medium ${textColor}`}>{nft.rarity.variant}</span>
                        </div>
                    </div>
                </div>

                {/* Bid Information */}

                <div className="mb-3 space-y-2">
                    {(highestBid) ? (
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Current Bid:</span>
                            <span className="text-white font-semibold">{highestBid.amount / 1e9} SUI</span>
                        </div>
                    ) : (
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Min Bid:</span>
                            <span className="text-white font-medium">{auction.minPrice / 1e9} SUI</span>
                        </div>
                    )}
                </div>

                {/* Countdown Timer */}
                <div className="text-center mb-4">
                    <div className="text-xs text-gray-400 mb-1">Ends in:</div>
                    <div className="text-orange-500 font-semibold text-sm">
                        <h1>{timeText}</h1>
                    </div>
                </div>

                {/* Place Bid Button - Always at bottom */}
                <div className="flex justify-center">
                    {/* TODO: link to nftdetails? according to our discussion */}
                    <Link to={"/auction-nft-details"} state={{ auction: auction }}>
                        <button className="border border-gray-500 group-hover:border-orange-500 relative z-10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white py-2 px-4 rounded-md font-medium transition-all duration-300 text-sm group-hover:translate-y-8 transition duration-300"
                        >
                            Learn More →
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default AuctionCard;