import { useJiraLink } from "../../features/hooks/useJira";

export default function DashboardPage() {
  const { data: links, isLoading, error } = useJiraLink();

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <p>Loading links...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8 text-red-600">
        Failed to load links
      </div>
    );
  }

  if (!links || links.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <p>No templates found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <div
            key={link.id}
            className="border rounded-lg shadow p-6 bg-white hover:shadow-lg transition cursor-pointer group relative"
          >
            <h2 className="text-xl font-bold mb-2">{link.name}</h2>
            <p className="text-gray-600 pr-10">
              Inward: {link.inward} <br />
              Outward: {link.outward}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
