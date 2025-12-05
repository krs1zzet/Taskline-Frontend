export default function IssueDashboardPage() {
    return (
      <div className="p-6 space-y-8">
        
        {/* Başlık */}
        <h1 className="text-3xl font-bold text-gray-800">Issue Dashboard</h1>
  
        {/* ANLIK PROJE YÜZDELİK DURUMU */}
        <section className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Anlık Proje Yüzdelik Durumu</h2>
  
          {/* Yüzdelik Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: "62%" }} />
          </div>
  
          <p className="mt-2 text-sm text-gray-600">
            Demo: %62 tamamlandı (Ağırlıklı status hesaplaması)
          </p>
        </section>
  
        {/* GECİKEN GÖREVLER */}
        <section className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Geciken Görevler</h2>
  
          <ul className="space-y-2">
            <li className="p-3 bg-red-50 border border-red-200 rounded hover:bg-red-100 cursor-pointer">
              <a href="#" className="text-red-700 font-medium">
                TASK-123 – API Integration (Planned end: 2025-01-28)
              </a>
            </li>
  
            <li className="p-3 bg-red-50 border border-red-200 rounded hover:bg-red-100 cursor-pointer">
              <a href="#" className="text-red-700 font-medium">
                TASK-212 – UI Revamp (Planned end: 2025-01-28)
              </a>
            </li>
          </ul>
        </section>
  
        {/* SON STATU GÜNCELLEMELERI */}
        <section className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Son Statü Güncellemeleri</h2>
  
          <ul className="space-y-2">
            <li className="p-3 bg-blue-50 border border-blue-200 rounded">
              <span className="font-medium">TASK-301</span> → <span className="text-blue-700">In Progress</span>
            </li>
  
            <li className="p-3 bg-blue-50 border border-blue-200 rounded">
              <span className="font-medium">TASK-044</span> → <span className="text-blue-700">Done</span>
            </li>
          </ul>
        </section>
  
        {/* HAFTALIK STATÜ DEĞİŞİMLERİ */}
        <section className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Bu Hafta Gerçekleşen Statü Değişimleri</h2>
          <p className="text-gray-600 text-sm">Demo içerik – Jira’dan çekilecek</p>
        </section>
  
        {/* CHANGELOG DEĞİŞİMLERİ */}
        <section className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Bu Hafta Gerçekleşen Changelog Değişimleri</h2>
          <p className="text-gray-600 text-sm">Demo içerik – Jira changelog API’dan çekilecek</p>
        </section>
  
        {/* BUGÜN BAŞLAMASI GEREKEN TASKLAR */}
        <section className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Bugün Başlaması Gereken Görevler</h2>
  
          <ul className="space-y-2">
            <li className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              TASK-512 – Backend Cleanup
            </li>
          </ul>
        </section>
  
        {/* BUGÜN BİTMESİ GEREKEN TASKLAR */}
        <section className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Bugün Bitmesi Gereken Görevler</h2>
  
          <ul className="space-y-2">
            <li className="p-3 bg-orange-50 border border-orange-200 rounded">
              TASK-778 – UI Test Automation
            </li>
          </ul>
        </section>
  
        {/* ANLIK GELİŞTİRİLEN TASKLAR */}
        <section className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Anlık Geliştirilen Görevler</h2>
  
          <ul className="space-y-2">
            <li className="p-3 bg-green-50 border border-green-200 rounded">
              TASK-990 – Payment Refactor (In Progress)
            </li>
  
            <li className="p-3 bg-green-50 border border-green-200 rounded">
              TASK-455 – Docker Optimization (In Progress)
            </li>
          </ul>
        </section>
  
      </div>
    );
  }
  