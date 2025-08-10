import { useEffect, useState } from 'react'
// import { WalletAccount } from '@wallet-standard/base';
// import { SuiClient } from '@mysten/sui/client';
import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { useNetworkVariable } from '../networkConfig';
import { Text } from '@radix-ui/themes'
import Footer from '../components/Footer';
import '../index.css';
import { useNavigate } from 'react-router-dom';


const Minting = () => {
    let navigate = useNavigate();

    const packageID = useNetworkVariable("PackageId");
    const suiClient = useSuiClient();

    const [mintEnabled, changeMintEnabled] = useState(false);

    const {
        mutate: signAndExecute,
        isSuccess,
        isPending
    } = useSignAndExecuteTransaction();

    async function mintNFT(seed: number, name: string, description: string, mediaURL: string) {
        if (!mintEnabled) {
            return;
        }
        // if (!(name || description || mediaURL)) {
        //     return;
        // }

        const tx = new Transaction();

        tx.moveCall({
            arguments: [tx.pure.u64(seed), tx.pure.string(name), tx.pure.string(description), tx.pure.string(mediaURL)],
            target: `${packageID}::nft::mint_NFT`
        });


        //Continue Here
        signAndExecute({ transaction: tx },
            {
                onSuccess: async ({ digest }) => {
                    await suiClient.waitForTransaction({
                        digest: digest,
                        options: {
                            showEffects: true,
                        },
                    });


                    await suiClient.getTransactionBlock({
                        digest: digest,
                        options: {
                            showBalanceChanges: true,
                            showEffects: true,
                            showEvents: true,
                            showInput: true,
                            showObjectChanges: true
                        }
                    });

                    navigate('/my-collections');
                }
            }
        )
    }


    function getSeed(): number {
        return Math.floor(Math.random() * 100000);
    }


    const [imageURL, setImageURL] = useState("")
    const [imageName, setImageName] = useState("")
    const [imageDescription, setImageDescription] = useState("")
    const [isValidURL, setIsValidURL] = useState(true);

    // Simple URL validation
    function validateURL(url: string): boolean {
        if (!url.trim()) return true; // Empty is valid (optional)

        try {
            new URL(url);
            return url.startsWith('http://') || url.startsWith('https://');
        } catch {
            return false;
        }
    }

    const handleURLChange = (url: string) => {
        setImageURL(url);
        setIsValidURL(validateURL(url));
    };

    useEffect(() => {
        changeMintEnabled(!!(imageName && imageDescription && imageURL));
    }, [imageName, imageDescription, imageURL]);


    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-black-900 to-gray-800 text-white min-w-full py-8 px-10">
            <div className="flex flex-col space-y-6 w-200">
                <span
                    className="text-4xl font-bold text-transparent bg-clip-text bg-orange-500 flex justify-center"
                >
                    Mint Your NFT
                </span>
                <br />


                <div className="space-y-6 bg-black-800/60 p-8 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
                    <input
                        type="text"
                        placeholder="Enter NFT name"
                        value={imageName}
                        onChange={(e) => setImageName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                    />

                    <textarea
                        placeholder="Enter NFT description"
                        value={imageDescription}
                        onChange={(e) => setImageDescription(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 resize-none"
                    />

                    <input
                        type="url"
                        placeholder="Enter NFT Media URL"
                        value={imageURL}
                        onChange={(e) => handleURLChange(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                    />


                    <Text className="flex flex-col items-center justify-center text-lg font-medium text-orange-500">Preview</Text>
                    <div className='flex justify-center mt-5'>
                        <div className="w-72 h-72 rounded-xl overflow-hidden border border-gray-700 bg-gray-800/60 shadow-md backdrop-blur-sm flex justify-center item-center">
                            {imageURL.trim() && isValidURL ? (
                                <img
                                    src={imageURL}
                                    alt={imageName || 'NFT Preview'}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <div className={`flex items-center justify-center text-gray-400 ${imageURL.trim() && isValidURL ? 'hidden' : ''}`}>
                                    {!isValidURL && imageURL.trim() ? 'Invalid URL' : 'No image provided'}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <br />

                <button
                    onClick={() => mintNFT(getSeed(), imageName, imageDescription, imageURL)}
                    disabled={isPending || (!mintEnabled)}
                    className={`
                        w-full py-3 px-4 rounded-lg font-medium 
                        bg-orange-500 hover:bg-orange-600 transition duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed
                        focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50
                        text-xl font-bold cursor-pointer
                    `}
                >
                    {isPending ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Minting...
                        </span>
                    ) : (
                        'Mint NFT'
                    )}
                </button>
            </div>
            <br />
            <div className="flex index-start">
                <Footer />
            </div>
        </div>

    )
}

export default Minting