import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from "./Popup";
import { useDispatch } from "react-redux";
import { changeSearchValue } from "./app/slice";
import { debounce } from "lodash";

const input = document.getElementById("test");

function App() {
  // const [referenceElement, setReferenceElement] =
  //   useState<HTMLInputElement | null>(null);
  const [popperElement, setPopperElement] =
    useState<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes, update } = usePopper(input, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const show = () => {
    console.log("show", popperElement);
    if (!popperElement) return;

    popperElement.setAttribute("data-show", "");

    update?.();
  };

  const hide = () => {
    if (!popperElement) return;
    popperElement.removeAttribute("data-show");

    update?.();
  };
  const change = (e: any) => {
    console.log(e.target.value);

    dispatch(changeSearchValue(e.target.value));
  };
  useEffect(() => {
    if (!input) return;
    input?.addEventListener("focus", show);
    input?.addEventListener("blur", hide);
    input?.addEventListener("input", change);
  }, [change, hide, show]);

  return (
    <>
      <div
        ref={setPopperElement}
        style={styles.popper}
        className="tooltip-popover"
        {...attributes.popper}
      >
        <Popup hide={hide} />
        <div id="arrow" ref={setArrowElement} style={styles.arrow} />
      </div>
    </>
  );
}

export default App;
