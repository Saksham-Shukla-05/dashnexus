import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteBook, getBooks } from "@/http/api";
import { Book } from "@/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import useTokenStore from "@/store";

const formattedDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return formattedDate;
};

function BooksPage() {
  // add loading spinner and  error message
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});
  const [dropdownStates, setDropdownStates] = useState<{
    [key: string]: boolean;
  }>({});

  const { currentPage, setCurrentPage } = useTokenStore();
  const [limit, setLimit] = useState(5); // Default limit

  const handleOpen = (bookId: string, isOpen: boolean) => {
    setOpenStates((prev) => ({ ...prev, [bookId]: isOpen }));
  };

  const handleDropdown = (bookId: string, isOpen: boolean) => {
    setDropdownStates((prev) => ({ ...prev, [bookId]: isOpen }));
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: (response) => {
      toast.success(`${response.Book} deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (response) => {
      toast.error(response.message);
    },
  });

  const { data, isError, isFetching } = useQuery({
    queryKey: ["books", currentPage, limit],
    queryFn: () => getBooks(currentPage, limit),
    staleTime: 10000, // in Milli-seconds
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const handleLimitChange = (newLimit: number) => {
  //   setLimit(newLimit);
  // };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem />
            <BreadcrumbItem>
              <BreadcrumbPage>Books</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Link to={"/dashboard/books/create"}>
          <Button className="">
            Add Book <CirclePlus size={20} />
          </Button>
        </Link>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Books</CardTitle>
          <CardDescription>
            Manage your books and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="ml-3">Image</span>
                </TableHead>
                <TableHead className=" text-center ">Title</TableHead>
                <TableHead className=" text-center ">Genre</TableHead>

                <TableHead className="hidden text-center md:table-cell">
                  Created at
                </TableHead>
                <TableHead className=" text-center ">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching
                ? [...Array(data?.data.length)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-6 w-16" />
                      </TableCell>

                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-6 w-24" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-6 w-28" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16" />
                      </TableCell>
                    </TableRow>
                  ))
                : data?.data.book.map((book: Book) => (
                    <TableRow key={book._id}>
                      <TableCell className="hidden   sm:table-cell">
                        <img
                          alt={book.title}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={book.coverImage}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        <Link to={`/dashboard/books/${book._id}`}>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>{book.title}</TooltipTrigger>
                              <TooltipContent>
                                <p>View Book</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center">
                        {book.genre}
                      </TableCell>

                      <TableCell className=" text-center hidden md:table-cell">
                        {formattedDate(book.createdAt)}
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu
                          onOpenChange={(isOpen) =>
                            handleDropdown(book._id, isOpen)
                          }
                        >
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="outline"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="center" side="top">
                            <DropdownMenuItem className="outline-none">
                              Actions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="mt-2 outline-none">
                              <Link to={`/dashboard/books/edit/${book._id}`}>
                                {" "}
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="mt-2 outline-none"
                              onSelect={(e) => e.preventDefault()}
                              onClick={() => handleOpen(book._id, true)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog
                          open={openStates[book._id] || false}
                          onOpenChange={(isOpen) =>
                            handleOpen(book._id, isOpen)
                          }
                        >
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="text-center">
                                Are you sure you want to{" "}
                                <strong className="text-red-700">Delete</strong>{" "}
                                this book?
                              </DialogTitle>
                              <DialogDescription className="text-center flex justify-center gap-4">
                                <Button
                                  className="mt-4"
                                  size="sm"
                                  onClick={() => mutation.mutate(book._id)}
                                  disabled={mutation.isPending}
                                >
                                  {mutation.isPending ? "Deleting..." : "Yes"}
                                </Button>
                                <Button
                                  className="mt-4"
                                  size="sm"
                                  onClick={() => {
                                    handleOpen(book._id, false);
                                    handleDropdown(book._id, false);
                                  }}
                                >
                                  No
                                </Button>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          {!isFetching && (
            <div className="text-xs text-center w-full text-muted-foreground">
              {data?.data.book.length > 0 ? (
                <>
                  Showing{" "}
                  <strong>
                    {Math.min(currentPage * limit, data?.data.totalBooks)}
                  </strong>{" "}
                  of <strong>{data?.data.totalBooks}</strong> products
                </>
              ) : !isError ? (
                "You have no books"
              ) : (
                "Error while fetching data"
              )}
            </div>
          )}
        </CardFooter>
      </Card>
      {isFetching ? (
        ""
      ) : (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationPrevious
                className="cursor-pointer "
                onClick={() => handlePageChange(currentPage - 1)}
              ></PaginationPrevious>
            )}
            {[...Array(data?.data.totalPages)].map((_, index) => (
              <PaginationItem key={index} className="cursor-pointer ">
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < data?.data.totalPages && (
              <PaginationNext
                className="cursor-pointer "
                onClick={() => handlePageChange(currentPage + 1)}
              ></PaginationNext>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default BooksPage;
