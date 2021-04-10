interface Props {
  headText: string;
}

const HeadText: React.FC<Props> = (props) => {
  return (
    <div className="w-full text-7xl font-bold py-6">
      <h1 className="w-full md:w-2/3">{props.headText}</h1>
    </div>
  );
};

export default HeadText;
