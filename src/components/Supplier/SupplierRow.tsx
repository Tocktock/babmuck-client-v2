interface Props {
  supplierId: number;
  supplierName: string;
  location: string;
}

const SupplierRow: React.FC<Props> = (props) => {
  const getStoreDetailReq = () => {};

  return (
    <button
      onClick={getStoreDetailReq}
      className="flex flex-col w-1/2 h-32 border border-gray-900 text-center align-middle items-center justify-center"
    >
      <div>{props.supplierName}</div>
      <div>{props.location}</div>
    </button>
  );
};

export default SupplierRow;
