const MySteryBackground = () => {
  return (
    <div className="z-[-1] pointer-events-none fixed top-0 left-0 w-screen h-screen bg-white dark:bg-black overflow-hidden transition-all">
      <div className="z-[-1] absolute -bottom-10 left-0 w-[300px] h-screen bg-green-400/20 dark:bg-[#2514447e] blur-[100px] rounded-md -rotate-[30deg] transition-all"></div>
      <div className="z-[-1] absolute top-[-160px] right-[250px] w-[300px] h-[800px] rounded-full bg-yellow-400/10 dark:bg-[#131c477a] blur-[100px] -rotate-[30deg] transition-all"></div>
      <div className="z-[-1] absolute top-[290px] right-0 w-[300px] h-[800px] rounded-full bg-cyan-300/10 dark:bg-[#0e3c4f76] blur-[100px] -rotate-[30deg] transition-all"></div>
    </div>
  );
};

export default MySteryBackground;
