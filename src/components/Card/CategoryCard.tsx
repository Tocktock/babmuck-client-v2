import Image from "next/image";
import { SUPPLIER_LIST_URL } from "../../constants";

interface Props {
  category: string;
  categoryLettering: string;
  categoryReq: any; // function
  setSelectedCategory: any;
}

const CategoryCard: React.FC<Props> = ({
  category,
  categoryLettering,
  categoryReq,
  setSelectedCategory,
}) => {
  const parentCategoryReq = () => {
    setSelectedCategory(category);
    categoryReq(SUPPLIER_LIST_URL + category.toUpperCase());
  };

  return (
    <button
      onClick={parentCategoryReq}
      className="backdrop md:w-1/4 mx-2 bg-white bg-opacity-10 rounded p-3 text-black border border-gray-300 shadow-lg"
    >
      <div className="w-full mb-3 pb-3 border-b border-1 border-white">
        <h3 className="text-xl font-semibold text-shadow">
          {categoryLettering}
        </h3>
      </div>
      <div>
        <Image
          width={320}
          height={170}
          src={`/imgs/category/${category}.jpg`}
          alt={category}
          className="w-full h-48 object-cover mb-2"
        />
      </div>
    </button>
  );
};

export default CategoryCard;
