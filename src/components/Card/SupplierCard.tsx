interface Props {
  supplierId: number;
  supplierName: string;
  location: string;
}

const SupplierCard: React.FC<Props> = ({
  supplierId,
  supplierName,
  location,
}) => {
  return (
    <div className="w-2/5 py-6 px-6 mx-auto bg-gray-200 flex justify-center items-center">
      <div className="max-w-2xl bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg">
        <div id="header" className="flex">
          <img
            alt="mountain"
            className="w-45 rounded-md border-2 border-gray-300"
            src="https://picsum.photos/seed/picsum/200"
          />
          <div id="body" className="flex flex-col ml-5">
            <h2 id="name" className="text-xl font-semibold mb-2">
              {supplierName}
            </h2>
            <p className="text-gray-800 mt-2">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;
