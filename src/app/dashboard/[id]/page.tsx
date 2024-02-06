import SimpleBoxCard from "@/components/SimpleBoxCard";
import { useLoading } from "../../../context/loadingContext";
import GetWalletData from "@/components/GetWalletData";

const Dashboard = ({ params }) => {
  // const { userData, setUserData } = useLoading();
  // const id = params.json();

  // const balanceDBB =  ./actions/getBalance.ts

  return (
    <div className="flex flex-row justify-center items-center mt-10">
      <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-4 min-h-screen">
        <SimpleBoxCard
          title="Pico Lvl 1"
          production="15"
          storage="900"
          fullSotorage="2000"
          state="90"
          fullDurability="125"
        />

        <SimpleBoxCard
          title="Pico Lvl 1"
          production="17"
          storage="30"
          fullSotorage="2000"
          state="120"
          fullDurability="125"
        />
        <SimpleBoxCard
          title="Pico Lvl 2"
          production="27"
          storage="270"
          fullSotorage="3000"
          state="125"
          fullDurability="200"
        />
        <SimpleBoxCard
          title="Pico Lvl 3"
          production="100"
          storage="200"
          fullSotorage="1000"
          state="25"
          fullDurability="30"
        />
        <GetWalletData />
      </div>
    </div>
  );
};

export default Dashboard;
