// "use client";
// import { useState } from "react";

const Description = () => {
  return (
    <div>
      <div className="max-h-[calc(100vh-150px)] overflow-y-hidden hover:overflow-y-auto  max-w-1/2 w-full bg-white bg-opacity-0 p-8 hover:scrollbar">
        <div className="">
          <div className="bg-black bg-opacity-20 rounded-lg p-4 mb-2 min-w-56">
            <div className="bg-black bg-opacity-20 rounded-lg p-4 mb-2 min-w-56">
              <h3 className="text-2xl">Presale Mode </h3>
            </div>
            <p>
              EverPooGame is an experimental game created by a YouTube
              developer, and due to the meme's momentum, he decided to release
              it publicly. Consider the following points when making your
              purchase decision:
            </p>
            <ol className="list-decimal pl-4">
              <li>
                <p>
                  You can buy points and reverse your purchase (recover your
                  investment) at any time until the last week.
                </p>
              </li>
              <li>
                <p>
                  The price of points depends on two factors: time since the
                  start and total invested.
                </p>
              </li>
              <li>
                <p>
                  Every week, the price of points will increase by 1%. If you
                  withdraw and buy later, you will have to pay that difference.
                </p>
              </li>
              <li>
                <p>
                  These points will be used to distribute the seed % (See
                  tokenomics).
                </p>
              </li>
            </ol>
          </div>
          <div className="bg-black bg-opacity-20 rounded-lg p-4 mb-2 min-w-56">
            <div className="bg-black bg-opacity-20 rounded-lg p-4 mb-2 min-w-56">
              <h3 className="text-2xl">Phases of seed sale</h3>
            </div>
            <ol className="list-decimal pl-4">
              <li>
                <p>Purchase and sale of free points.</p>
              </li>
              <li>
                <p>Last Week:</p>
                <ol className="list-decimal pl-4">
                  <li>
                    <p>
                      The start of the 'last week' will be announced on all
                      platforms, as it will be the final week where you can
                      decide to maintain or withdraw your position.
                    </p>
                  </li>
                  <li>
                    <p>
                      During this week, you can only buy, not sell, unless you
                      have made a previous purchase.
                    </p>
                  </li>
                  <li>
                    <p>
                      Throughout this week, you can see how many tokens
                      correspond to your points. This data can be manually
                      checked at all times and varies over time (your
                      points/Total points = % of participation).
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
          </div>
          <div className="bg-black bg-opacity-20 rounded-lg p-4 mb-2 min-w-56">
            <div className="bg-black bg-opacity-20 rounded-lg p-4 mb-2 min-w-56">
              <h3 className="text-2xl">Extra info</h3>
            </div>
            <ol className="list-decimal pl-4">
              <li>
                <p>
                  The contract is public, and there is a video where I explain
                  how to do it on my YouTube channel.
                </p>
              </li>
              <li>
                <p>
                  The project will continue, with or without external
                  investment, so you have to manage the refund system yourself.
                </p>
              </li>
              <li>
                <p>Points are not transferable between wallets.</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
