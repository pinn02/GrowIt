import CloseButton from "../atoms/Button";
import { useEffect, useState } from "react";
import randomEventsData from "../../assets/data/randomEvents.json";
import { useGameDataStore } from "../../stores/gameDataStore";
import treasureBoxImage from "../../assets/images/treasure_box.png"; 

// 긍정 이벤트의 방울 효과
const fireworksConfig = [
  { left: '20%', color: '#f1c40f', delay: '0s' }, 
  { left: '50%', color: '#3498db', delay: '0.3s' }, 
  { left: '80%', color: '#2ecc71', delay: '0.6s' }, 
  { left: '35%', color: '#e74c3c', delay: '0.9s' }, 
  { left: '65%', color: '#9b59b6', delay: '1.2s' }, 
  { left: '10%', color: '#ffa500', delay: '1.5s' }, 
  { left: '90%', color: '#00ffff', delay: '1.8s' }, 
];

type RandomEvent = {
  title: string;
  content: string;
  finance: number;
  enterpriseValue: number;
  productivity: number;
  image: string;
};

type RandomEventModalProps = {
  onClose: () => void;
};

function RandomEventModal({ onClose }: RandomEventModalProps) {
  const [eventIndex, setEventIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [eventResultType, setEventResultType] = useState<
    "positive" | "negative"
  >("positive");

  const gameDataStore = useGameDataStore();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * randomEventsData.length);
      setEventIndex(randomIdx);
      setIsLoading(false);

      const event = randomEventsData[randomIdx];
      if (event.finance >= 0) {
        setEventResultType("positive");
      } else {
        setEventResultType("negative");
      }

      setTimeout(() => setShowContent(true), 300);
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  const event: RandomEvent | undefined =
    eventIndex !== -1 ? randomEventsData[eventIndex] : undefined;

  const effectApply = () => {
    if (event) {
      gameDataStore.setEnterpriseValue(
        gameDataStore.enterpriseValue + event.enterpriseValue
      );
      gameDataStore.setProductivity(
        gameDataStore.productivity + event.productivity
      );
      gameDataStore.setFinance(gameDataStore.finance + event.finance);
    }
    onClose();
  };

  const borderColorClass = isLoading
    ? "border-purple-500"
    : eventResultType === "positive"
    ? "border-green-500"
    : "border-red-600";
  const backgroundClass = isLoading
    ? "bg-gradient-to-br from-gray-800 to-purple-800" 
    : eventResultType === "positive"
    ? "bg-gradient-to-br from-blue-200 to-green-200"
    : "bg-gradient-to-br from-red-400 to-gray-700";
  
  const titleColorClass =
    eventResultType === "positive" ? "text-gray-800" : "text-black";

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70">
        <div
          className={`
            ${backgroundClass}
            rounded-2xl
            p-6
            border-4 ${borderColorClass}
            shadow-2xl
            w-[60%] h-auto max-w-lg
            relative
            ${isLoading ? "animate-modal-flash" : "animate-bounceIn"}
            overflow-hidden
            pixelated-effect
          `}
        >
          {eventResultType === "negative" && !isLoading && (
            <>
              <div className="thunder-overlay"></div>
              <div className="rain-overlay"></div>
            </>
          )}

          {eventResultType === "positive" && !isLoading && (
            <>
              {fireworksConfig.map((config, index) => (
                <div
                  key={index}
                  className="fireworks-overlay"
                  style={{
                    '--left-pos': config.left,
                    '--fireworks-color': config.color,
                    '--delay': config.delay
                  } as React.CSSProperties}
                ></div>
              ))}
            </>
          )}
          
          {eventResultType === "positive" && !isLoading && <div className="crowd-cheer-overlay"></div>}

          <div className="w-full flex justify-end absolute top-2 right-2 z-10">
            {!isLoading &&
              <CloseButton
              onClick={effectApply}
              className="bg-red-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md hover:bg-red-600 transition-colors transform hover:scale-110"
            >
              X
            </CloseButton>
            }
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <img
                src={treasureBoxImage}
                alt="Treasure Box"
                className="w-24 h-24 animate-shake pixelated-effect"
              />
              <p className="mt-4 text-xl font-semibold text-gray-400 animate-pulse">
                두구두구...
              </p>
            </div>
          ) : (
            event && (
              <div
                className={`mt-8 relative z-10 ${
                  showContent ? "animate-slideInUp" : "opacity-0"
                }`}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="mx-auto w-[70%] h-auto object-contain rounded-lg border-2 border-gray-300 shadow-md animate-popIn pixelated-effect"
                />
                <div className="text-center mt-6 p-3 bg-white bg-opacity-80 rounded-lg mx-auto w-[90%] shadow-inner">
                  <p
                    className={`font-bold text-3xl mb-2 animate-typewriter ${titleColorClass}`}
                  >
                    {event.title}
                  </p>
                  <p className="text-gray-800 text-lg">{event.content}</p>
                  <br />
                  <p
                    className={`text-lg font-semibold animate-slideInUp ${
                      event.finance >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    자본:{" "}
                    {event.finance >= 0
                      ? `+${event.finance.toLocaleString()}`
                      : event.finance.toLocaleString()}
                  </p>
                  <p
                    className={`text-lg font-semibold animate-slideInUp ${
                      event.enterpriseValue >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    기업 가치:{" "}
                    {event.enterpriseValue >= 0
                      ? `+${event.enterpriseValue.toLocaleString()}`
                      : event.enterpriseValue.toLocaleString()}
                  </p>
                  <p
                    className={`text-lg font-semibold animate-slideInUp ${
                      event.productivity >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    생산성:{" "}
                    {event.productivity >= 0
                      ? `+${event.productivity.toLocaleString()}`
                      : event.productivity.toLocaleString()}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default RandomEventModal;