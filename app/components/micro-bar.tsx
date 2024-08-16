import clsx from 'clsx';
import {ReactNode} from 'react';

const variants = {
  visible: {
    // opacity: 1,
    height: 'auto',
  },
  hidden: {
    // opacity: 0,
    height: 0,
  },
};

export function MicroBar({
  children,
  fullWidth,
}: {
  children: ReactNode;
  fullWidth?: boolean;
}) {
  // const {scrollY} = useScroll();

  // const [shouldShow, setShow] = useState(true);

  // useMotionValueEvent(scrollY, 'change', (latest) => {
  //   if (latest > 80) {
  //     if (shouldShow) {
  //       setShow(false);
  //     }
  //   } else {
  //     if (!shouldShow) {
  //       setShow(true);
  //     }
  //   }
  // });

  return (
    <div className="bg-slate-950 px-6 md:px-0 overflow-hidden">
      <div
        className={clsx([
          fullWidth && 'container mx-auto',
          'py-2 flex justify-between gap-3 items-center transition-all ease-in-out text-white',
        ])}
      >
        {children}
      </div>
    </div>
  );
}
