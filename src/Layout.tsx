import { ConnectButton, useCurrentAccount, useSuiClient } from "@mysten/dapp-kit"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import ListingPopUp from "./components/ListingPopUp_";
import "./index.css"
import { useEffect, useState } from "react"
import { NFT_TYPE } from "./constants"

const Layout = () => {
  const [showListingPopup, setShowListingPopup] = useState(false);

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



  const handleListNFTClick = () => {
    setShowListingPopup(true);
  };

  return (
    <div className="bg-gradient-to-b from-black-900 to-gray-850 text-white min-h-screen">
      <Navbar onListNFTClick={handleListNFTClick} />
      <Outlet />
      <ListingPopUp

        isOpen={showListingPopup}
        onClose={() => setShowListingPopup(false)}
        userNFTs={ownedNFTs}
      />
    </div>
  )
}

export default Layout