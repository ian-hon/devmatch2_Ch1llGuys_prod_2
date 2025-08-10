import { useSuiClient } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react'
import { MARKETPLACE_ID } from '../constants';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ListingNFTCard from '../components/ListingNFTCard';

const Marketplace = () => {
  const suiClient = useSuiClient();
  const [marketplaceItems, setMarketplaceItems] = useState<any[]>([])


  useEffect(() => { retrieveMarketplace() }, [])

  async function retrieveMarketplace() {
    //Get Marketplace
    let marketplace = await suiClient.getObject({
      id: MARKETPLACE_ID,
      options: {
        showContent: true,
        showType: true
      }
    });

    //Get Listing Bag ID
    let listingBagId;
    if (marketplace.data?.content?.dataType === "moveObject") {
      listingBagId = (marketplace as any).data.content.fields.listingBag.fields.id.id
    }

    //Get All Listing IDs
    let listingFields;
    listingFields = await suiClient.getDynamicFields({ parentId: listingBagId });
    listingFields = listingFields.data;

    //Get Listing Objects
    let actualListings: any[] = [];
    await Promise.all(listingFields.map(async (listingField) => {
      let listing = await suiClient.getObject({
        id: listingField.objectId,
        options: {
          showContent: true
        }
      })
      actualListings.push((listing as any).data.content.fields)
    }))

    setMarketplaceItems(actualListings);
    console.log("Marketplace", marketplace)
  }

  //Frontend Hooks
  const [visibleItems, setVisibleItems] = useState(12);
  const displayedNFTs = marketplaceItems.slice(0, visibleItems);
  const loadMore = () => {
    setVisibleItems(prev => prev + 8);
  };

  //components
  const ExploreHeader = () => (
    <div className="text-center py-16 px-4">
      <p className="text-orange-500 text-sm font-medium mb-2">Explore</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome To Explore</h1>
      <div className="flex items-center justify-center space-x-2 text-sm">
        <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
        <span className="text-gray-600">→</span>
        <span className="text-orange-500">Explore</span>
      </div>
    </div>
  );

  const ResultsCount = ({ count }: { count: number }) => (
    <div className="mb-6">
      <p className="text-gray-400 text-sm">{count.toLocaleString()} results found</p>
    </div>
  );

  //max 4 cards per row using grid layout (maybe can change to flex also?)
  const NFTGrid = ({ displayedNFTs }: { displayedNFTs: any }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
      {displayedNFTs.map((item: any) => (
        <div key={item.UID} className="w-full">
          <ListingNFTCard item={item} />
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
        Load More
      </button>
    </div>
  );


  const NoResults = () => (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-bold mb-2">No NFTs</h3>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-black-900 to-gray-850 text-white min-h-screen">
      <ExploreHeader />

      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        <ResultsCount count={marketplaceItems.length} />

        {marketplaceItems.length > 0 ? (
          <>
            <NFTGrid displayedNFTs={displayedNFTs} />

            {displayedNFTs.length < marketplaceItems.length && (
              <LoadMoreButton onClick={loadMore} />
            )}
          </>
        ) : (
          <NoResults />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Marketplace