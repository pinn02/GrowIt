import Button from '../atoms/Button'

export default function SearchBar() {
  return (
    <div className="flex gap-2">
      <input className="border rounded px-2" placeholder="검색..." />
      <Button>검색</Button>
    </div>
  )
}
