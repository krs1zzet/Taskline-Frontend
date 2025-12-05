export default function IssueDashboardPage() {
  return (
    <div className="p-6 space-y-10">

      {/* Header */}
      <div className="flex flex-col gap-1 animate-fade-up">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          📊 Issue Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Projenize ait önemli metrikler ve güncel durumlar
        </p>
      </div>

      {/* --- 1) PROGRESS (Full width) --- */}
      <section className="p-6 bg-white shadow-lg border border-gray-100 rounded-2xl hover:shadow-xl transition-all">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-blue-600">📈</span>
          Anlık Proje Yüzdelik Durumu
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="bg-green-500 h-4 rounded-full" style={{ width: "62%" }} />
        </div>

        <p className="mt-3 text-gray-600 text-sm">
          Demo: <span className="font-semibold">%62 tamamlandı</span>
        </p>
      </section>

      {/* --- 2) First row (2 columns) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* OVERDUE TASKS */}
        <section className="p-6 bg-white shadow-lg border border-red-100 rounded-2xl hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-red-600">⏰</span>
            Geciken Görevler
          </h2>

          <ul className="space-y-3">
            <li className="p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100">
              TASK-123 – API Integration
            </li>
            <li className="p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100">
              TASK-212 – UI Revamp
            </li>
          </ul>
        </section>

        {/* RECENT STATUS CHANGES */}
        <section className="p-6 bg-white shadow-lg border border-blue-100 rounded-2xl hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-blue-600">🔄</span>
            Son Statü Güncellemeleri
          </h2>

          <ul className="space-y-3">
            <li className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              TASK-301 → <span className="font-semibold text-blue-700">In Progress</span>
            </li>
            <li className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              TASK-044 → <span className="font-semibold text-blue-700">Done</span>
            </li>
          </ul>
        </section>

      </div>

      {/* --- 3) Second row (2 columns) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* WEEKLY STATUS */}
        <section className="p-6 bg-white shadow-lg border border-gray-100 rounded-2xl hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-indigo-600">📅</span>
            Bu Hafta Statü Değişimleri
          </h2>
          <p className="text-gray-600 text-sm">Demo içerik – Jira’dan çekilecek</p>
        </section>

        {/* CHANGELOG */}
        <section className="p-6 bg-white shadow-lg border border-gray-100 rounded-2xl hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-600">📝</span>
            Changelog Değişimleri
          </h2>
          <p className="text-gray-600 text-sm">Demo içerik – Jira changelog API</p>
        </section>

      </div>

      {/* --- 4) Third row (2 columns: start + end tasks) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* TODAY START */}
        <section className="p-6 bg-white shadow-lg border border-yellow-100 rounded-2xl hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-yellow-500">🚀</span>
            Bugün Başlaması Gereken Görevler
          </h2>
          <ul className="space-y-3">
            <li className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              TASK-512 – Backend Cleanup
            </li>
          </ul>
        </section>

        {/* TODAY END */}
        <section className="p-6 bg-white shadow-lg border border-orange-100 rounded-2xl hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-orange-500">🏁</span>
            Bugün Bitmesi Gereken Görevler
          </h2>
          <ul className="space-y-3">
            <li className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              TASK-778 – UI Test Automation
            </li>
          </ul>
        </section>

      </div>

      {/* --- 5) Fourth row (full width) --- */}
      <section className="p-6 bg-white shadow-lg border border-green-100 rounded-2xl hover:shadow-xl transition">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-green-600">⚙️</span>
          Anlık Geliştirilen Görevler
        </h2>

        <ul className="space-y-3">
          <li className="p-3 bg-green-50 border border-green-200 rounded-lg">
            TASK-990 – Payment Refactor
          </li>
          <li className="p-3 bg-green-50 border border-green-200 rounded-lg">
            TASK-455 – Docker Optimization
          </li>
        </ul>
      </section>
    </div>
  );
}
