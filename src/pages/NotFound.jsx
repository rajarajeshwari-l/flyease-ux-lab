import { Link } from "react-router-dom";
import { PlaneTakeoff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="section flex flex-col items-center justify-center py-24 text-center">
      <PlaneTakeoff className="h-10 w-10 text-neutral-300" />
      <h1 className="mt-4 text-2xl font-bold text-navy-900">Page not found</h1>
      <p className="mt-2 text-neutral-500">This route doesn't exist. Let's get you back on course.</p>
      <Link to="/" className="btn-accent mt-6">Back to Home</Link>
    </div>
  );
}
