const MiddleSection = () => {
  return (
    <section className="flex flex-col bg-black shador-t">
      <div className="flex flex-col xl:flex-row items-center justify-around w-full xl:items-stretch my-4 gap-4">
        <div className="flex flex-col rounded-xl justify-center items-center border border-yellow-500 border-radius mb-5 xl:mb-0 px-4 ">
          <p className="w-72 text-center text-2xl">
            Develop by a single developer
          </p>
        </div>
        <div className="flex flex-col rounded-xl justify-center items-center border border-yellow-500 border-radius mb-5 xl:mb-0 px-4 ">
          <p className="w-72 text-center text-2xl">
            All crypto games are a scam. This one is no exception!
          </p>
        </div>
        <div className="flex flex-col rounded-xl justify-center items-center border border-yellow-500 border-radius mb-5 xl:mb-0 px-4 ">
          <p className="w-72 text-center text-2xl">
            I don't know what to put here
          </p>
        </div>
      </div>

      <div> MORE THINGS HERE</div>
    </section>
  );
};

export default MiddleSection;
