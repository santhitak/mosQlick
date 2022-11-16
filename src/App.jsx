import { createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import mosTone from "/mosquito.ogg";
import slapEffect from "/slap.ogg";

const [mosSound, setmosSound] = createSignal(new Audio(mosTone));
const [slapSound, setslapSound] = createSignal(new Audio(slapEffect));

const [count, setCount] = createSignal(0);
const [arr, setArr] = createStore([1, 1, 1, 1]);
const [alive, setAlive] = createSignal(4);

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
              <div class="flex flex-col justify-items-center justify-between h-full text-center">
                <div>
                  <p class="pt-24 text-5xl font-semibold text-black">
                    SCORE: {count()}
                  </p>
                  <p class="pt-4 text-lg">alive: {alive()}</p>
                </div>
                <div class="flex flex-col">
                  <p class="p-2 m-4 bg-zinc-800 text-center rounded-xl">
                    <span class="bg-clip-text text-transparent font-medium bg-gradient-to-r from-lime-400 to-cyan-500">
                      created by <b>NONDEV</b>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="flex justify-evenly font-semibold text-white w-full">
              <a href="https://github.com/santhitak/mosQlick" target="_blank">
                Github
              </a>
              <a href="https://youtu.be/mKRZIHwTr-I" target="_blank">
                Learn more
              </a>
              <a href="https://youtu.be/iik25wqIuFo" target="_blank">
                Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

onMount(() => {
  mosSound().loop = true;
  return mosSound().play();
});

function slapMos() {
  slapSound().play();
}

let i = 0;

function Mosquito() {
  const [posX, setPosX] = createSignal(Math.floor(Math.random() * 1280) - 32);
  const [posY, setPosY] = createSignal(Math.floor(Math.random() * 800) + 32);
  const [dead, setDead] = createSignal(false);

  const living = setInterval(() => {
    setPosX(Math.floor(Math.random() * 1280) - 32);
    setPosY(Math.floor(Math.random() * 800) + 32);
  }, Math.floor(500 + Math.random() * 500) - count() * 10);

  const kill = () => {
    if (!dead()) {
      i += 1;
      clearInterval(living);
      ref.src = "/dead_mosquito.png";
      ref.classList.remove("cursor-grab");
      setCount(count() + 1);
      setAlive(alive() - 1);
      setDead(true);
      slapMos();
      if (i > 2 && i < 5) {
        for (var j = 0; j < i; j++) {
          setArr([...arr, 1]);
          setAlive(alive() + j);
        }
        console.log(arr.length);
      } else {
        setArr([...arr, 1]);
        setAlive(alive() + 1);
      }

      if (arr.length > 20) {
        setCount(count() + 1);
        setAlive(alive() - 1);
      } else if (count() > 5) {
        alert("You have ENRAGE the mosquito");
        setArr([...arr, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
        setAlive(alive() + arr.length);
      }
    }
  };

  let ref;

  return (
    <img
      ref={ref}
      src="/mosquito.png"
      className="absolute w-8 h-8 transition-all select-none cursor-grab"
      onClick={kill}
      style={{
        top: `${posY()}px`,
        left: `${posX()}px`,
      }}
    />
  );
}

export default App;
