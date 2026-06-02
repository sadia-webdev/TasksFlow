export default function TaskSkeleton() {
  return (
    <ul className='gap-4 grid grid-cols-4'>
      {Array.from({ length: 8 }).map((_, i) => (
        <li
          key={i}
          className='border border-gray-300 p-4 rounded-lg shadow-md animate-pulse'
        >
          <div className='flex justify-between items-start'>
            <div className='space-y-3 w-full'>
              {/* title */}
              <div className='h-4 bg-gray-300 rounded w-3/4' />
              {/* description */}
              <div className='h-3 bg-gray-300 rounded w-full' />
              <div className='h-3 bg-gray-300 rounded w-2/3' />
              {/* due date */}
              <div className='h-3 bg-gray-300 rounded w-1/3' />
              
            </div>
            {/* menu icon */}
            <div className='h-5 w-5 bg-gray-300 rounded ml-2 shrink-0' />
          </div>
        </li>
      ))}
    </ul>
  );
}