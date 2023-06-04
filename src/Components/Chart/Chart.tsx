import {
  useState,
  useRef,
  useEffect,
  ReactElement,
  ReactPropTypes,
} from "react";
import { Chart as jsChart } from "chart.js/auto";

const Chart = ({
  data,
  color,
}: {
  data: ReactPropTypes;
  color: string;
}): ReactElement => {
  let chartref = useRef<any>();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, []);

  useEffect(() => {
    let lineChart = new (jsChart as any)(chartref.current, {
      type: "line",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Cases",
            fill: true,
            backgroundColor: `rgba(${color},0.6)`,
            borderColor: `rgba(${color},1)`,
            borderWidth: 1,
            tension: 0.3,
            data: Object.values(data),
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
          y: {
            // suggestedMax: 90,
            beginAtZero: true,
            // display: false,
          },
          x: {
            // display: false,
          },
        },
      },
    });

    return () => {
      lineChart.destroy();
    };
  }, [windowWidth]);

  return (
    <>
      <canvas ref={chartref} className="chartcanv" />
    </>
  );
};

export default Chart;
