import { ClockLoader } from "react-spinners";
import "./LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <>
      <div className="spinner">
        <ClockLoader
          color="var(--primary-color)"
          size={60}
          speedMultiplier={1}
        />
      </div>
    </>
  );
}
