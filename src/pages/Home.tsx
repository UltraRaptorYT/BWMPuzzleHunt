import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";

function Home() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    supabase.from("")
  }, []);

  return (
    <div className="max-w-4xl p-5 mx-auto h-full flex flex-col justify-start items-center">
      Home
    </div>
  );
}

export default Home;
