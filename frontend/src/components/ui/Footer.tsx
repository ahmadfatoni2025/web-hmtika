export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-zinc-500">
        <p className="font-medium text-zinc-700 dark:text-zinc-300">
          HMTIKA STIMIK Tunas Bangsa
        </p>
        <p className="mt-1">Himpunan Mahasiswa Teknik Informatika</p>
        <p className="mt-4 text-xs">&copy; {new Date().getFullYear()} HMTIKA. All rights reserved.</p>
      </div>
    </footer>
  )
}
