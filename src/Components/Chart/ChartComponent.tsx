import Chart from "./Chart";
import { useQuery } from "react-query";

async function getChartData() {
  return await fetch(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all",
    {
      method: "GET",
    }
  ).then((res) => {
    return res.json();
  });
}

function ChartComponent() {
  const { status, error, data } = useQuery<any>({
    queryKey: ["chartData"],
    queryFn: getChartData,
  });

  if (status === "loading") {
    return <h1 className="text-center text-lg">Loading Charts</h1>;
  }

  if (error) {
    return <h1 className="text-center text-lg text-red-900">Error Loading</h1>;
  }

  if (data && status === "success") {
    return (
      <div className="w-full flex flex-row flex-wrap">
        <div className="flex-1 p-2 h-[20rem]">
          <h1 className=" text-lg ">
            <b>Cases</b>
          </h1>
          <Chart data={data.cases} color="234, 179, 8" />
        </div>
        <div className="flex-1 p-2 h-[20rem]">
          <h1 className=" text-lg ">
            <b>Deaths</b>
          </h1>
          <Chart data={data.deaths} color="127, 29, 29" />
        </div>
        <div className="flex-1 p-2 h-[20rem]">
          <h1 className=" text-lg ">
            <b>Recovered</b>
          </h1>
          <Chart data={data.recovered} color="20, 83, 45" />
        </div>
      </div>
    );
  }
  return null;
}

export default ChartComponent;
