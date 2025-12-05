import Projects from "../../features/jira/projects/components/Projects";

export default function MainPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Your Projects & Issues
      </h1>

      <Projects />
    </div>
  );
}
