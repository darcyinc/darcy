export default function Divider({ text }: { text: string }) {
  const addMargin = Boolean(text);

  return (
    <span className="flex w-full select-none items-center px-0.5">
      <div className="h-px flex-grow bg-grayBorder content-['']" />
      {addMargin && <span className="mx-2">{text}</span>}
      <div className="h-px flex-grow bg-grayBorder content-['']" />
    </span>
  );
}
