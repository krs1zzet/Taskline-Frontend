type Props = { onMenu: () => void };

export default function Header({ onMenu }: Props) {
  return (
    <header className="h-14 border-b bg-white flex items-center gap-2 px-4">
      <button className="lg:hidden px-3 py-2 rounded hover:bg-gray-100" onClick={onMenu}>
        Menü
      </button>
      <div className="font-semibold">Taskline</div>
      <div className="ml-auto text-sm text-gray-500">...</div>
    </header>
  );
}
