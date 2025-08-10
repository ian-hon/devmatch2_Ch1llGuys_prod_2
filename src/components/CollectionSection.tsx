// mock data
const collections = [
    { name: 'AI Collection', items: '3.5k items' },
    { name: '3D Art Collection', items: '2.1k items' },
    { name: 'Digital 3D Art Collection', items: '4.2k items' }
];

function CollectionSection() {
    return (
        <section className="px-8 py-12 my-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-orange-500 text-sm font-medium mb-2">COLLECTIONS</div>
                    <h2 className="text-3xl font-bold">Popular Collection</h2>
                </div>
                {/* do what on press? */}
                <button className="text-orange-500 hover:text-orange-400">Browse →</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {collections.map((collection, index) => (
                    <div key={index} className="bg-[rgb(4,4,4)] rounded-xl overflow-hidden hover:bg-gray-950 transition-colors">
                        <div className="grid grid-cols-3 gap-1 mb-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="aspect-square bg-gradient-to-br from-orange-400 to-red-600"></div>
                            ))}
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold mb-1">{collection.name}</h3>
                            <p className="text-gray-400 text-sm">{collection.items}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )

}

export default CollectionSection;