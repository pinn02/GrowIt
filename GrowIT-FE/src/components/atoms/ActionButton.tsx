import { useState } from "react";
import { useGameDataStore } from "../../stores/gameDataStore";

type ActionButtonProps = {
  name: string
  actionImage: string
  onClick: () => void
};

// 액션 버튼
function ActionButton({ name, actionImage, onClick }: ActionButtonProps) {
  const isWIP = useGameDataStore(state => state.currentProject.turn)
  const disabled = isWIP > 0 && name === "프로젝트"
  
  const [showHelpModal, setShowHelpModal] = useState(false)

  return (
    <div
      className={`
        relative
        w-[25%] min-w-[100px] max-w-[400px] h-auto mx-8
        ${disabled ? "cursor-not-allowed" : "cursor-pointer group"}
      `}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={disabled ? () => setShowHelpModal(true) : undefined}
      onMouseLeave={disabled ? () => setShowHelpModal(false) : undefined}
    >
      <div className={`${disabled ? "opacity-50" : ""}`}>
        {/* 해당 액션 버튼 명칭 표시 */}
        <p
          className={`
          pt-1
          bg-zinc-500/70
          rounded-t-3xl
          text-white
          transition
          duration-300
          ease-in-out
          ${disabled ? "" : "group-hover:-translate-y-[8px] group-hover:brightness-75"}
          `}
        >
          { name }
        </p>

        {/* 액션 버튼 테두리 */}
        <div
          className={`
            w-full
            aspect-square
            border-8
            border-zinc-500/60
            bg-zinc-500/30
            rounded-b-3xl
            duration-300
            ease-in-out
            ${disabled ? "" : "group-hover:-translate-y-[8px] group-hover:brightness-75"}
          `}
        >

          {/* 액션 버튼 이미지 */}
          <img
            src={ actionImage }
            alt={`${name} 버튼`}
            className="w-full h-full rounded-b-3xl object-contain"
          />
        </div>
      </div>

      {disabled && showHelpModal && (
        <div 
          className="absolute top-0 left-full mt-10 ml-1 z-50"
        >
          <div className="bg-white rounded-lg p-2 w-50 shadow-lg border border-gray-300 opacity-100">
            <div className="flex justify-center items-center">
              <h3 className="text-lg font-bold text-black">프로젝트 진행 중</h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ActionButton