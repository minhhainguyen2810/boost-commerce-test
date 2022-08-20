import { useCallback, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from "./Popup";
import { useDispatch } from "react-redux";
import { changeSearchValue } from "./app/slice";
import { debounce } from "lodash";

const input = document.getElementById("boost-search");

const config = (window as any).boostCommerce;
const charactersLengthToSearch = config.charactersLengthToSearch || 0;

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

  const show = useCallback(() => {
    if (!popperElement) return;

    popperElement.setAttribute("data-show", "");

    update?.();
  }, [popperElement, update]);

  const hide = useCallback(() => {
    if (!popperElement) return;
    popperElement.removeAttribute("data-show");

    update?.();
  }, [popperElement, update]);

  const change = debounce(
    (e: any) => {
      if (e.target.value.length >= charactersLengthToSearch) {
        show();
        dispatch(changeSearchValue(e.target.value));
      } else {
        hide();
      }
    },
    200,
    { trailing: true }
  );
  useEffect(() => {
    if (!input) return;
    // input?.addEventListener("focus", show);
    input?.addEventListener("blur", hide);
    input?.addEventListener("input", change);

    return function cleanup() {
      // input?.removeEventListener("focus", show);
      input?.removeEventListener("blur", hide);
      input?.removeEventListener("input", change);
    };
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
