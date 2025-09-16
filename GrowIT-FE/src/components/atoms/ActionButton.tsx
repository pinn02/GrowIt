type ActionButtonProps = {
  name: string
  actionImage: string
  onClick: () => void
};

function ActionButton({ name, actionImage, onClick }: ActionButtonProps) {
  return (
    <div
      className="w-[25%] min-w-[100px] max-w-[400px] h-auto cursor-pointer mx-8 group"
      onClick={onClick}
    >
      <p 
        className="
        bg-zinc-500/70
        rounded-t-3xl
        pt-1
        text-white
        transition
        duration-300
        ease-in-out
        group-hover:-translate-y-[8px]
        group-hover:brightness-75
        filter
        "
      >
        { name }
      </p>
      <div
        className="
          w-full
          aspect-square
          border-8
          border-zinc-500/60
          bg-zinc-500/30
          rounded-b-3xl
          group-hover:-translate-y-[8px]
          group-hover:brightness-75
          duration-300
          ease-in-out
        "
      >
        <img
          src={ actionImage }
          alt={`${name} 버튼`}
          className="w-full h-full rounded-b-3xl object-contain"
        />
      </div>
    </div>
  );
};

export default ActionButton