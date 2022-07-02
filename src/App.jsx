import { createSignal } from 'solid-js';
// import Mosquito from './components/Mosquito'

const [count, setCount] = createSignal(0);

const App = () => {
  return (
    <div className="flex bg-black">
      <div className="relative w-screen h-screen bg-white max-w-7xl">
        <Mosquito />
        <Mosquito />
        <Mosquito />
        <Mosquito />
        <Mosquito />
        <Mosquito />
      </div>
      <p className='p-4 text-xl text-white'>score: { count() }</p>
    </div>
  );
};

function Mosquito() {
  const [posX, setPosX] = createSignal(0);
  const [posY, setPosY] = createSignal(0);
  const [dead, setDead] = createSignal(false);

  const living = setInterval(() => {
    setPosX(Math.floor(Math.random() * 1280) - 32)
    setPosY(Math.floor(Math.random() * 800) + 32)
  }, Math.floor(500 + Math.random() * 1000))

  const kill = () => {
    if (!dead()) {
      clearInterval(living);
      ref.src = '/dead_mosquito.jpeg'
      ref.classList.remove('cursor-pointer')
      setCount(count() + 1)
      setDead(true)
    }
  }

  let ref;

  return (
    <img
      ref={ref}
      src="/mosquito.jpeg"
      className="absolute w-8 h-8 transition-all bg-red-400 cursor-pointer select-none"
      onClick={kill}
      style={{
        "top": `${posY()}px`, "left": `${posX()}px`
      }}
    />
  )
}

export default App;
