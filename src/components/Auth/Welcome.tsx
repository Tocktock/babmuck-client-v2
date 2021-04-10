import Image from "next/image";

interface Props {}

const Welcome: React.FC<Props> = (props) => {
  return (
    <div className="relative">
      <Image
        src="/imgs/welcomeCat.png"
        alt="welcome cat"
        width={260}
        height={390}
      ></Image>
    </div>
  );
};

export default Welcome;
