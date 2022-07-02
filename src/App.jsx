import { createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";

const [count, setCount] = createSignal(0);
const [arr, setArr] = createStore([1, 1, 1, 1]);

const App = () => {
  return (
    <>
      <audio src={mosTone} />
      <div className="flex">
        <div class="flex-initial">
          <div className="relative w-screen h-screen bg-white max-w-7xl">
            <For each={arr}>{() => <Mosquito />}</For>
          </div>
        </div>
        <div class="flex-auto m-6">
          <div class="flex flex-col justify-items-center justify-evenly h-full w-full">
            <div class="bg-zinc-200 rounded-3xl h-96">
              <div class="flex flex-col justify-items-center justify-between h-full ">
                <p className="p-4 text-xl font-semibold text-black">
                  SCORE: {count()}
                </p>
                <div class="flex flex-col text-center">
                  <p class="p-2 m-2 bg-zinc-800 text-center rounded-xl">
                    <span class="bg-clip-text text-transparent font-medium bg-gradient-to-r from-lime-400 to-cyan-500">
                      created by <b>tam-arai-sak-yang-tee</b>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="flex justify-evenly font-semibold text-white w-full">
              <a href="https://youtu.be/xm3YgoEiEDc" target="_blank">
                Visit Site
              </a>
              <a href="https://youtu.be/iik25wqIuFo" target="_blank">
                Contribute
              </a>
              <a href="https://youtu.be/mKRZIHwTr-I" target="_blank">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import mosTone from "/mosquito.ogg";
import slapEffect from "/slap.ogg";

const [mosSound, setmosSound] = createSignal(new Audio(mosTone));
const [slapSound, setslapSound] = createSignal(new Audio(slapEffect));

onMount(() => {
  mosSound().loop = true;
  return mosSound().play();
});

function slapMos() {
  slapSound().play();
}

function Mosquito() {
  const [posX, setPosX] = createSignal(Math.floor(Math.random() * 1280) - 32);
  const [posY, setPosY] = createSignal(Math.floor(Math.random() * 800) + 32);
  const [dead, setDead] = createSignal(false);

  const living = setInterval(() => {
    setPosX(Math.floor(Math.random() * 1280) - 32);
    setPosY(Math.floor(Math.random() * 800) + 32);
  }, Math.floor(500 + Math.random() * 500));

  const kill = () => {
    if (!dead()) {
      clearInterval(living);
      ref.src = "/dead_mosquito.jpeg";
      ref.classList.remove("cursor-grab");
      setCount(count() + 1);
      setDead(true);
      setArr([...arr, count() > 2]);
      slapMos();
    }
  };

  let ref;

  return (
    <img
      ref={ref}
      src="/mosquito.jpeg"
      className="absolute w-8 h-8 transition-all bg-red-400 cursor-grab select-none"
      onClick={kill}
      style={{
        top: `${posY()}px`,
        left: `${posX()}px`,
      }}
    />
  );
}

export default App;
