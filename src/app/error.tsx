"use client";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-gray-500">Package not found</p>
    </div>
  );
}
