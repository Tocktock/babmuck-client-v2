import { useEffect, useRef, useState } from "react";

interface Props {
  productId: number;
  productName: string;
  checkBoxHandler;
  productPrice: number;
}

const FormType: React.FC<Props> = ({
  productId,
  productName,
  productPrice,
  checkBoxHandler,
}) => {
  const [counter, setCounter] = useState(0);

  const increseCounter = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
  };

  const decreseCounter = (e) => {
    e.preventDefault();
    if (counter > 0) setCounter(counter - 1);
  };
  useEffect(() => {
    checkBoxHandler(productId, productPrice, counter);
  }, [counter]);

  return (
    <div className="w-1/2 flex justify-between items-center mt-4">
      <div>
        <span className="ml-2 font-bold">
          {productName} : {productPrice}
        </span>
      </div>
      <div>
        <button onClick={decreseCounter} className="bg-gray-200 w-5 my-1 mx-2">
          -
        </button>
        <span>{counter} </span>
        <button onClick={increseCounter} className="bg-gray-200 w-5 my-1 mx-2">
          +
        </button>
      </div>
    </div>
  );
};

export default FormType;
