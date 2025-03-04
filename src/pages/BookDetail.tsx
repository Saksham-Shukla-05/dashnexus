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
import { getSingleBook } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

function BookDetail() {
  const { bookId } = useParams();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["books", bookId],
    queryFn: () => getSingleBook(bookId),
    staleTime: 10000, // in Milli-seconds
  });

  return (
    <div>
      <div className="flex items-center  justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-4">
          <Button type="submit">
            <span className="ml-2">Promote this book</span>
          </Button>
        </div>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>
            Manage your books and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

// how to utilize this page
// 1. Display Related Books
// 2. Enable Book Reviews & Ratings
// 3. Implement Bookmarking or Favorite System

export default BookDetail;
