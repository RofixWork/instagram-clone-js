import BarLoader from "react-spinners/BarLoader";

const Loading = () => {
  return (
    <div className="flex justify-center py-6">
      <BarLoader width={200} height={5} />
    </div>
  );
};

export default Loading;
