import CreatorCard from "./CreatorCard";

// mock data
const creators = [
    { name: '@jane_doe', followers: '1,453', verified: true },
    { name: '@mike_art', followers: '2,341', verified: true },
    { name: '@crypto_k', followers: '987', verified: false },
    { name: '@nft_ki', followers: '3,142', verified: true },
    { name: '@alex4real', followers: '1,789', verified: false },
    { name: '@super11', followers: '2,567', verified: true },
    { name: '@kenga', followers: '4,321', verified: false },
    { name: '@annie', followers: '1,634', verified: true }
];

function CreatorSection() {
    return (
        <section className="px-8 py-12 my-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-orange-500 text-sm font-medium mb-2">CREATORS</div>
                    <h2 className="text-3xl font-bold">Trending Creators</h2>
                </div>
                <button className="text-orange-500 hover:text-orange-400">Creators →</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {creators.map((creator, index) => (
                    <CreatorCard creator={creator} key={index} ranking={index + 1} />
                ))}
            </div>
        </section>
    )
}

export default CreatorSection;

