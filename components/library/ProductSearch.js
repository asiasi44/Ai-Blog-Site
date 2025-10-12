import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Search, Loader2 } from "lucide-react";

export const ProductSearch = ({
  searchQuery,
  setSearchQuery,
  searchDataIsLoading,
}) => {
  const [inputValue, setInputValue] = React.useState(searchQuery);

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    setSearchQuery(inputValue.trim());
  };

  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="Enter search keyword (e.g., laptop)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1"
      />
      <Button onClick={handleSearch} disabled={searchDataIsLoading}>
        {searchDataIsLoading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Search className="w-4 h-4 mr-2" />
        )}
        Search
      </Button>
    </div>
  );
};
