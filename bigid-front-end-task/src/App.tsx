import { useCallback, useMemo } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { UserResponseType } from "./Data/countries";
import useFetch from "./Hooks/useFetcher";
import { AddForm } from "./components/AddForm";
import { Overview } from "./components/Overview";
import { Sidebar } from "./components/SideBar";
import TotalUser from "./components/TotalUser";
import { userContext } from "./context/userContext";

function App() {
  const { data, isLoading, revalidate } = useFetch<UserResponseType[]>({
    url: "http://localhost:3001/users",
  });

  const uniqueData = useMemo(() => {
    return Object.values(
      (data ?? []).reduce<{ [key: string]: UserResponseType }>((acc, obj) => {
        acc[obj.country] = obj;
        return acc;
      }, {})
    );
  }, [data]);

  const totalCount = useMemo(() => {
    return uniqueData.reduce((acc, curr) => acc + parseInt(curr.user), 1000);
  }, [uniqueData]);

  const handleSuccess = useCallback(
    (value: boolean) => {
      if (value) {
        revalidate();
      }
    },
    [revalidate]
  );

  return (
    <Router>
      <userContext.Provider
        value={{ totalUserCount: totalCount, user: uniqueData }}
      >
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-grow flex flex-col">
            {isLoading ? (
              <h1 className="text-lg text-green-500">Loading....</h1>
            ) : (
              <TotalUser />
            )}
            <div className="flex-grow p-6 bg-gray-100 overflow-auto">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/overview" element={<Overview />} />
                <Route
                  path="/add-user"
                  element={<AddForm onSuccess={handleSuccess} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </userContext.Provider>
    </Router>
  );
}

export default App;
