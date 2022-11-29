type Props = {
  className?: string;
  children: React.ReactNode;
};
const Card = ({ className, children }: Props) => {
  return (
    <div className={`h-full w-[600px] bg-white ${className}`}>{children}</div>
  );
};

export default Card;
