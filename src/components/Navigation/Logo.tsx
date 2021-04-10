import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <div className="absolute left-0 sm:flex justify-center items-center w-1/12 h-10 rounded-lg text-autumnT-500 hover:bg-autumnT-500 hover:text-autumnT-100 bg-autumnT-400 hidden">
      <Link href="/">
        <a> HOME </a>
      </Link>
    </div>
  );
};

export default Logo;
