import FrappeGanttDemo from "../../../features/gantt/frappe-gant";

export default function IssueExcelPage() {
  return (
    <div className="p-6 space-y-6">

      {/* Başlık */}
      <h1 className="text-2xl font-bold text-gray-800">Excel İşlemleri</h1>

      {/* Excel Import/Export Panel */}
      <div className="bg-white shadow p-6 rounded-lg space-y-6">

        <h2 className="text-lg font-semibold">Excel Import / Export</h2>

        {/* Import Bölümü */}
        <div className="border border-gray-200 p-4 rounded-lg">
          <p className="mb-2 text-gray-700 font-medium">Excel Import</p>

          <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="file" accept=".xlsx, .xls" className="hidden" />
            <span className="text-gray-600">Excel dosyası yükle (drag & drop desteklenebilir)</span>
          </label>
        </div>

        {/* Export Bölümü */}
        <div className="border border-gray-200 p-4 rounded-lg">
          <p className="mb-2 text-gray-700 font-medium">Excel Export</p>

          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Excel Olarak Dışa Aktar
          </button>
        </div>

        {/* Opsiyonel Ayarlar */}
        <div className="border border-gray-200 p-4 rounded-lg space-y-2">
          <p className="text-gray-700 font-medium">Ek Ayarlar</p>
          
          <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Şablon Excel Dosyası İndir
          </button>

          <button className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
            Örnek Veri Çıktısı Al
          </button>
        </div>

      </div>

      

    </div>
  );
}
