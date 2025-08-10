import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit'
import { useEffect, useState } from 'react'
import { NFT_TYPE } from '../constants';
import { Link } from 'react-router-dom';
import OwnedNFTCard from '../components/OwnedNFTCard';
import Footer from '../components/Footer';

//Shows All Owned NFTs
const Collection = () => {
  let userAccount = useCurrentAccount();
  const suiClient = useSuiClient();

  const [ownedNFTs, setOwnedNFTs] = useState<any[]>([])

  useEffect(() => {
    if (userAccount) retrieveCollection()
  },
    [userAccount]
  )

  async function retrieveCollection() {
    if (!userAccount) return

    let userAssets: object[] = []
    let res = await suiClient.getOwnedObjects({
      owner: userAccount?.address,
      options: {
        showType: true
      }
    })

    let allAssets = res.data;

    //Filter The Correct NFT Type, Then Fit The Object Into Array
    await Promise.all((allAssets.map(async (asset) => {
      if (asset.data?.type === NFT_TYPE) {
        let nft = await suiClient.getObject({
          id: asset.data.objectId,
          options: {
            showContent: true
          }
        })
        if (nft.data?.content?.dataType === "moveObject") userAssets.push(nft.data.content.fields)

      }
    }))
    )

    setOwnedNFTs(userAssets)
  }

  //Frontend Hooks
  const [visibleItems, setVisibleItems] = useState(12);
  const displayedNFTs = ownedNFTs.slice(0, visibleItems);
  const loadMore = () => {
    setVisibleItems(prev => prev + 8);
  };

  // Components
  const ProfileHeader = () => (
    <div className="text-center py-16 px-4">
      <div className="mb-6">

        <h3 className="text-4xl md:text-5xl font-bold mb-3">My NFT Collection</h3>
        <p className="text-orange-500 text-lg font-medium mb-4">{userAccount?.address}</p>
        <p className="text-gray-400 text-center">
          Welcome to your personal NFT collection. Manage, view, and track your digital assets.
        </p>
      </div>
      <div className="flex items-center justify-center space-x-2 text-sm">
        <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
        <span className="text-gray-600">→</span>
        <span className="text-orange-500">My Collection</span>
      </div>
    </div>
  );


  const ResultsCount = ({ count }: { count: number }) => (
    <div className="mb-6">
      <p className="text-gray-400 text-sm">{count.toLocaleString()} NFTs in your collection</p>
    </div>
  );

  const NFTGrid = ({ displayedNFTs }: { displayedNFTs: any }) => (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'>
      {displayedNFTs.map((item: any, key: number) => (
        <div key={key} className="w-full">
          <OwnedNFTCard item={item} />
        </div>
      ))}
    </div>
  );

  const LoadMoreButton = ({ onClick }: { onClick: any }) => (
    <div className="text-center mb-16">
      <button
        onClick={onClick}
        className="border border-gray-600 hover:border-orange-500 hover:text-orange-500 px-8 py-3 rounded-lg font-medium transition-colors"
      >
        Load More NFTs
      </button>
    </div>
  );

  const EmptyCollection = () => (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">📦</div>
      <h3 className="text-xl font-bold mb-2">Your Collection is Empty</h3>
      <p className="text-gray-400 mb-6">Start building your NFT collection by exploring the marketplace</p>
      <Link
        to="/marketplace"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Explore Marketplace
      </Link>
    </div>
  );


  return (
    <div className="bg-gradient-to-b from-black-900 to-gray-850 text-white min-h-screen">
      <ProfileHeader />

      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        <ResultsCount count={ownedNFTs.length} />

        {ownedNFTs.length === 0 ? (
          <EmptyCollection />
        ) : (
          <>
            <NFTGrid displayedNFTs={displayedNFTs} />

            {displayedNFTs.length < ownedNFTs.length && (
              <LoadMoreButton onClick={loadMore} />
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Collection