"use client";
import { useEffect, useState } from "react";
import ERC20ABI from "@/../abis/ERC20.json";
import SEEDSALEABI from "@/../abis/SEEDSALE.json";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import ConnectButton from "@/components/ConnectButton";

const SEEDSALE = process.env.NEXT_PUBLIC_SEEDCONTRACT_BSCTEST_ADDRESS as string;
const TOKEN_BSCTEST_ADDRESS = process.env
  .NEXT_PUBLIC_TOKEN_BSCTEST_ADDRESS as string;

/* TODO:
 - Status : noInitial/initiated/secondPhase
 - dinamics values: usd:point / you recive / yourPoints / Your Investment / totalVolume / TotalPoints 
*/

const ModalSwap = () => {
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider }: any = useWeb3ModalProvider();
  const [youPay, setYouPay] = useState("");
  const [ERC20Contract, setERC20Contract] = useState<ethers.Contract | null>(
    null
  );
  const [SEEDSALEContract, setSEEDSALEContract] =
    useState<ethers.Contract | null>(null);
  const [pointsToRecive, setPointsToRecive] = useState("");
  const [approveStatus, setApproveStatus] = useState("");
  const [price, setPrice] = useState("");
  const [yourPoints, setYourPoints] = useState("");
  const [yourInvestment, setYourInvestment] = useState("");
  const [totalVolume, setTotalVolume] = useState("");
  const [totalPoints, setTotalPoints] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (isConnected && (ERC20Contract == null || SEEDSALEContract == null)) {
      buildContracts();
    }
    if (SEEDSALEContract != null) {
      getSeedContractState();
    }
  }, [isConnected, SEEDSALEContract]);

  const buildContracts = async () => {
    if (!isConnected) throw Error("User disconnected");
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = await ethersProvider.getSigner();

    const ERC20 = new ethers.Contract(
      TOKEN_BSCTEST_ADDRESS,
      ERC20ABI.result,
      signer
    );
    await setERC20Contract(ERC20);

    const SEEDSALEc = new ethers.Contract(
      SEEDSALE.toString(),
      SEEDSALEABI.result,
      signer
    );
    await setSEEDSALEContract(SEEDSALEc);
  };

  //todo: tell to solidity dev wrap all calls in ony one
  const getSeedContractState = async () => {
    //[status, setStatus]
    const satus = await SEEDSALEContract?.seedStatus();
    setStatus(satus);

    //[price, setPrice]
    const priceInWei = await SEEDSALEContract?.getPrice();
    const priceInEther = ethers.utils.formatEther(priceInWei);
    setPrice(priceInEther);

    //[yourPoints, setYourPoints]
    const userData = await SEEDSALEContract?.points(address);
    setYourPoints(userData.points.toString());

    //[yourInvestment, setYourInvestment]
    setYourInvestment(ethers.utils.formatEther(userData.amount.toString()));

    //[totalVolume, setTotalVolume]
    const volumen = await SEEDSALEContract?.totalVolumen();
    setTotalVolume(ethers.utils.formatEther(volumen.toString()));

    //[totalPoints, setTotalPoints]
    const tPoints = await SEEDSALEContract?.totalPoints();
    setTotalPoints(tPoints.toString());
  };

  const handleInputChange = (event: any) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    setYouPay(inputValue);
  };

  const handleSubmit = async () => {
    if (!isConnected) throw Error("User disconnected");
    if (ERC20Contract == null || SEEDSALEContract == null) {
      await buildContracts();
    }
    const youPayInWei = ethers.utils.parseEther(youPay.toString());
    const approve = await ERC20Contract?.approve(
      SEEDSALE.toString(),
      youPayInWei.toString(),
      {
        gasLimit: ethers.utils.hexlify(300000), // ajusta este valor según tus necesidades
      }
    );
    setApproveStatus("Approving");
    console.log("Approving");
    const rsApprove = await approve.wait();

    if (rsApprove != null) {
      setApproveStatus("Approved");
      console.log(approveStatus);
      const buyPoints = await SEEDSALEContract?.buyPoints(
        youPayInWei.toString(),
        {
          gasLimit: ethers.utils.hexlify(300000), // ajusta este valor según tus necesidades
        }
      );
      const rsBuyPoints = await buyPoints.wait();
      if (rsBuyPoints != null) {
        alert("Points buyed");
      }
    }
  };

  return (
    <>
      <div className="  text-white px-2  rounded-xl border border-yellow-500 bg-white bg-opacity-15">
        <div className="flex flex-row justify-between mt-1">
          <div className="flex">
            <span className=" text-white">
              1 Point: {price != "" ? price : 0}
            </span>
          </div>
          <div className="flex">
            <span className=" text-white">
              1 usd: {price != "" ? 1 / price : 0} points
            </span>
          </div>
        </div>
        <form className=" max-w-md">
          <div className="flex flex-col bg-black rounded-lg p-4 mb-2">
            <div className="flex flex-row justify-between ">
              <div className="flex">
                <span className=" text-gray-300">You pay</span>
              </div>
              <div className="flex">
                <span className=" text-gray-300">Balance</span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <input
                type="number"
                name="name"
                autoFocus
                placeholder="0"
                value={youPay}
                onChange={handleInputChange}
                className="w-full  text-4xl bg-black rounded-md focus:outline-none focus:none mb-2"
              />
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-bold text-gray-700  border border-white-200  bg-opacity-50">
                USDT
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-black rounded-lg p-4">
            <div className="flex flex-row justify-between ">
              <div className="flex">
                <span className=" text-gray-300">You recive</span>
              </div>
              <div className="flex">
                <span className=" text-gray-300">
                  Your points: {yourPoints}
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <input
                type="number"
                name="name"
                autoFocus
                placeholder="0"
                readOnly
                value={(
                  parseInt(youPay) * parseInt((1 / price).toFixed(1))
                ).toFixed(1)}
                className="text-4xl bg-black rounded-md focus:outline-none focus:none mb-2 max-w-52"
              />
              <div className="text-gray-300">
                Your Investment: {yourInvestment}{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-row items-end justify-center w-full my-2 ">
            {isConnected ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded p-4 text-2xl text-white border bg-yellow-400 w-full border-black border-opacity-10 hover:border-opacity-20 hover:shadow-md transition duration-300"
              >
                Buy Points
              </button>
            ) : (
              <span className="rounded p-4 flex justify-center border bg-gray-400 w-full bg-opacity-20 border-black border-opacity-10 hover:border-opacity-20 hover:shadow-md transition duration-300">
                <ConnectButton
                  isConnected={isConnected}
                  address={address}
                  chainId={chainId}
                />
              </span>
            )}
          </div>
          <div className="flex flex-row justify-between mt-1">
            <div className="flex">
              <span className=" text-white">
                Total Volumen: {totalVolume} usd
              </span>
            </div>
            <div className="flex">
              <span className=" text-white">
                Total Points: {totalPoints} points
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalSwap;
