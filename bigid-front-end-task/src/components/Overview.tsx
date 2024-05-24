import { useContext, useMemo } from "react";
import Chart from "react-google-charts";
import { userContext } from "../context/userContext";
import { countries } from "../Data/countries";

export const Overview = () => {
  const userData = useContext(userContext);

  const result = useMemo(() => {
    return (
      userData?.user.map((item) => {
        return {
          country:
            countries.find((c) => c.code === item.country)?.name ??
            item.country,
          user: item.user,
        };
      }) ?? []
    );
  }, [userData?.user]);

  const chartData = [
    ["Country", "Popularity"],
    ["Germany", 200],
    ["United States", 300],
    ["India", 500],
    ...result.map(({ country, user }) => [country, parseInt(user)]),
  ];

  return (
    <Chart
      chartType="GeoChart"
      width="100%"
      height="100%"
      data={chartData}
      options={{
        colors: ["#DA3213", "#12D266"],
      }}
    />
  );
};
