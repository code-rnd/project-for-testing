import {
  CSSProperties,
  MouseEvent,
  TouchEvent,
  useCallback,
  useState,
} from "react";

const initialState = {
  coords: { x: 150, y: 150 },
  isHorisontalOnly: false,
};

interface UseTouchProps {
  coords: {
    x: number;
    y: number;
  };

  /** Смещение только по горизонтали */
  isHorisontalOnly: boolean;

  /** Свайпы */
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}
export const useTouch = (props: UseTouchProps = initialState) => {
  const { coords, isHorisontalOnly, onSwipeLeft, onSwipeRight } = props;

  const [start, setStart] = useState({ x: 0, y: 0 });
  const [move, setMove] = useState(coords);
  const [isMove, setIsMove] = useState(false);

  const [style, setStyle] = useState<CSSProperties>({});

  const handleStart = useCallback(
    (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      /** Координаты касания относительно всего дисплея */
      const touchX =
        (e as MouseEvent).pageX || (e as TouchEvent).touches[0].pageX;
      const touchY =
        (e as MouseEvent).pageY || (e as TouchEvent).touches[0].pageY;

      /** Координаты касания относительно нажатого елемента */
      const touchElX = (e as any).nativeEvent.layerX;
      const touchElY = (e as any).nativeEvent.layerY;

      /** TODO: Анимация движения */
      setStyle({ transition: "left 0s" });

      if (isHorisontalOnly) {
        setStart({ x: touchElX, y: touchY - touchElY });
      } else {
        setStart({ x: touchElX, y: touchElY });
      }
      setIsMove(true);
    },
    [isHorisontalOnly, move.x, coords.x]
  );

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      if (isMove) {
        /** Координаты касания относительно всего дисплея */
        const touchX =
          (e as MouseEvent)?.pageX || (e as TouchEvent)?.touches?.[0]?.pageX;
        const touchY =
          (e as MouseEvent)?.pageY || (e as TouchEvent)?.touches?.[0]?.pageY;

        /** Дельта смещения нужна для корректного перемещения элемента,
         *  с касанием в любой его области */
        const deltaX = touchX - start.x;
        const deltaY = touchY - start.y;

        if (isHorisontalOnly) {
          setMove({ x: deltaX, y: start.y });
        } else {
          setMove({ x: deltaX, y: deltaY });
        }
      }
    },
    [isMove, start, isHorisontalOnly]
  );

  const handleEnd = useCallback(
    (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      if (isMove && (onSwipeLeft || onSwipeRight)) {
        const viewWidth = (e as any).view.innerWidth;
        const centerViewCoords = viewWidth / 2;
        const elCoords = e.currentTarget.offsetLeft - centerViewCoords;

        const currentElPercent = (elCoords * 100) / centerViewCoords;

        const isLeft = currentElPercent <= -75;
        const isRight = currentElPercent >= 75;

        if (onSwipeLeft && isLeft) {
          void onSwipeLeft();
          return;
        }

        if (onSwipeRight && isRight) {
          void onSwipeRight();
          return;
        }

        /** Если свайп был, но недостаточно сильный - возвращаю элемент обратно на место */
        setMove(coords);
      }

      /** TODO: Анимация движения */
      setStyle({ transition: "left .4s" });
      setIsMove(false);
    },
    [onSwipeLeft, onSwipeRight, start, isMove, coords]
  );

  return {
    useStart: handleStart,
    useMove: handleMove,
    useEnd: handleEnd,
    move,
    isMove,
    style,
  };
};
