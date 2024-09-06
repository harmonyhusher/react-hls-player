export const getTime = ({
  rect,
  event,
  duration,
}: {
  rect: DOMRect;
  event: React.PointerEvent | PointerEvent;
  duration: number;
}) => {
  const x = event.clientX - rect.left;
  const timestamp = (x / rect.width) * duration;

  return timestamp;
};
