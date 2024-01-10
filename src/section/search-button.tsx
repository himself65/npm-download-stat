import { useFormStatus } from "react-dom";
import { PiSpinnerGapBold } from "react-icons/pi";

export default function SearchButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex items-center gap-2 bg-gray-800 text-white p-2 rounded-lg mt-2"
      type="submit"
      disabled={pending}
    >
      {pending && <PiSpinnerGapBold className="animate-spin" />}
      Search
    </button>
  );
}
