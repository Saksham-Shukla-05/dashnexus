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
  DialogTrigger,
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

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CirclePlus, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";

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

  const handleOpen = (bookId: string, isOpen: boolean) => {
    setOpenStates((prev) => ({ ...prev, [bookId]: isOpen }));
  };

  const handleDropdown = (bookId: string, isOpen: boolean) => {
    setDropdownStates((prev) => ({ ...prev, [bookId]: isOpen }));
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      toast.success("Book deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      toast.error("Failed to delete book");
      console.error(error);
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    staleTime: 10000, // in Milli-seconds
  });

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
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead className="hidden md:table-cell">
                  Author name
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((book: Book) => {
                return (
                  <TableRow key={book._id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt={book.title}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={book.coverImage}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {book.author?.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formattedDate(book.createdAt)}
                    </TableCell>
                    <TableCell>
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
                            {" "}
                            Actions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="mt-2 outline-none">
                            <Link to={`/dashboard/books/${book._id}`}>
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
                        onOpenChange={(isOpen) => handleOpen(book._id, isOpen)}
                      >
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-center">
                              Are you sure you want to{" "}
                              <strong className="text-red-700">Delete</strong>{" "}
                              this book?
                            </DialogTitle>
                            <DialogDescription className="text-center  flex justify-center gap-4">
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
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-center w-full text-muted-foreground">
            {data?.data.length > 0 ? (
              <>
                Showing <strong>1</strong> of{" "}
                <strong>{data?.data.length}</strong> products
              </>
            ) : (
              "You have no books"
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default BooksPage;
