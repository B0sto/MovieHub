const GenreBadge = ({
  genre,
  isDarkMode,
}: {
  genre: string;
  isDarkMode: boolean;
}) => (
  <span
    className={`text-sm px-4 py-2 rounded-full ${
      isDarkMode ? "text-white bg-[#221F3D]" : "text-black bg-gray-300"
    }`}
  >
    {genre}
  </span>
);

export default GenreBadge;
