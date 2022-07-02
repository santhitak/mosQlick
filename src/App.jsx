import { createEffect, createSignal, onMount } from 'solid-js'
import { createStore } from 'solid-js/store'

const [count, setCount] = createSignal(0);
const [arr, setArr] = createStore([1, 1, 1, 1])

const App = () => {
  return (
    <div className="flex bg-black">
      <div className="relative w-screen h-screen bg-white max-w-7xl">
        <For each={arr}>
          { () => <Mosquito /> }
        </For>
      </div>
      <p className='p-4 text-xl text-white'>score: { count() }</p>
    </div>
  );
};

function Mosquito() {
  const [posX, setPosX] = createSignal(Math.floor(Math.random() * 1280) - 32);
  const [posY, setPosY] = createSignal(Math.floor(Math.random() * 800) + 32);
  const [dead, setDead] = createSignal(false);

  const living = setInterval(() => {
    setPosX(Math.floor(Math.random() * 1280) - 32)
    setPosY(Math.floor(Math.random() * 800) + 32)
  }, Math.floor(500 + Math.random() * 500))

  const kill = () => {
    if (!dead()) {
      clearInterval(living);
      ref.src = '/dead_mosquito.jpeg'
      ref.classList.remove('cursor-pointer')
      setCount(count() + 1)
      setDead(true)
      setArr([...arr, 1])
    }
  }

  let ref;

  return (
    <img
      ref={ref}
      src="/mosquito.jpeg"
      className="absolute w-16 h-16 transition-all bg-red-400 cursor-pointer select-none"
      onClick={kill}
      style={{
        "top": `${posY()}px`, "left": `${posX()}px`
      }}
    />
  )
}

export default App;
