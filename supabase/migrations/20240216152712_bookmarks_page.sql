alter table "public"."bookmarks" drop constraint "bookmarks_userId_fkey";

alter table "public"."bookmarks" add constraint "bookmarks_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES resources(id) ON DELETE CASCADE not valid;

alter table "public"."bookmarks" validate constraint "bookmarks_resourceId_fkey";


