import type { ButtonHTMLAttributes } from 'react'

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-3 py-2 rounded-md border hover:bg-gray-50 transition"
      {...props}
    />
  )
}
