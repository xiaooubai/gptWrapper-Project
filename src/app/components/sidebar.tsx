// components/Sidebar.jsx

const events = [
  { name: 'June 2024 Retreat', icon: '🌟' },
  { name: 'Christmas Party', icon: '🎄' },
  { name: 'Leadss Offsite', icon: '🗺️' },
  // ... any other events
];

// components/Sidebar.jsx
export const Sidebar = () => {
  return (
    <aside className='w-64 h-screen bg-gray-800 p-4 space-y-6 text-white fixed inset-y-0 left-0'>
      <div className='text-2xl font-bold'>Events</div>
      <button className='text-blue-400 hover:text-blue-300'>+ New Event</button>
      <ul className='space-y-4'>
        {events.map((event) => (
          <li key={event.name} className='flex items-center space-x-3'>
            <span className='text-lg'>{event.icon}</span>
            <span className='font-medium text-base'>{event.name}</span>
          </li>
        ))}
      </ul>
      <div className='mt-auto border-t border-gray-700 pt-4'>
        <ul className='space-y-4'>
          <li className='font-medium text-base'>Billing</li>
          <li className='font-medium text-base'>Settings</li>
        </ul>
      </div>
    </aside>
  );
};
