import { useEffect, useState } from "react";
import { SUPPLIER_LIST_URL } from "../../constants";
interface Props {
  selectedCategory: string;
  pageNumReq: any; //page function
}

const PageSelector: React.FC<Props> = ({ selectedCategory, pageNumReq }) => {
  const [counter, setCounter] = useState(0);
  const prevReq = () => {
    if (counter > 0) {
      pageNumReq(
        SUPPLIER_LIST_URL +
          selectedCategory.toUpperCase() +
          `?page=${counter - 1}`
      );
      setCounter(counter - 1);
    }
  };
  const nextReq = () => {
    pageNumReq(
      SUPPLIER_LIST_URL +
        selectedCategory.toUpperCase() +
        `?page=${counter + 1}`
    );
    setCounter(counter + 1);
  };
  useEffect(() => {
    setCounter(0);
  }, [selectedCategory]);
  return (
    <div className="flex justify-center align-middle py-2">
      <button
        className="px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2  rounded"
        onClick={prevReq}
      >
        이전
      </button>
      <div className="px-4 ">
        <span className="align-middle text-lg font-bold">{counter}</span>
      </div>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        onClick={nextReq}
      >
        다음
      </button>
    </div>
  );
};
export default PageSelector;
