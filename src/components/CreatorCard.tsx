import { StarIcon } from "@radix-ui/react-icons";

// creator prop will have followers, verfied and name
type CreatorProp = {
    creator: {
        name: string,
        verified: boolean,
        followers: string
    },
    ranking: number
};

const CreatorCard = (prop: CreatorProp) => {
    const { creator, ranking } = prop;

    return (
        <div className="bg-[rgb(15,15,15)] hover:bg-[rgb(20,20,20)] transition-colors rounded-md p-4 pl-0 text-center flex">
            <div className="bg-orange-500 w-10 h-5 flex justify-center item-center">
                <p className="text-sm">#{ranking}</p>
            </div>
            <div className="w-60"></div>
            <div className="flex flex-col items-center justify-center mb-1">
                <div className="flex justify-between gap-2 py-3">
                    <h3 className="font-medium text-lg">
                        {creator.name}
                    </h3>
                    <div className="pt-1">
                        {creator.verified && <StarIcon className="w-4 h-4 text-orange-500 fill-current" />}
                    </div>
                </div>

                <p className="text-gray-400 text-sm">{creator.followers}</p>
            </div>
        </div>
    )


}

export default CreatorCard;