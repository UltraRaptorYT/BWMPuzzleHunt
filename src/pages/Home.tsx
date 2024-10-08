import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";

type ImageType = {
  id: number;
  username: string;
  image: string;
  approved: boolean;
  created_at: string;
};

function Home() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [selfies, setSelfies] = useState<ImageType[]>([]);

  useEffect(() => {
    async function getLeaderboard() {
      const { data, error } = await supabase
        .from("bwm_user")
        .select()
        .eq("completed", true)
        .order("best_time", { ascending: true });
      if (error) {
        console.log(error);
        return error;
      }
      console.log(data);
      setLeaderboard(data);
    }
    getLeaderboard();
  }, []);

  useEffect(() => {
    async function getPhotos() {
      const { data, error } = await supabase
        .from("bwm_image")
        .select()
        .eq("approved", "true");
      if (error) {
        console.log(error);
        return error;
      }
      if (data) {
        setSelfies(data);
      }
    }

    getPhotos();
  }, []);

  return (
    <div className="max-w-xl mx-auto h-full flex flex-col justify-start items-center">
      <div>
        <h1 className="text-2xl p-5 text-center flex flex-col gap-2 font-bold">
          <span>The Lost Mooncake Recipe</span>
          <span className="chinese text-3xl">遗失的月饼食谱 🥮</span>
        </h1>
        <div className="flex justify-center items-stretch h-[190px]">
          <Link to={"/" + (leaderboard[1] ? leaderboard[1].username : "")}>
            <Button variant={"ghost"} className="p-0 h-full">
              <div
                className="bg-[#dc3c3c] trapShadow w-[104px] h-[75px] mt-auto flex flex-col justify-center items-center relative"
                id="second"
              >
                {leaderboard[1] && (
                  <>
                    <img
                      src={
                        selfies.filter(
                          (e) => e.username == leaderboard[1].username
                        ).length > 0
                          ? selfies.filter(
                              (e) => e.username == leaderboard[1].username
                            )[0].image
                          : leaderboard[1].profile_pic
                      }
                      className="aspect-square w-14 absolute -top-[calc(3.5rem+10px)] border-4 border-[#adc3d1] rounded-full"
                    />
                    <p className="font-bold text-sm name text-black">
                      {leaderboard[1].username}
                    </p>
                    <p className="font-bold text-[#adc3d1] points text-sm">
                      {leaderboard[1].best_time}
                    </p>
                  </>
                )}
              </div>
            </Button>
          </Link>
          <Link to={"/" + (leaderboard[0] ? leaderboard[0].username : "")}>
            <Button variant={"ghost"} className="p-0 h-full">
              <div
                className="bg-[#fa5353] trapShadow w-[104px] mt-auto  flex flex-col justify-center items-center relative h-[100px]"
                id="first"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1586/1586967.png"
                  className="w-1/3 aspect-square absolute -top-[calc(3.5rem+30px)]"
                />
                {leaderboard[0] && (
                  <>
                    <img
                      src={
                        selfies.filter(
                          (e) => e.username == leaderboard[0].username
                        ).length > 0
                          ? selfies.filter(
                              (e) => e.username == leaderboard[0].username
                            )[0].image
                          : leaderboard[0].profile_pic
                      }
                      className="aspect-square w-14 absolute -top-[calc(3.5rem+10px)] border-4 border-[#fcd012] rounded-full"
                    />
                    <p className="font-bold text-sm name text-black">
                      {leaderboard[0].username}
                    </p>
                    <p className="font-bold text-[#fcd012] points text-sm">
                      {leaderboard[0].best_time}
                    </p>
                  </>
                )}
              </div>
            </Button>
          </Link>
          <Link to={"/" + (leaderboard[2] ? leaderboard[2].username : "")}>
            <Button variant={"ghost"} className="p-0 h-full">
              <div
                className="bg-[#dc3c3c] trapShadow w-[104px] h-[55px] mt-auto flex flex-col justify-center items-center relative"
                id="third"
              >
                {leaderboard[2] && (
                  <>
                    <img
                      src={
                        selfies.filter(
                          (e) => e.username == leaderboard[2].username
                        ).length > 0
                          ? selfies.filter(
                              (e) => e.username == leaderboard[2].username
                            )[0].image
                          : leaderboard[2].profile_pic
                      }
                      className="aspect-square w-14 absolute -top-[calc(3.5rem+10px)] border-4 border-[#fbac74] rounded-full"
                    />
                    <p className="font-bold text-sm name text-black">
                      {leaderboard[2].username}
                    </p>
                    <p className="font-bold text-[#fbac74] points text-sm">
                      {leaderboard[2].best_time}
                    </p>
                  </>
                )}
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-[#dee2e6] dark:bg-[#23282d] h-[calc(100svh-116px-190px)] w-full rounded-3xl overflow-y-auto p-4 flex-col flex gap-2">
        {leaderboard.splice(3).map((e, idx) => {
          return (
            <Link to={"/" + e.username}>
              <Button className="w-full h-full py-2 px-0" variant={"ghost"}>
                <div className="flex gap-3 items-center w-full">
                  <span className="font-bold text-[#7c7c7c] dark:text-[#cacaca] w-7">
                    {idx + 4}
                  </span>
                  <img
                    src={
                      selfies.filter((s) => s.username == e.username).length > 0
                        ? selfies.filter((e) => e.username == e.username)[0]
                            .image
                        : e.profile_pic
                    }
                    className="aspect-square w-12 rounded-full"
                  />
                  <span className="max-w-32 w-min text-left break-words whitespace-normal">
                    {e.username}
                  </span>
                  <span className="ml-auto text-base">{e.best_time}</span>
                </div>
              </Button>
            </Link>
          );
        })}
      </div>
      <div className="p-5 w-full">
        <h1 className="text-2xl font-bold text-center pb-2">
          ❤️ Selfies <span className="text-3xl chinese">自拍</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mx-auto">
          {selfies.length > 0 ? (
            selfies.map((e, idx) => {
              return (
                <div
                  key={"Selfie" + idx}
                  className="rounded-xl overflow-hidden border-2 border-black dark:border-white relative"
                >
                  <div className="bg-[#FFB300] absolute top-3 right-2 py-1 px-4 text-sm rounded text-black font-semibold border border-black">
                    {e.username}
                  </div>
                  <img src={e.image} />
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-lg sm:col-span-2">
              <h1>
                No Selfies Found! Be the FIRST to SNAP one and Start the FUN!
              </h1>
              <h1 className="chinese text-xl">
                没有找到自拍照！赶快拍一张，开启欢乐时光！
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
