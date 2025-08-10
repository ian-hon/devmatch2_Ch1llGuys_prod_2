import nft from '../assets/nft.png';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="flex items-center justify-between px-40 pb-16 my-20">
      <div className="flex-1 max-w-2xl">
        <div className='mb-8'>
          <h1 className="text-6xl font-bold mb-6">Explore The Best</h1>
          <h1 className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">NFT WORLD</h1>
        </div>

        <p className="text-gray-400 text-lg mb-8">
          Collect And Sell Your Extraordinary Artwork.
        </p>
        <div className="flex space-x-4">
          <Link to={"/marketplace"} >
            <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-medium">
              Explore
            </button>
          </Link>

        
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <img 
          src={nft}
          className="
            w-full h-full object-cover
            [mask-image:radial-gradient(circle,rgba(0,0,0,1)_85%,rgba(0,0,0,0)_100%)]
            [mask-repeat:no-repeat]
            [mask-position:center]
            [mask-size:cover]
            [-webkit-mask-image:radial-gradient(circle,rgba(0,0,0,1)_85%,rgba(0,0,0,0)_100%)]
            [-webkit-mask-repeat:no-repeat]
            [-webkit-mask-position:center]
            [-webkit-mask-size:cover]
          "
        />
      </div>
    </section>
  );
}

export default HeroSection;