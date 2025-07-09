"use client";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { deleteCourse as deleteCourseBackend } from "@/actions/lessons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function DropdownIcon({ courseId }: { courseId: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter()
  // Placeholder for delete logic
  const deleteCourse = () => {
    setConfirmOpen(false);
    deleteCourseBackend(courseId).then(res => {
        if(res.success) {
            toast("Successfully deleted, Redirecting to dashboard")
            router.push("/dashboard")
        } else {
            toast("An unknown error occured, please contact me@anayparaswani.dev")
        }
    })
  };

  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <button
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        onClick={() => setMenuOpen(v => !v)}
        aria-label="More options"
        type="button"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded shadow-lg z-10">
          <button
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 rounded"
            onClick={() => { setMenuOpen(false); setConfirmOpen(true); }}
          >
            Delete Course
          </button>
        </div>
      )}
      {/* Confirmation Dialog */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 max-w-sm w-full border border-gray-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold mb-2">Delete Course?</h3>
            <p className="mb-4">Are you sure you want to delete this course? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-200" onClick={() => setConfirmOpen(false)}>Cancel</button>
              <button className="px-4 py-2 rounded bg-red-600 text-white font-bold" onClick={deleteCourse}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 