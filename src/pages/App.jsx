import { Outlet } from "react-router-dom";
import { Layout } from "../components";

export const App = () => {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};
