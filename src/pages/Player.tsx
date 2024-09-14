import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProgressType = {
  id: number;
  username: string;
  stage: number;
  skip: boolean;
  time_started: string;
  time_completed: string;
  bwm_stage: { id: number; stage: string };
};

function Player() {
  const { username } = useParams();
  const [userExist, setUserExist] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [questionTiming, setQuestionTiming] = useState<ProgressType[]>([]);
  const [hintData, setHintData] = useState<any[]>([]);
  const [logData, setLogData] = useState<any[]>([]);
  const [breakData, setBreakData] = useState<ProgressType>();
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [finalTime, setFinalTime] = useState<string>("");

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
      if (data.length < 1) {
        return setUserExist(false);
      }
      let startTimeFilter = data.filter((e) => {
        return e.stage == 3;
      });
      let start, end;
      if (startTimeFilter.length && startTimeFilter[0].time_started) {
        console.log(startTimeFilter[0].time_started);
        start = new Date(startTimeFilter[0].time_started);
        setStartTime(start);
      } else {
        return setUserExist(false);
      }
      console.log(data);
      let endTimeFilter = data.filter((e) => {
        return e.stage == 11;
      });
      if (endTimeFilter.length && endTimeFilter[0].time_completed) {
        console.log(endTimeFilter[0].time_completed);
        end = new Date(endTimeFilter[0].time_completed);
        setEndTime(new Date(endTimeFilter[0].time_completed));
      } else {
        return setUserExist(false);
      }
      let dataFilter = data.filter((e) => {
        return (
          new Date(e.time_started) >= start &&
          new Date(e.time_completed) <= end &&
          e.stage < 12 &&
          e.stage != 7
        );
      });
      setBreakData(data.filter((e) => e.stage == 7)[0]);
      console.log(dataFilter);
      setQuestionTiming(dataFilter);
    }

    getProgress();
  }, [userExist]);

  useEffect(() => {
    if (!startTime || !endTime || startTime > endTime) {
      return setUserExist(false);
    } else {
      setUserExist(true);
    }
    async function getHintData() {
      if (!startTime || !endTime) {
        return setUserExist(false);
      }
      const { data, error } = await supabase
        .from("bwm_hint")
        .select()
        .eq("type", "hint")
        .eq("username", username);
      if (error) {
        console.log(error);
        return error;
      }
      let filterData = data.filter((e) => {
        return (
          new Date(e.created_at) <= endTime &&
          new Date(e.created_at) >= startTime
        );
      });
      console.log(filterData);
      setHintData(filterData);
    }

    async function getLogData() {
      if (!startTime || !endTime) {
        return setUserExist(false);
      }
      const { data, error } = await supabase
        .from("bwm_log")
        .select()
        .eq("isCorrect", false)
        .eq("username", username);
      if (error) {
        console.log(error);
        return error;
      }
      let filterData = data.filter((e) => {
        return (
          new Date(e.created_at) <= endTime &&
          new Date(e.created_at) >= startTime
        );
      });
      console.log(filterData);
      setLogData(filterData);
    }

    async function getPhotoData() {
      if (!startTime || !endTime) {
        return setUserExist(false);
      }
      const { data, error } = await supabase
        .from("bwm_image")
        .select()
        .eq("username", username);
      if (error) {
        console.log(error);
        return error;
      }
      let filterData = data.filter((e) => {
        return (
          new Date(e.created_at) <= endTime &&
          new Date(e.created_at) >= startTime
        );
      });
      if (filterData.length > 0) {
        setHasPhoto(true);
      }
    }

    getHintData();
    getLogData();
    getPhotoData();
  }, [startTime, endTime]);

  useEffect(() => {
    if (!(startTime && endTime && hintData && logData)) {
      return;
    }
    let diff = Math.abs(endTime.getTime() - startTime.getTime());

    let penalties =
      logData.length * 5 +
      hintData.length * 10 +
      questionTiming.filter((e) => e.skip).length * 20;
    let bonus = hasPhoto ? 20 : 0;
    let breakTime =
      new Date(breakData?.time_completed || 0).getTime() -
      new Date(breakData?.time_started || 0).getTime();

    let totalTime = diff - bonus * 60000 - breakTime + penalties * 60000;

    const totalHours = Math.floor(totalTime / 3600000);
    const totalMinutes = Math.floor((totalTime % 3600000) / 60000);
    const totalSeconds = Math.floor((totalTime % 60000) / 1000);
    setFinalTime(
      `${totalHours}:${String(totalMinutes).padStart(2, "0")}:${String(
        totalSeconds
      ).padStart(2, "0")}`
    );
  }, [startTime, endTime, hintData, logData, hasPhoto, breakData]);

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
              🥳 Congratulations!
              <br />
              <span className="chinese">恭喜您！</span>
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
              {questionTiming
                .sort((a, b) => a.id - b.id)
                .map((e) => {
                  let stageNum = e.bwm_stage.stage.replace("s", "");
                  let time_completed = new Date(e.time_completed);
                  let time_started = new Date(e.time_started);
                  let diff = Math.abs(
                    time_completed.getTime() - time_started.getTime()
                  );
                  const minutes = Math.floor(diff / 60000);
                  const seconds = Math.floor((diff % 60000) / 1000);
                  return (
                    <div className="text-xl font-semibold flex flex-col gap-0.5">
                      <div className="flex gap-4 items-center justify-center">
                        <span>Stage {stageNum}</span>{" "}
                        <span className="chinese">谜题 {stageNum}</span>
                      </div>
                      <p>
                        ⌛Time Taken <span className="chinese">花费时间</span>:{" "}
                        {String(minutes).padStart(2, "0") +
                          ":" +
                          String(seconds).padStart(2, "0")}
                      </p>
                      <div className="separator flex items-center justify-center text-lg">
                        <div className="flex flex-col">
                          <div>
                            Incorrect <span className="chinese">错误</span>:
                          </div>
                          <span>
                            {logData.filter((h) => h.stage == e.stage).length}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div>
                            Hint <span className="chinese">暗示</span>:
                          </div>
                          <span>
                            {hintData.filter((h) => h.stage == e.stage).length}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div>
                            Skip <span className="chinese">跳过</span>:
                          </div>
                          <span>{e.skip ? 1 : 0}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="flex flex-col text-center gap-2">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>PENALTIES</span>&nbsp;
                <span className="chinese text-lg">惩罚</span>
              </div>
              <div className="text-xl font-semibold flex flex-col gap-2">
                <span>❌ Incorrect (5 min): {logData.length}</span>
                <span>🤔 Hints (10 min): {hintData.length}</span>
                <span>
                  ⏭️ Skips (20min):{" "}
                  {questionTiming.filter((e) => e.skip).length}
                </span>
              </div>
            </div>
            <div className="flex flex-col text-center gap-2">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>TOTAL PENALTIES (ADDED TO TIME)</span>
                <br />
                <span className="chinese text-lg">总罚时间（加到时间）</span>
              </div>
              <div className="text-xl font-semibold">
                {logData.length * 5 +
                  hintData.length * 10 +
                  questionTiming.filter((e) => e.skip).length * 20}{" "}
                min
              </div>
            </div>
            <div className="flex flex-col text-center gap-2">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>BREAKS (NOT INCLUDED)</span>
                <br />
                <span className="chinese text-lg">休息时间（不包括）</span>
              </div>
              <div className="text-xl font-semibold">
                {String(
                  Math.floor(
                    Math.abs(
                      new Date(breakData?.time_completed || 0).getTime() -
                        new Date(breakData?.time_started || 0).getTime()
                    ) / 60000
                  )
                ).padStart(2, "0")}
                {":"}
                {String(
                  Math.floor(
                    (Math.abs(
                      new Date(breakData?.time_completed || 0).getTime() -
                        new Date(breakData?.time_started || 0).getTime()
                    ) %
                      60000) /
                      1000
                  )
                ).padStart(2, "0")}
              </div>
            </div>
            <div className="flex flex-col text-center gap-2">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>BONUSES</span>&nbsp;
                <span className="chinese  text-lg">奖励</span>
              </div>
              <div className="text-xl font-semibold">
                {hasPhoto ? "-20min" : "-"}
              </div>
            </div>
            <div className="flex flex-col text-center gap-2">
              <div className="text-sm dark:text-[#FFB300] text-[#FFA000] font-bold tracking-wide">
                <span>FINAL TIMING</span>&nbsp;
                <span className="chinese  text-lg">总时间</span>
              </div>
              <div className="text-xl font-semibold">{finalTime}</div>
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
