import clsx from "clsx";
import { FunctionComponent, useState } from "react";

const Toggle: FunctionComponent<{
  className?: string;
  label?: string;
  toggled?: boolean;
  onToggle: (toggled: boolean) => void;
}> = ({ className, label, toggled, onToggle }) => {
  const [stateIsToggled, setStateIsToggled] = useState(toggled);
  let isToggled = toggled ?? stateIsToggled;

  return (
    <div className={clsx("flex flex-row-reverse gap-x-2", className)}>
      <button
        type="button"
        className={clsx(
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          {
            "bg-green-600": isToggled,
            "bg-green-200": !isToggled,
          }
        )}
        role="switch"
        aria-checked="false"
        onClick={() => {
          const newToggled = !isToggled;
          onToggle(newToggled);
          setStateIsToggled(newToggled);
        }}
      >
        <span
          aria-hidden="true"
          className={clsx(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
            {
              "translate-x-5": isToggled,
              "translate-x-0": !isToggled,
            }
          )}
        ></span>
      </button>
      <b>{label}</b>
    </div>
  );
};

export default Toggle;
