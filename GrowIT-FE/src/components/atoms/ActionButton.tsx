type ActionButtonProps = {
  name: string
  actionImage: string
  onClick: () => void
};

function ActionButton({ name, actionImage, onClick }: ActionButtonProps) {
  return (
    <div
      className="w-[25%] min-w-[100px] max-w-[200px] h-auto cursor-pointer mx-8 group"
      onClick={onClick}
    >
      <p 
        className="bg-sky-400 text-white transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:brightness-75 filter"
      >
        { name }
      </p>
      <div className="w-full aspect-square">
        <img
          src={ actionImage }
          alt={`${name} 버튼`}
          className="w-full h-full rounded-3xl border-8 border-sky-400
            object-contain transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:brightness-75 filter"
        />
      </div>
    </div>
  );
};

export default ActionButton