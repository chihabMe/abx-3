import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function PaginationComponent({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationComponentProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    // Add dots if there's a gap after first page
    if (start > 2) {
      pages.push("...");
    }

    // Add pages around current page
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add dots if there's a gap before last page
    if (end < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page (if not already included)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Page {currentPage} sur {totalPages}
      </div>

      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          asChild={currentPage > 1}
          disabled={currentPage <= 1}
        >
          {currentPage > 1 ? (
            <Link href={`${baseUrl}?page=${currentPage - 1}`}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Précédent
            </Link>
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Précédent
            </>
          )}
        </Button>

        {/* Page numbers */}
        <div className="hidden md:flex items-center space-x-1">
          {pageNumbers.map((pageNum, index) => (
            <div key={index}>
              {pageNum === "..." ? (
                <Button variant="ghost" size="sm" disabled>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  asChild={currentPage !== pageNum}
                  disabled={currentPage === pageNum}
                >
                  {currentPage === pageNum ? (
                    <span>{pageNum}</span>
                  ) : (
                    <Link href={`${baseUrl}?page=${pageNum}`}>
                      {pageNum}
                    </Link>
                  )}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          asChild={currentPage < totalPages}
          disabled={currentPage >= totalPages}
        >
          {currentPage < totalPages ? (
            <Link href={`${baseUrl}?page=${currentPage + 1}`}>
              Suivant
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          ) : (
            <>
              Suivant
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
