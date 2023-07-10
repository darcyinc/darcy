interface DividerProps {
  text?: string;
}

export default function Divider({ text }: DividerProps) {
  const addMargin = Boolean(text);

  return (
    <span className="flex w-full select-none items-center px-0.5 text-center">
      <div className="h-px flex-grow bg-grayBorder content-['']" />
      {addMargin && <span className="mx-2">{text}</span>}
      <div className="h-px flex-grow bg-grayBorder content-['']" />
    </span>
  );
}
