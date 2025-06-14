const DetailRow = ({
  label,
  children,
  isDarkMode,
}: {
  label: string;
  children: React.ReactNode;
  isDarkMode: boolean;
}) => (
  <div className="grid sm:grid-cols-[150px_1fr] gap-4 items-start">
    <p className={`text-lg ${isDarkMode ? "text-light-200" : "text-gray-700"}`}>
      {label}
    </p>
    <div className={isDarkMode ? "text-white" : "text-black"}>{children}</div>
  </div>
);

export default DetailRow;
