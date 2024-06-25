import { getAllMonthLabels, getColorList } from "src/utils/func";

interface LineChartDataConfigProps {
  label: string;
  data: number[];
  otherOptions?: any;
}
const LineChartConfig = (
  datasets: LineChartDataConfigProps[],
  options?: any
) => {
  const currentMonth = new Date().getMonth() + 1;
  const monthList = getAllMonthLabels(
    currentMonth - datasets[0].data.length + 1,
    currentMonth
  );

  return {
    labels: monthList,
    datasets: datasets.map((dataset) => {
      return {
        label: dataset.label,
        data: dataset.data.map((item, i) => {
          let next = dataset.data[i + 1];
          let _type;
          if (next) {
            _type = item === next ? "equal" : next > item ? "up" : "down";
          } else _type = "equal";
          const line = {
            month: monthList[i],
            value: item,
            type: _type,
          };
          return line;
        }),
        barThickness: 40,
        segment: {
          pointBorderColor: (ctx: any) => "#4169E1",
          borderColor: (ctx: any) => {
            const typeColors: any = {
              up: "#86efac",
              down: "#fca5a5",
              equal: "#d1d5db",
            };
            return typeColors[ctx.p0.raw.type];
          },
        },
        ...dataset.otherOptions,
      };
    }),
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context: any) {
              let label = context.dataset.label || "";

              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                if (options && options?.currency === "$")
                  label += new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(context.parsed.y);
                else label += context.parsed.y;
              }
              return label;
            },
          },
        },
      },
    },
  };
};

interface BarChartDataConfigProps {
  label: string;
  data: number[];
  otherOptions?: any;
}
const BarChartConfig = (
  datasets: BarChartDataConfigProps[],
  color: number = new Date().getHours()
) => {
  const colorList = getColorList();
  const current = new Date();
  const currentMonth = current.getMonth() + 1;
  const monthList = getAllMonthLabels(
    currentMonth - datasets[0].data.length + 1,
    currentMonth
  );

  return {
    labels: monthList,
    datasets: datasets.map((dataset, index) => {
      return {
        label: dataset.label,
        data: dataset.data,
        borderColor:
          colorList[(index + current.getDate() + color) % colorList.length],
        backgroundColor:
          colorList[(index + current.getDate() + color) % colorList.length],
        barThickness: 40,
        segment: {
          pointBorderColor: (ctx: any) => "#4169E1",
          borderColor: (ctx: any) => {
            const typeColors: any = {
              up: "#00FF00",
              down: "#FF0000",
              equal: "#d1d5db",
            };
            return typeColors[ctx.p0.raw.type];
          },
        },
        ...dataset.otherOptions,
      };
    }),
  };
};

interface CircleChartDataConfigProps {
  label: string;
  data: number[];
  otherOptions?: any;
}
const CircleChartConfig = (
  label: string[],
  datasets: CircleChartDataConfigProps[]
) => {
  const colorList = getColorList();
  return {
    labels: label,
    datasets: datasets.map((dataset, index) => {
      const isEmtyData = dataset.data.length === 0;
      return {
        label: isEmtyData ? "Food" : dataset.label,
        data: isEmtyData ? [1] : dataset.data,
        borderColor: isEmtyData
          ? "#d1d5db"
          : label.map((_, i) => colorList[i % colorList.length]),
        backgroundColor: isEmtyData
          ? "#d1d5db"
          : label.map((_, i) => colorList[i % colorList.length]),
        ...dataset.otherOptions,
      };
    }),
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: (ttItem: any) => `${ttItem.label}: $${ttItem.parsed}`,
          },
        },
      },
    },
  };
};

export { LineChartConfig, BarChartConfig, CircleChartConfig };
