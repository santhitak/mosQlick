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
                      created by <b>tam-arai-sak-yang-tee</b>
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
      <div class="">
        <div
          id="popup-modal"
          tabindex="-1"
          class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
        >
          <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="popup-modal"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div class="p-6 text-center">
                <svg
                  class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
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
  }, Math.floor(500 + Math.random() * 500));

  const kill = () => {
    if (!dead()) {
      i += 1;
      clearInterval(living);
      ref.src = "/dead_mosquito.jpeg";
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
