import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Counter = () => {
  const nrOfSecondsCount = 1;
  const [count, setCount] = useState(nrOfSecondsCount);
  const router = useRouter();
  const oneSecond = 1000;

  useEffect(() => {
    !count ? router.push("./game-start", { scroll: false }) : null;
    const interval = setInterval(() => {
      count && setCount(count - 1);
    }, oneSecond);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return (
    !!count && (
      <div
        className={`grid  bg-black bg-opacity-90 place-content-center h-screen w-screen top-0 absolute text-9xl text-white ${
          count < 0 ? "hidden" : null
        }`}
      >
        <h1 className="animate-ping">{count}</h1>
      </div>
    )
  );
};

export default Counter;
