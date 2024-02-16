alter table "public"."bookmarks" drop constraint "bookmarks_resourceId_fkey";

alter table "public"."bookmarks" drop constraint "bookmarks_resourceId_key";

drop index if exists "public"."bookmarks_resourceId_key";

create policy "Enable delete for users based on user_id"
on "public"."bookmarks"
as permissive
for delete
to public
using ((auth.uid() = "userId"));


create policy "Enable read access based on userId"
on "public"."bookmarks"
as permissive
for select
to public
using ((auth.uid() = "userId"));


create policy "Enabled update access based on userId"
on "public"."bookmarks"
as permissive
for update
to public
using ((auth.uid() = "userId"))
with check ((auth.uid() = "userId"));



