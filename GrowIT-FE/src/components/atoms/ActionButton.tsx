type ActionButtonProps = {
  name: string
  actionImage: string
  onClick: () => void
};

// 액션 버튼
function ActionButton({ name, actionImage, onClick }: ActionButtonProps) {
  return (
    <div
      className="w-[25%] min-w-[100px] max-w-[400px] h-auto cursor-pointer mx-8 group"
      onClick={onClick}
    >
      {/* 해당 액션 버튼 명칭 표시 */}
      <p
        className="
        pt-1
        bg-zinc-500/70
        rounded-t-3xl
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

      {/* 액션 버튼 테두리 */}
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

        {/* 액션 버튼 이미지 */}
        <img src={ actionImage } alt={`${name} 버튼`} className="w-full h-full rounded-b-3xl object-contain" />
      </div>
    </div>
  );
};

export default ActionButton