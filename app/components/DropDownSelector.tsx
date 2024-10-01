import {ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import ChevronIcon from './icons/ChevronIcon';
import MoveRight from './icons/MoveRight';

interface IProps {
  value: string | null;
  children: ReactNode | ReactNode[];
  isOpen: boolean;
  step: number;
  title: string;
  placeHolder?: string;
  onChange: () => void;
}

export default function DropDownSelector({
  value,
  children,
  isOpen,
  onChange,
  step,
  title,
  placeHolder
}: IProps) {
  
  return (
    <div className='relative' >
      <div className='flex gap-2 font-bold text-md font-titles'>
        <span className="flex gap-2 text-primary-600">
          Step {step} <MoveRight />
        </span>
        <span>{title}</span>
      </div>
      <div className="mt-4">
        <div
          className="flex justify-between items-center border-2 border-[#3D404233] rounded-lg py-4 px-4"
          onClick={onChange}
        >
          <div className={`text-lg ${!value ? 'text-gray-500 italic' : ''}`}>{value ? value : placeHolder} </div>
          <ChevronIcon className={isOpen ? 'rotate-180' : ''} />
        </div>
        {isOpen && (
          <div
            className="absolute mt-2 z-50 w-full bg-white rounded-lg shadow dark:bg-gray-700"
          >
            <div className="max-h-80 overflow-y-auto">
              <ul className="flex flex-col bg-zinc-900  text-white [&>*]:px-5 [&>*]:py-2.5">{children}</ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
