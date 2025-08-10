import React, { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Landing from './pages/Marketplace'
import Minting from './pages/Minting'
import Auction from './pages/Auction'
import Collection from './pages/Collection'
import Marketplace from './pages/Marketplace'
import Homepage from './pages/Homepage'
import NFTDetails from './pages/MarketplaceNFTDetails'
import MarketplaceNFTDetails from './pages/MarketplaceNFTDetails'
import CollectionNFTDetails from './pages/CollectionNFTDetails'
import AuctionNFTDetails from './pages/AuctionNFTDetails'


const App = () => {
  const router=createBrowserRouter(
    createRoutesFromElements(
       <Route path="/" element={<Layout/>}>
        <Route index element={<Homepage/>}/>
        <Route path="/marketplace" element={<Marketplace/>}/>
        <Route path="/minting" element={<Minting/>}/>
        <Route path="/auctions" element={<Auction/>}/>
        <Route path="/my-collections" element={<Collection/>}/>
        {/* 3 Details, One for Collection, One for Marketplace, 1 for Bidding */}
        <Route path="/listing-nft-details" element={<MarketplaceNFTDetails/>}/>
        <Route path="/owned-nft-details" element={<CollectionNFTDetails/>}/>
        <Route path="/auction-nft-details" element={<AuctionNFTDetails/>}/>
        <Route path="*" element={<h1 className="text-white text-center text-6xl">Oops. Seems Like There's No Content Here.</h1>}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App