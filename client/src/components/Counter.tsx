import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(3);
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
      <h1
        className={`grid  bg-black bg-opacity-90 place-content-center h-screen w-screen top-0 absolute text-9xl text-white ${
          count < 0 ? "hidden" : null
        }`}
      >
        {count}
      </h1>
    )
  );
};

export default Counter;
