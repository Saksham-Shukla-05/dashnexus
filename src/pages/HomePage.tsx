import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Activity,
  ArrowUpRight,
  CreditCard,
  IndianRupee,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // 2 sec delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 md:gap-6">
            <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                  {isLoading ? (
                    <>
                      <Skeleton className="h-8 w-32 mb-2" />
                      <Skeleton className="h-4 w-40" />
                    </>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">₹45,231.89</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscriptions
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <>
                      <Skeleton className="h-8 w-32 mb-2" />
                      <Skeleton className="h-4 w-40" />
                    </>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">+2350</div>
                      <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {" "}
                  {isLoading ? (
                    <>
                      <Skeleton className="h-8 w-32 mb-2" />
                      <Skeleton className="h-4 w-40" />
                    </>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">+12,234</div>
                      <p className="text-xs text-muted-foreground">
                        +19% from last month
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <>
                      <Skeleton className="h-8 w-32 mb-2" />
                      <Skeleton className="h-4 w-40" />
                    </>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">+573</div>
                      <p className="text-xs text-muted-foreground">
                        +201 since last hour
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-3 lg:grid-cols-2  xl:grid-cols-3">
              <Card
                className="xl:col-span-3 md:col-span-3"
                x-chunk="dashboard-01-chunk-5"
              >
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                  {isLoading ? (
                    <div className="flex items-center gap-4">
                      {/* Avatar Skeleton */}
                      <Skeleton className="hidden h-9 w-9 sm:flex rounded-full" />

                      {/* Text Skeleton */}
                      <div className="grid gap-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-40" />
                      </div>

                      {/* Amount Skeleton */}
                      <Skeleton className="ml-auto h-4 w-20" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          Olivia Martin
                        </p>
                        <p className="text-sm text-muted-foreground">
                          olivia.martin@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+ ₹1,999.00</div>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/02.png" alt="Avatar" />
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Jackson Lee
                      </p>
                      <p className="text-sm text-muted-foreground">
                        jackson.lee@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+ ₹39.00</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/03.png" alt="Avatar" />
                      <AvatarFallback>IN</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Isabella Nguyen
                      </p>
                      <p className="text-sm text-muted-foreground">
                        isabella.nguyen@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+ ₹299.00</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/04.png" alt="Avatar" />
                      <AvatarFallback>WK</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        William Kim
                      </p>
                      <p className="text-sm text-muted-foreground">
                        will@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+ ₹99.00</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/05.png" alt="Avatar" />
                      <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Sofia Davis
                      </p>
                      <p className="text-sm text-muted-foreground">
                        sofia.davis@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+ ₹39.00</div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="xl:col-span-3 md:col-span-3"
                x-chunk="dashboard-01-chunk-4"
              >
                <CardHeader className="flex  flex-col items-center">
                  <div className="flex flex-row w-full justify-between gap-3">
                    <CardTitle>Transactions</CardTitle>
                    <Button
                      variant={"outline"}
                      size="sm"
                      className="mt-auto gap-1 px-4"
                    >
                      <Link to="#">View All</Link>
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    Recent transactions from your store.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden xl:table-cell">
                          Type
                        </TableHead>
                        <TableHead className="hidden xl:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="hidden xl:table-cell">
                          Date
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        {isLoading ? (
                          <>
                            <TableCell>
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-40 mt-1" />
                            </TableCell>
                            <TableCell className="hidden xl:table-cell">
                              <Skeleton className="h-4 w-20" />
                            </TableCell>
                            <TableCell className="hidden xl:table-cell">
                              <Skeleton className="h-4 w-20" />
                            </TableCell>
                            <TableCell className="hidden md:hidden lg:hidden xl:table-cell">
                              <Skeleton className="h-4 w-20" />
                            </TableCell>
                            <TableCell className="text-right">
                              <Skeleton className="h-4 w-20" />
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>
                              <div className="font-medium">Liam Johnson</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden xl:table-cell">
                              Sale
                            </TableCell>
                            <TableCell className="hidden xl:table-cell">
                              <Badge className="text-xs" variant="outline">
                                Approved
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:hidden lg:hidden xl:table-cell">
                              2023-06-23
                            </TableCell>
                            <TableCell className="text-right">
                              $250.00
                            </TableCell>
                          </>
                        )}
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Olivia Smith</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            olivia@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          Refund
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <Badge className="text-xs" variant="outline">
                            Declined
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:hidden lg:hidden xl:table-cell">
                          2023-06-24
                        </TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Noah Williams</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            noah@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          Subscription
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <Badge className="text-xs" variant="outline">
                            Approved
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:hidden lg:hidden xl:table-cell">
                          2023-06-25
                        </TableCell>
                        <TableCell className="text-right">$350.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Emma Brown</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            emma@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <Badge className="text-xs" variant="outline">
                            Approved
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:hidden lg:hidden xl:table-cell">
                          2023-06-26
                        </TableCell>
                        <TableCell className="text-right">$450.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Liam Johnson</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <Badge className="text-xs" variant="outline">
                            Approved
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:hidden lg:hidden xl:table-cell">
                          2023-06-27
                        </TableCell>
                        <TableCell className="text-right">$550.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </main>
    </>
  );
}

export default HomePage;
