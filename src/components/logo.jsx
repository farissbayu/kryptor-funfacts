export const Logo = ({ size = "lg" }) => {
  const fontSize =
    size === "sm"
      ? "text-2xl"
      : size === "md"
      ? "text-3xl"
      : size === "lg"
      ? "text-5xl"
      : "";

  return (
    <div className="flex justify-center">
      <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
          clipRule="evenodd"
          d="M16 4L10 12H14V18L20 10H16V4Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M22 12L16 20H20V26L26 18H22V12Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
      <h3
        className={`${fontSize} font-bold bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 inline-block text-transparent bg-clip-text`}
      >
        .FunFact
      </h3>
    </div>
  );
};
