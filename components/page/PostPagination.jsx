import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination"

export default function PostPagination() {
  return (
    <Pagination className="border-t border-gray-300 pt-2 mt-10">
      <PaginationContent>
        <PaginationPrevious href="#" />
        <PaginationLink href="#" isActive>1</PaginationLink>
        <PaginationLink href="#">2</PaginationLink>
        <PaginationLink href="#">3</PaginationLink>
        <PaginationEllipsis />
        <PaginationNext href="#" />
      </PaginationContent>
    </Pagination>
  )
}
