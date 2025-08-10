import { useSuiClient } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react'
import { MARKETPLACE_ID } from '../constants';

const Landing = () => {
    const suiClient = useSuiClient();
    const [_, setDisplayList] = useState<object[]>([]);

    useEffect(() => { fetchMarketplace() }, [])

    async function fetchMarketplace() {
        //Get Marketplace
        let marketplace = await suiClient.getObject({
            id: MARKETPLACE_ID,
            options: {
                showContent: true,
                showType: true
            }
        });

        //Get Required Fields
        let marketplaceInfo = marketplace?.data?.content;
        let listingBag;
        if (marketplaceInfo?.dataType === "moveObject") {
            listingBag = (marketplaceInfo as any).fields.listingBag

        }

        //Get Listing IDs
        let listingBagFields;
        let listingIdList: string[] = [];
        listingBagFields = await suiClient.getDynamicFields({ parentId: listingBag.fields.id.id })
        listingBagFields = listingBagFields.data

        listingBagFields.map((listing) => {
            listingIdList.push(listing.objectId)
        })

        let actualListings: object[] = [];

        //Add the Listing Info Into actualListings
        await Promise.all(listingIdList.map(async (listingId) => {
            let currListing = await suiClient.getObject({
                id: listingId,
                options: {
                    showContent: true,
                    showType: true
                }
            });

            if (currListing.data?.content?.dataType === "moveObject") actualListings.push(currListing.data?.content?.fields)
        }))

        setDisplayList(actualListings)
    }

    return (
        <>
        </>
    )
}

export default Landing