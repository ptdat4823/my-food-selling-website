const MySteryBackground = () => {
  return (
    <div className="z-[-1] pointer-events-none absolute top-0 bottom-0 left-0 right-0 bg-white dark:bg-black">
      <div className="z-[-1] absolute -bottom-10 left-0 w-[300px] h-screen bg-pink-400/10 dark:bg-[#25144492] blur-[100px] rounded-md -rotate-[30deg]"></div>
      <div className="z-[-1] absolute top-[-160px] right-[250px] w-[300px] h-[800px] rounded-full bg-green-400/10 dark:bg-[#131c4777] blur-[100px] -rotate-[30deg]"></div>
      <div className="z-[-1] absolute top-[290px] right-0 w-[300px] h-[800px] rounded-full bg-cyan-300/10 dark:bg-[#0e3c4f5d] blur-[100px] -rotate-[30deg]"></div>
    </div>
  );
};

export default MySteryBackground;
