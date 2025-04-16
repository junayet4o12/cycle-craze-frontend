import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { useMyDataQuery } from "@/redux/features/user/userApi";
import EditProfileForm from "@/components/profile/edit-profile-form";

export default function Profile() {
  const { data, isLoading, isError } = useMyDataQuery(undefined);
  const userData = data?.data

  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto ">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Failed to load profile data. Please try again later.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </CardFooter>
      </Card>
    );
  }

  if (!userData) {
    return null;
  }






  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1"
          >
            <Edit size={16} />
            Edit Profile
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <EditProfileForm setIsEditing={setIsEditing} userData={userData} />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage className="object-cover" src={userData.profile || "/default-user.png"} alt={userData.name} />
                <AvatarFallback>{userData?.name?.substring(0, 2)?.toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="text-2xl font-semibold">{userData.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="capitalize">{userData.role}</Badge>
                  <span className="text-sm text-muted-foreground">{userData.email}</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Contact Number</span>
                    <p>{userData.contactNumber || "Not provided"}</p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Address</span>
                    <p>{userData.address || "Not provided"}</p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Account Status</span>
                    <p>
                      {userData.isBlock ? (
                        <Badge variant="destructive">Blocked</Badge>
                      ) : (
                        <Badge variant="default" className="bg-green-500">Active</Badge>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>


    </Card>
  );
}