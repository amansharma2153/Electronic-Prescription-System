import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">

        <Navbar />

        <div className="p-6 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
}