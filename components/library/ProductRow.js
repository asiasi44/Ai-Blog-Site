import { TableRow, TableCell } from "../ui/Tables";
import Checkbox from "../ui/Checkbox";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import {
  Download,
  Loader2,
  CheckCircle,
  Star,
  MessageSquare,
  BarChart3,
  Trash,
} from "lucide-react";
import { useAddProduct, useDeleteProduct } from "@/lib/hooks/useProducts";
import { useRunAnalysis } from "@/lib/hooks/useAnalysis";
import { toast } from "react-toastify";

export function ProductRow({ product, isProductScraped, setCurrentAsin }) {
  const addProductMutation = useAddProduct();
  const runAnalysisMutation = useRunAnalysis();
  const { mutate: deleteProduct, isLoading: isDeleteProductLoading } =
    useDeleteProduct();

  const handleScrapeProduct = (asin) => {
    addProductMutation.mutate(asin, {
      onSuccess: () => toast.success("Product added successfully"),
      onError: (error) => toast.error(error.message || "Adding product failed"),
    });
  };

  const handleAnalyze = (asin) => {
    runAnalysisMutation.mutate(asin, {
      onSuccess: () => toast.success("Analysis completed successfully"),
      onError: (error) => toast.error(error.message || "Analysis failed"),
    });
  };

  const handleDelete = (asin) => {
    if (confirm(`Are you sure you want to delete this product? ${asin}`)) {
      deleteProduct(asin);
    }
  };

  console.log(product.is_analyzed);
  
  return (
    <TableRow key={product.asin}>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className="font-mono text-sm">{product.asin}</TableCell>
      <TableCell className="max-w-xs truncate">
        <span
          title={product.title !== "N/A" ? product.title : ""}
          className={`px-2 py-1 rounded-md ${
            product.title !== "N/A"
              ? "bg-green-100 text-green-700 font-semibold"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {product.title}
        </span>
      </TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>
        {product.rating !== "N/A" ? (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {product.rating}
          </div>
        ) : (
          "N/A"
        )}
      </TableCell>
      <TableCell>{product.review_count}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          {!isProductScraped(product.asin) ? (
            <Button
              size="sm"
              onClick={() => handleScrapeProduct(product.asin)}
              disabled={addProductMutation.isPending}
            >
              {addProductMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              ) : (
                <Download className="w-4 h-4 mr-1" />
              )}
              Scrape Info
            </Button>
          ) : (
            <>
              <Badge variant="secondary">
                <CheckCircle className="w-3 h-3 mr-1" />
                Scraped
              </Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentAsin(product.asin)}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                View Reviews
              </Button>
              {product.is_analyzed ? (
                <Badge variant="success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Analyzed
                </Badge>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleAnalyze(product.asin)}
                  disabled={runAnalysisMutation.isPending}
                >
                  {runAnalysisMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : (
                    <BarChart3 className="w-4 h-4 mr-1" />
                  )}
                  Analyze
                </Button>
              )}
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(product.asin)}
                disabled={isDeleteProductLoading}
              >
                {isDeleteProductLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                ) : (
                  <Trash className="w-4 h-4 mr-1" />
                )}
                Delete
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
