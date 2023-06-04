import "./App.css";
import Contact from "./Components/Contact/Contact";
import CreateContact from "./Components/Contact/CreateContact";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./Store/Store";
import { QueryClient, QueryClientProvider } from "react-query";
import EditContact from "./Components/Contact/EditContact";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden ">
      <Router>
        <Header />
        <div className="flex w-full h-full">
          <Sidebar />
          <div className="bg-white flex flex-[1] p-2">
            <Provider store={Store}>
              <QueryClientProvider client={queryClient}>
                <Routes>
                  <Route path="/contact">
                    <Route index={true} element={<Contact />} />
                    <Route index={false} path=":id" element={<EditContact />} />
                    <Route
                      index={false}
                      path="create"
                      element={<CreateContact />}
                    />
                  </Route>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="*"
                    element={<Navigate to="/contact" replace />}
                  />
                </Routes>
              </QueryClientProvider>
            </Provider>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
