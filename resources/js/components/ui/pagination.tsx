import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Link } from "@inertiajs/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  links?: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  onPageChange?: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  links,
  onPageChange,
}: PaginationProps) {
  // Si les liens Laravel sont fournis, utiliser ceux-ci
  if (links && links.length > 0) {
    return (
      <div className="flex items-center justify-center space-x-1">
        {links.map((link, i) => {
          // Ignorer les liens "..." générés par Laravel
          if (link.label.includes("...")) {
            return (
              <Button
                key={`ellipsis-${i}`}
                variant="ghost"
                size="icon"
                disabled
                className="h-8 w-8"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            );
          }

          // Gérer les boutons précédent/suivant
          if (link.label === "&laquo; Previous") {
            return (
              <Button
                key="previous"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={!link.url}
                asChild={link.url ? true : false}
              >
                {link.url ? (
                  <Link href={link.url} preserveState>
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            );
          }

          if (link.label === "Next &raquo;") {
            return (
              <Button
                key="next"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={!link.url}
                asChild={link.url ? true : false}
              >
                {link.url ? (
                  <Link href={link.url} preserveState>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            );
          }

          // Pages numériques
          return (
            <Button
              key={link.label}
              variant={link.active ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              asChild={!link.active && link.url ? true : false}
            >
              {!link.active && link.url ? (
                <Link href={link.url} preserveState>
                  {link.label}
                </Link>
              ) : (
                link.label
              )}
            </Button>
          );
        })}
      </div>
    );
  }

  // Fallback pour une pagination simple si les liens Laravel ne sont pas fournis
  return (
    <div className="flex items-center justify-center space-x-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange?.(page)}
        >
          {page}
        </Button>
      ))}
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
} 