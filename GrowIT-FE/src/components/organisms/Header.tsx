import SearchBar from '../molecules/SearchBar'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-bold">GrowIT</h1>
      <SearchBar />
    </header>
  )
}
