import StarIcon from "./StarIcon";

const ScoreBox = ({
  voteAverage,
  voteCount,
  isDarkMode,
}: {
  voteAverage: number;
  voteCount: number;
  isDarkMode: boolean;
}) => (
  <div
    className={`flex items-center gap-x-2 rounded-md px-4 py-2 h-fit w-fit self-start ${
      isDarkMode ? "bg-[#221F3D]" : "bg-gray-300"
    }`}
  >
    <StarIcon />
    <p className={`text-sm sm:text-base font-medium ${isDarkMode ? "text-white" : "text-black"}`}>
      {voteAverage.toFixed(1)}/10
      <span className={isDarkMode ? "text-[#A8B5DB]" : "text-gray-600"}> ({Math.floor(voteCount)}K)</span>
    </p>
  </div>
);

export default ScoreBox;
