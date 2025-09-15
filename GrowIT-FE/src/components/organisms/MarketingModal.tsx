import { useState } from "react";
import CloseButton from "../atoms/Button";
import marketingModalBackgroundImage from "../../assets/background_images/board_page_background_image2.png";
import MarketingCard from "../molecules/MarketingCard";

import newspaperImage from "../../assets/icons/newspaper.png";
import snsImage from "../../assets/icons/sns.png";
import tvImage from "../../assets/icons/tv.png";

const marketings = [
  { name: "신문", effect: "Small", cost: 10000, image: newspaperImage },
  { name: "SNS", effect: "Middle", cost: 100000, image: snsImage },
  { name: "TV", effect: "Big", cost: 1000000, image: tvImage },
];

type MarketingModalProps = {
  onClose: () => void;
};

function MarketingModal({ onClose }: MarketingModalProps) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none" onClick={onClose}>
        <div
          className="w-11/12 md:w-8/12 max-w-5xl relative rounded-xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundImage: `url(${marketingModalBackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "6rem 2rem 2rem 2rem",
          }}
        >
          <CloseButton
            className="absolute top-12 right-15 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:text-gray-900 transition-colors"
            onClick={onClose}
          >
            X
          </CloseButton>

          <h2 className="absolute top-14 left-1/2 -translate-x-1/2 text-center text-4xl font-extrabold text-white drop-shadow-lg">
            마케팅
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-4">
            {marketings.map((marketing, idx) => (
              <MarketingCard key={idx} marketing={marketing} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketingModal;