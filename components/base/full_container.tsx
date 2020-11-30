export const FullContainer: React.FC<{ title: string }> = ({
  children,
  title,
}) => (
  <div className="flex justify-center pt-32">
    <div className="flex flex-col items-center w-full bg-gray-900 rounded-lg xlg:w-1/2 lg:1/3 md:w-3/5">
      <h1 className="my-10 text-2xl font-bold text-white">{title}</h1>
      {children && children}
    </div>
  </div>
);
