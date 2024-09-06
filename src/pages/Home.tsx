import { useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";

function Home() {
  // const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    supabase.from("");
  }, []);

  return (
    <div className="max-w-xl mx-auto h-full flex flex-col justify-start items-center">
      <div>
        <h1 className="text-2xl p-5 text-center flex flex-col gap-2 font-bold">
          <span>The Lost Mooncake Recipe</span>
          <span className="chinese text-3xl">遗失的月饼食谱 🥮</span>
        </h1>
        <div className="flex justify-center items-stretch h-[190px]">
          <Link to={"/" + "UltraRaptor"}>
            <Button variant={"ghost"} className="p-0 h-full">
              <div
                className="bg-[#dc3c3c] trapShadow w-[104px] h-[75px] mt-auto flex flex-col justify-center items-center relative"
                id="second"
              >
                <img
                  src="https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
                  className="aspect-square w-14 absolute -top-[calc(3.5rem+10px)] border-4 border-[#adc3d1] rounded-full"
                />
                <p className="font-medium text-sm name text-black">Name</p>
                <p className="font-bold text-[#adc3d1] points text-sm">
                  1hr 10min
                </p>
              </div>
            </Button>
          </Link>
          <Link to={"/" + "UltraRaptor"}>
            <Button variant={"ghost"} className="p-0 h-full">
              <div
                className="bg-[#fa5353] trapShadow w-[104px] mt-auto  flex flex-col justify-center items-center relative h-[100px]"
                id="first"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1586/1586967.png"
                  className="w-1/3 aspect-square absolute -top-[calc(3.5rem+30px)]"
                />
                <img
                  src="https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
                  className="aspect-square w-14 absolute -top-[calc(3.5rem+10px)] border-4 border-[#fcd012] rounded-full"
                />
                <p className="font-medium text-sm name text-black">Name</p>
                <p className="font-bold text-[#fcd012] points text-sm">
                  1hr 10min
                </p>
              </div>
            </Button>
          </Link>
          <Link to={"/" + "UltraRaptor"}>
            <Button variant={"ghost"} className="p-0 h-full">
              <div
                className="bg-[#dc3c3c] trapShadow w-[104px] h-[55px] mt-auto flex flex-col justify-center items-center relative"
                id="third"
              >
                <img
                  src="https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
                  className="aspect-square w-14 absolute -top-[calc(3.5rem+10px)] border-4 border-[#fbac74] rounded-full"
                />
                <p className="font-medium text-sm name text-black">Name</p>
                <p className="font-bold text-[#fbac74] points text-sm">
                  1hr 10min
                </p>
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-[#dee2e6] dark:bg-[#23282d] h-[calc(100svh-116px-190px)] w-full rounded-3xl overflow-y-auto p-4 flex-col flex gap-2">
        {[...new Array(10)].map((_, idx) => {
          return (
            <Link to={"/" + "UltraRaptor"}>
              <Button className="w-full h-full py-2 px-0" variant={"ghost"}>
                <div className="flex gap-3 items-center w-full">
                  <span className="font-bold text-[#7c7c7c] dark:text-[#cacaca] w-7">
                    {idx + 4}
                  </span>
                  <img
                    src="https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
                    className="aspect-square w-12 rounded-full"
                  />
                  <span className="max-w-32 w-min text-left break-words whitespace-normal">
                    Namasdadadasdqaasde
                  </span>
                  <span className="ml-auto text-base">1hr 10min</span>
                </div>
              </Button>
            </Link>
          );
        })}
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-bold text-center pb-2">❤️ Selfies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl overflow-hidden border-2 border-black dark:border-white relative">
            <div className="bg-[#FFB300] absolute top-3 right-2 py-1 px-4 text-sm rounded text-black font-semibold border border-black">
              helo
            </div>
            <img src="./Mooncake.png" />
          </div>
          <div className="rounded-xl overflow-hidden border-2 border-black dark:border-white relative">
            <div className="bg-[#FFB300] absolute top-3 right-2 py-1 px-4 text-sm rounded text-black font-semibold border border-black">
              helo
            </div>
            <img src="./Mooncake.png" />
          </div>
          <div className="rounded-xl overflow-hidden border-2 border-black dark:border-white relative">
            <div className="bg-[#FFB300] absolute top-3 right-2 py-1 px-4 text-sm rounded text-black font-semibold border border-black">
              helo
            </div>
            <img src="./Mooncake.png" />
          </div>
          <div className="rounded-xl overflow-hidden border-2 border-black dark:border-white relative">
            <div className="bg-[#FFB300] absolute top-3 right-2 py-1 px-4 text-sm rounded text-black font-semibold border border-black">
              helo
            </div>
            <img src="./Mooncake.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
