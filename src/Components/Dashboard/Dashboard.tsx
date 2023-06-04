import ChartComponent from "../Chart/ChartComponent";
import Map from "../Map/Map";

function Dashboard() {
  return (
    <div className="w-full overflow-auto mb-20">
      <Map />
      <div>
        <ChartComponent />
      </div>
    </div>
  );
}

export default Dashboard;
