// import { useEffect } from "react";
// import SimpleBoxCard from "@/components/SimpleBoxCard";
// import { useLoading } from "../../../context/loadingContext";
// import GetWalletData from "@/components/GetWalletData";

import Tools from "@/components/dashboardPanels/Tools";
import Buy from "@/components/dashboardPanels/Buy";

const Dashboard = ({ params }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Columna izquierda - 70% en pantallas grandes y el 100% en pantallas pequeñas */}
      <div className="lg:w-4/5">
        <Tools />
      </div>

      {/* Columna derecha - 30% en pantallas grandes y el 100% en pantallas pequeñas */}
      <div className="lg:w-1/5 mt-4 lg:mt-0">
        <Buy />
      </div>
    </div>
  );
};

export default Dashboard;
