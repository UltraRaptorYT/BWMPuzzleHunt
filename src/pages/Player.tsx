import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";

function Player() {
  const { username } = useParams();
  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase
        .from("bwm_user")
        .select()
        .eq("username", username);
      if (error) {
        console.log(error);
        return error;
      }
      console.log(data);
    }

    getUser();
  }, []);

  return (
    <div className="max-w-4xl p-5 mx-auto h-full flex flex-col justify-start items-center gap-7">
      <h1 className="md:text-4xl text-3xl font-extrabold py-10 ">
        🥳 Congratulations!
      </h1>
      <p className="text-lg text-center">
        You have unlocked the legendary secret mooncake recipe!
      </p>
      <div className="text-3xl py-2 font-bold">{username}</div>
      <div className="flex flex-col flexContainer">
        <div className="flex flex-col text-center gap-2">
          <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
            GAME START
          </div>
          <div className="text-xl font-semibold">Mon 19 Feb - 10:08AM</div>
        </div>
        <div className="flex flex-col text-center gap-2">
          <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
            GAME END
          </div>
          <div className="text-xl font-semibold">Mon 19 Feb - 12:18PM</div>
        </div>
        <div className="flex flex-col text-center gap-5">
          <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
            QUESTION TIMINGS
          </div>
          <div className="text-xl font-semibold flex flex-col">
            <p>Clue 1</p>
            <p>⌛Time Taken: 2:53</p>
            <p>Incorrects: 0 | Stucks: 0 | Losts: 0 | Skips: 0</p>
          </div>
          <div className="text-xl font-semibold flex flex-col">
            <p>Clue 2</p>
            <p>⌛Time Taken: 2:53</p>
            <p>Incorrects: 0 | Stucks: 0 | Losts: 0 | Skips: 0</p>
          </div>
          <div className="text-xl font-semibold flex flex-col">
            <p>Clue 3</p>
            <p>⌛Time Taken: 2:53</p>
            <p>Incorrects: 0 | Stucks: 0 | Losts: 0 | Skips: 0</p>
          </div>
        </div>
        <div className="flex flex-col text-center gap-2">
          <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
            PENALTIES
          </div>
          <div className="text-xl font-semibold">Mon 19 Feb - 10:08AM</div>
        </div>
        <div className="flex flex-col text-center gap-2">
          <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
            TOTAL PENALTIES (ADDED TO TIME)
          </div>
          <div className="text-xl font-semibold">Mon 19 Feb - 10:08AM</div>
        </div>
        <div className="flex flex-col text-center gap-2">
          <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
            BREAKS (NOT INCLUDED)
          </div>
          <div className="text-xl font-semibold">Mon 19 Feb - 10:08AM</div>
        </div>
        <div className="flex flex-col text-center gap-2">
          <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
            FINAL TIMING
          </div>
          <div className="text-xl font-semibold">Mon 19 Feb - 10:08AM</div>
        </div>
        <div className="p-10">
          <div className="text-xl font-semibold text-center">
            See Leaderboard
            <br />
            See how you rank against other players!
          </div>
        </div>
        <Link to={"/"}>
          <Button>🏆 Leaderboard</Button>
        </Link>
      </div>
    </div>
  );
}

export default Player;
