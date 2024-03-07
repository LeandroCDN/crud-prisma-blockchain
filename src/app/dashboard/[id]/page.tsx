import Tools from "@/components/pages/dashboardPanels/Tools";
import Buy from "@/components/pages/dashboardPanels/Buy";

const Dashboard = ({ params }) => {
  return (
    <div className="flex flex-col lg:flex-row bg-black bg-opacity-15 mt-1 max-h-[calc(100vh-62px)]">
      {/* Columna izquierda - 70% en pantallas grandes y el 100% en pantallas pequeñas */}
      <div className="lg:w-3/4  ">
        <Tools />
      </div>

      {/* Columna derecha - 30% en pantallas grandes y el 100% en pantallas pequeñas */}
      <div className="lg:w-1/4 mt-4 lg:mt-0 border-l-2 ">
        <Buy />
      </div>
    </div>
  );
};

export default Dashboard;
