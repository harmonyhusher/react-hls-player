export const Seek = ({ next }: { next?: boolean }) => {
  return next ? (
    <svg
      className="icon icon-tabler icons-tabler-outline icon-tabler-rewind-forward-10"
      fill="none"
      height={24}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M17 9l3 -3l-3 -3" />
      <path d="M8 17.918a5.997 5.997 0 0 1 -5 -5.918a6 6 0 0 1 6 -6h11" />
      <path d="M12 14v6" />
      <path d="M15 15.5v3a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0 -3 0z" />
    </svg>
  ) : (
    <svg
      className="icon icon-tabler icons-tabler-outline icon-tabler-rewind-backward-10"
      fill="none"
      height={24}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M7 9l-3 -3l3 -3" />
      <path d="M15.997 17.918a6.002 6.002 0 0 0 -.997 -11.918h-11" />
      <path d="M6 14v6" />
      <path d="M9 15.5v3a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0 -3 0z" />
    </svg>
  );
};
