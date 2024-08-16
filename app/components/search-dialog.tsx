import {AnimatePresence, motion} from 'framer-motion';
import {ReactNode} from 'react';
import {FaSearch} from 'react-icons/fa';

export function SearchDialog({
  show,
  setShow,
  children,
}: {
  show: boolean;
  setShow: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <>
      <button
        className="border border-slate-200 gap-3 rounded p-2 items-center grow hidden md:flex hover:bg-slate-50 transition-all ease-in-out text-slate-700"
        style={{maxWidth: 500}}
        onClick={() => {
          setShow(true);
        }}
      >
        <FaSearch /> Search...
      </button>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="fixed inset-0 bg-slate-900 bg-opacity-75  backdrop-blur transition-opacity"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
            />
            <motion.div
              initial={{y: 30, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              exit={{y: -30, opacity: 0}}
              transition={{duration: 0.2}}
              className="fixed inset-0 z-10 w-screen overflow-y-auto"
            >
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-2">
                  {children}
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                      onClick={(e) => {
                        setShow(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/*
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FaSearch />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        
                      </div>
                    </div>
                  </div>
                  */
