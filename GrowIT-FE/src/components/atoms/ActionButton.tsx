type ActionButtonProps = {
  name: string
  actionImage: string
};

function ActionButton({ name, actionImage }: ActionButtonProps) {
  return (
    <div
      className="w-[25%] min-w-[100px] max-w-[200px] h-auto cursor-pointer mx-8 group"
      onClick={() => console.log(`${name} 버튼 클릭`)} // 버튼 클릭 확인용 익명 함수(해당 부분을 수정하여 버튼 클릭 동작)
    >
      <p
        className="
          bg-sky-400
          text-white
          transition
          duration-300
          ease-in-out
          group-hover:-translate-y-1
          group-hover:brightness-75
          filter
        "
      >
        { name }
      </p>
      <div className="w-full aspect-square">
        <img
          src={ actionImage }
          alt={`${name} 버튼`}
          className="
            w-full
            h-full
            rounded-3xl
            border-8
            border-sky-400
            object-contain
            transition
            duration-300
            ease-in-out
            group-hover:-translate-y-1
            group-hover:brightness-75
            filter
          "
        />
      </div>
    </div>
  );
};

export default ActionButton