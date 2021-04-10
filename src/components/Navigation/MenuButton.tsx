import Link from "next/link";

interface Props {
  menuName: string;
  linkto: string;
}

const MenuButton: React.FC<Props> = (props) => {
  return (
    <Link href={props.linkto}>
      <a className="items-center bg-autumnT-400 h-8 px-4 focus:outline-none text-autumnT-500 rounded-xl hover:bg-autumnT-500 hover:text-white">
        <span className="text-center align-middle">{props.menuName}</span>
      </a>
    </Link>
  );
};

export default MenuButton;
