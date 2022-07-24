import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { changeSearchValue, getApi } from "./app/slice";
import { RootState } from "./app/store";

export interface PopupProps {
  hide: (e?: any) => void;
}

const Popup: React.FC<PopupProps> = ({ hide }) => {
  const dispatch = useAppDispatch();
  const searchValue = useSelector((state: RootState) => state.app.searchValue);
  const data = useSelector((state: RootState) => state.app.data);
  const filteredData = data
    ?.filter((item) => item.title?.includes(searchValue))
    .slice(0, 5);
  useEffect(() => {
    dispatch(getApi());
  }, []);

  const handleClick = (title: string) => () => {
    console.log(title);
    const input = document.getElementById("test");
    // input && input.setAttribute("value", "a");
    dispatch(changeSearchValue(title));
    hide();
  };

  return (
    <div className="d-flex flex-column">
      <div className="background-yellow">
        <h5>Head 1</h5>
      </div>
      {filteredData?.map((i, index) => {
        const array = i.title.split(searchValue);
        if (!searchValue) return <div key={index}>{i.title}</div>;
        return (
          <div
            key={index}
            className="ellipsis"
            // onMouseDown={handleClick(i.title)}
          >
            {array.map((item: string, index: number) => (
              <span key={index}>
                {item}
                {index < array.length && <mark>{searchValue}</mark>}
              </span>
            ))}
          </div>
        );
      })}
      <div></div>
    </div>
  );
};

export default Popup;
