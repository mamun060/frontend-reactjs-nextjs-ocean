import SearchAutocomplete from "@/components/ui/search/SearchAutocomplete";
import SearchBar from "@/components/ui/search/SearchBar";
import { Search } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <SearchBar /> */}
      <SearchAutocomplete />
    </div>
  );
}
