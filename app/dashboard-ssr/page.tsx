import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";

// Type definitions for our data
interface DashboardData {
  id: number;
  title: string;
  value: number;
  lastUpdated: string;
}

// Mock API function to simulate data fetching
async function fetchDashboardData(): Promise<DashboardData[]> {
  // In a real app, this would be an API call
  return [
    { id: 1, title: "Users", value: 1250, lastUpdated: "2025-08-20" },
    { id: 2, title: "Revenue", value: 45200, lastUpdated: "2025-08-20" },
    { id: 3, title: "Orders", value: 320, lastUpdated: "2025-08-20" },
    { id: 4, title: "Active Sessions", value: 85, lastUpdated: "2025-08-20" },
  ];
}

// Server-side props
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchDashboardData();
  return {
    props: {
      initialData: data,
    },
  };
};

// Component
export default function Dashboard({
  initialData,
}: {
  initialData: DashboardData[];
}) {
  const [data, setData] = useState<DashboardData[]>(initialData);

  // Client-side data refresh (optional)
  useEffect(() => {
    const interval = setInterval(async () => {
      const newData = await fetchDashboardData();
      setData(newData);
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Home
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Key Metrics
              </h2>
            </div>
            <div className="border-t border-gray-200">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-sm font-medium text-gray-500">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Last updated: {item.lastUpdated}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
