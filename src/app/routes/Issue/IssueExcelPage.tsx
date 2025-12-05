import FrappeGanttDemo from "../../../features/gantt/frappe-gant";

export default function IssueExcelPage() {
  return (
    <div className="p-6 space-y-10">

      {/* HEADER */}
      <div className="flex flex-col gap-1 animate-fade-up">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          📄 Excel İşlemleri
        </h1>
        <p className="text-gray-500 text-sm">
          Issue verilerini Excel üzerinden içeri aktarın veya dışa alın
        </p>
      </div>

      {/* MAIN CARD */}
      <div
        className="
          bg-white shadow-xl rounded-2xl p-8 border border-gray-100 
          hover:shadow-2xl transition-all duration-300 animate-fade-up
        "
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
          ⚙️ Excel Import / Export Paneli
        </h2>

        <div className="space-y-8">

          {/* IMPORT */}
          <div
            className="
              border border-gray-200 rounded-xl p-6 
              hover:shadow-lg hover:border-blue-300 
              transition-all duration-300
            "
          >
            <p className="mb-3 text-lg font-medium text-gray-800 flex items-center gap-2">
              ⬆️ Excel Import
            </p>

            <label
              className="
                flex flex-col items-center justify-center w-full p-6 
                border-2 border-dashed border-gray-300 rounded-xl 
                cursor-pointer hover:bg-gray-50 transition
              "
            >
              <input type="file" accept=".xlsx, .xls" className="hidden" />
              <span className="text-gray-600 text-sm">
                Excel dosyasını yükleyin veya buraya sürükleyin
              </span>
            </label>
          </div>

          {/* EXPORT */}
          <div
            className="
              border border-gray-200 rounded-xl p-6 
              hover:shadow-lg hover:border-green-300 
              transition-all duration-300
            "
          >
            <p className="mb-3 text-lg font-medium text-gray-800 flex items-center gap-2">
              ⬇️ Excel Export
            </p>

            <button
              className="
                px-5 py-3 bg-green-600 text-white rounded-xl font-medium
                shadow hover:bg-green-700 hover:shadow-lg
                transition-all duration-300
              "
            >
              Excel Olarak Dışa Aktar
            </button>
          </div>

          {/* EXTRA TOOLS */}
          <div
            className="
              border border-gray-200 rounded-xl p-6 
              hover:shadow-lg hover:border-indigo-300 
              transition-all duration-300 space-y-4
            "
          >
            <p className="text-lg font-medium text-gray-800 flex items-center gap-2">
              🛠️ Ek Ayarlar
            </p>

            <button
              className="
                px-4 py-2 bg-blue-600 text-white rounded-lg 
                shadow hover:bg-blue-700 hover:shadow-lg
                transition-all duration-300
              "
            >
              Şablon Excel Dosyası İndir
            </button>

            <button
              className="
                px-4 py-2 bg-gray-700 text-white rounded-lg
                shadow hover:bg-gray-800 hover:shadow-lg
                transition-all duration-300
              "
            >
              Örnek Veri Çıktısı Al
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
