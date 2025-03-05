import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

function Subscribers() {
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
              <BreadcrumbPage>Users</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center">
          <Button type="submit" className="flex items-center gap-2">
            <Filter className="w-2 h-2" /> Filter
          </Button>
        </div>
      </div>

      <em>
        list out users who read your book , add filter functionality. May be
        send a cutome message to the user if needed{" "}
      </em>
    </div>
  );
}

export default Subscribers;
