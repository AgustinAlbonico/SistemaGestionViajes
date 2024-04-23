import { FC } from "react";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Routing from "./components/Routing.tsx";
import { SpinnerCircularFixed } from "spinners-react";

const App: FC = () => {
  return (
    <>
      <Suspense
        fallback={
          <main className="w-full h-screen flex justify-center items-center">
            <SpinnerCircularFixed color="#332B47" />
          </main>
        }
      >
        <main className="h-screen w-full flex justify-center items-center">
          <Routing />
        </main>
        <ToastContainer />
      </Suspense>
    </>
  );
};
export default App;
