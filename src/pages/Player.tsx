import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Player() {
  const { username } = useParams();
  const [userExist, setUserExist] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  let options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

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
      if (data.length < 1) {
        setUserExist(false);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    async function getProgress() {
      const { data, error } = await supabase
        .from("bwm_progress")
        .select("*,bwm_stage(*)")
        .eq("username", username)
        .order("time_started", { ascending: false })
        .order("time_completed", { ascending: false });
      if (error) {
        console.log(error);
        return error;
      }
      let startTimeFilter = data.filter((e) => {
        return e.stage == 3;
      });
      if (startTimeFilter.length && startTimeFilter[0].time_started) {
        console.log(startTimeFilter[0].time_started);
        setStartTime(new Date(startTimeFilter[0].time_started));
      } else {
        setUserExist(false);
      }
      console.log(data);
      let endTimeFilter = data.filter((e) => {
        return e.stage == 11;
      });
      if (endTimeFilter.length && endTimeFilter[0].time_completed) {
        console.log(endTimeFilter[0].time_completed);
        setEndTime(new Date(endTimeFilter[0].time_completed));
        // .toLocaleString("en-GB", options)
        //       .replace(",", "")
        //       .replace(",", " -")
      } else {
        setUserExist(false);
      }
      // if (data.length < 1) {
      //   setUserExist(false);
      // }
    }

    getProgress();
  }, [userExist]);

  useEffect(() => {
    if (startTime && endTime && startTime > endTime) {
      setUserExist(false);
    }
  }, [startTime, endTime]);

  return (
    <div
      className={cn(
        "max-w-4xl p-5 mx-auto h-full flex flex-col items-center gap-7",
        userExist ? "justify-start" : "justify-center"
      )}
    >
      {userExist ? (
        <>
          <div>
            <img
              src="./Mooncake.png"
              className="max-h-[175px] object-cover w-full mx-auto"
            />
            <h1 className="md:text-4xl text-3xl font-extrabold text-center pt-6">
              🥳 Congratulations!<br/><span className="chinese">恭喜您！</span>
            </h1>
          </div>
          <p className="text-lg text-center flex flex-col items-center px-4">
            <span>You have restored the lost mooncake recipe!</span>
            <span className="chinese text-xl">您恢复了遗失的月饼食谱！</span>
          </p>
          <div className="text-3xl py-2 font-bold">{username}</div>
          <div className="flex flex-col flexContainer">
            <div className="flex flex-col text-center gap-2">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>GAME START</span>&nbsp;
                <span className="chinese text-lg">游戏开始</span>
              </div>
              <div className="text-xl font-semibold">
                {startTime &&
                  startTime
                    .toLocaleString("en-GB", options)
                    .replace(",", "")
                    .replace(",", " -")}
              </div>
            </div>
            <div className="flex flex-col text-center gap-2">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>GAME END</span>&nbsp;
                <span className="chinese text-lg">游戏结束</span>
              </div>
              <div className="text-xl font-semibold">
                {endTime &&
                  endTime
                    .toLocaleString("en-GB", options)
                    .replace(",", "")
                    .replace(",", " -")}
              </div>
            </div>
            <div className="flex flex-col text-center gap-5">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>QUESTION TIMINGS</span>&nbsp;
                <span className="chinese text-lg">谜题时间</span>
              </div>
              <div className="text-xl font-semibold flex flex-col gap-0.5">
                <div className="flex gap-4 items-center justify-center">
                  <span>Stage 1</span> <span className="chinese">谜题 1</span>
                </div>
                <p>
                  ⌛Time Taken <span className="chinese">花费时间</span>: 2:53
                </p>
                <div className="separator flex items-center justify-center text-lg">
                  <div className="flex flex-col">
                    <div>
                      Incorrect <span className="chinese">错误</span>:
                    </div>
                    <span>0</span>
                  </div>
                  <div className="flex flex-col">
                    <div>
                      Hint <span className="chinese">暗示</span>:
                    </div>
                    <span>0</span>
                  </div>
                  <div className="flex flex-col">
                    <div>
                      Skip <span className="chinese">跳过</span>:
                    </div>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-center gap-2">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>PENALTIES</span>&nbsp;
                <span className="chinese text-lg">惩罚</span>
              </div>
              <div className="text-xl font-semibold flex flex-col gap-2">
                <span>❌ Incorrect (5 min): 4</span>
                <span>🤔 Hints (10 min): 0</span>
                <span>⏭️ Skips (20min): 0</span>
              </div>
            </div>
            <div className="flex flex-col text-center gap-2">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>TOTAL PENALTIES (ADDED TO TIME)</span>
                <br />
                <span className="chinese text-lg">总罚时间（加到时间）</span>
              </div>
              <div className="text-xl font-semibold">Mon 19 Feb - 10:08AM</div>
            </div>
            <div className="flex flex-col text-center gap-2">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>BREAKS (NOT INCLUDED)</span>
                <br />
                <span className="chinese text-lg">休息时间（不包括）</span>
              </div>
              <div className="text-xl font-semibold">Mon 19 Feb - 10:08AM</div>
            </div>
            <div className="flex flex-col text-center gap-2">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>BONUSES</span>&nbsp;
                <span className="chinese  text-lg">奖励</span>
              </div>
              <div className="text-xl font-semibold">Mon 19 Feb - 10:08AM</div>
            </div>
            <div className="flex flex-col text-center gap-2">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>FINAL TIMING</span>&nbsp;
                <span className="chinese  text-lg">总时间</span>
              </div>
              <div className="text-xl font-semibold">Mon 19 Feb - 10:08AM</div>
            </div>
            <div className="pt-5 pb-10 flex flex-col gap-5">
              <div className="text-xl font-semibold text-center">
                <span className="dark:text-[#FFB300] text-[#FFA000]  text-2xl font-bold">
                  See Leaderboard <span className="chinese">查看排行榜</span>
                </span>
                <br />
                <div className="flex flex-col">
                  <span className="px-6">
                    See how you rank against other players!
                  </span>
                  <span className="chinese text-2xl">
                    看看您与其他玩家的排名！
                  </span>
                </div>
              </div>
              <Link to={"/"} className="mx-auto">
                <Button className="text-lg font-bold py-5 px-6">
                  🏆 Leaderboard&nbsp;<span className="chinese">排行榜</span>
                </Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center">
            User Not Found
            <br />
            <span className="chinese">未找到用户</span>
          </h1>
          <Link to={"/"} className="mx-auto">
            <Button className="text-lg font-bold py-5 px-6">
              Return&nbsp;<span className="chinese">返回</span>
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Player;
