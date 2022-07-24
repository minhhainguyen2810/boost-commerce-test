import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./app/hooks";
import { changeSearchValue, getApi } from "./app/slice";
import { RootState } from "./app/store";

export interface PopupProps {
  hide: (e?: any) => void;
}

const config = (window as any).boostCommerce;

const Popup: React.FC<PopupProps> = ({ hide }) => {
  const dispatch = useAppDispatch();
  const searchValue = useSelector((state: RootState) => state.app.searchValue);
  const data = useSelector((state: RootState) => state.app.data);
  const filteredData = data
    ?.filter((item) => item.title?.includes(searchValue))
    .slice(0, 5);
  useEffect(() => {
    dispatch(getApi());
  }, [dispatch, searchValue]);

  const handleClick = (title: string) => () => {
    const input = document.getElementById("boost-search");

    input && ((input as any).value = title);
    dispatch(changeSearchValue(title));
    hide();
  };

  return (
    <div className="d-flex flex-column">
      {/* Suggestion block */}
      {config.hiddenBlocks?.includes?.("Suggestion") ? null : (
        <>
          <div className="background-yellow p-1">
            <span className="text-gray">SUGGESTIONS</span>
          </div>
          {isEmpty(filteredData) && <div className="p-1">No Suggestion</div>}
          {filteredData?.map((i, index) => {
            const array = i.title.split(searchValue);
            if (!searchValue)
              return (
                <div className="ellipsis p-1" key={index}>
                  {i.title}
                </div>
              );
            return (
              <div
                key={index}
                className="ellipsis p-1"
                onMouseDown={handleClick(i.title)}
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
        </>
      )}

      {/* Collections Block */}
      {config.hiddenBlocks.includes?.("Collection") ? null : (
        <>
          <div className="background-yellow p-1">
            <span className="text-gray">COLLECTIONS</span>
          </div>
          {isEmpty(filteredData) && (
            <div className="p-1">No Collections found</div>
          )}
          <div
            className="ellipsis p-1"
            onMouseDown={handleClick(filteredData?.[0]?.title)}
          >
            {filteredData?.[0]?.title}
          </div>
        </>
      )}

      {/* Products Block */}
      {config.hiddenBlocks.includes?.("Product") ? null : (
        <>
          <div className="background-yellow p-1">
            <span className="text-gray">COLLECTIONS</span>
          </div>
          {isEmpty(filteredData) && (
            <div className="p-1">No Collections found</div>
          )}
          <div className="d-flex flex-column">
            {filteredData?.splice(0, 3)?.map((i, index) => (
              <div
                className="d-flex p-1"
                key={index}
                onMouseDown={handleClick(i?.title)}
              >
                <img
                  width={150}
                  height={200}
                  src={`https://picsum.photos/id/${i?.id || 1}/200/300`}
                  alt=""
                />
                <div className="d-flex flex-column p-1">
                  <div>{i?.title.substr(0, 10)}</div>
                  <div className="fw-400">{i?.title.substr(0, 10)}</div>
                  <div>
                    <strong>$150</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <hr className="m-0" />
      <div className="d-flex justify-content-center">
        <a href="/viewAll">View All Products</a>
      </div>
    </div>
  );
};

export default Popup;
