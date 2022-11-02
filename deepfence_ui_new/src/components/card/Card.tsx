type CardType = {
  children: React.ReactNode;
  className?: string;
};
export const Card = (props: CardType) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.08)] ${props.className} dark:bg-gray-800`}
    >
      {props.children}
    </div>
  );
};
