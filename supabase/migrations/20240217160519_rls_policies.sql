drop policy "Only admins can delete" on "public"."categories";

drop policy "Only admins can edit" on "public"."categories";

drop policy "Only admins can insert" on "public"."categories";

drop policy "Only admin can delete" on "public"."resources";

drop policy "Only admin can update" on "public"."resources";

create policy "Only admins can delete"
on "public"."categories"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.id = auth.uid()) AND (u.role = 'ADMIN'::role)))));


create policy "Only admins can edit"
on "public"."categories"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.id = auth.uid()) AND (u.role = 'ADMIN'::role)))))
with check ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.id = auth.uid()) AND (u.role = 'ADMIN'::role)))));


create policy "Only admins can insert"
on "public"."categories"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.id = auth.uid()) AND (u.role = 'ADMIN'::role)))));


create policy "Only admin can delete"
on "public"."resources"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.id = auth.uid()) AND (u.role = 'ADMIN'::role)))));


create policy "Only admin can update"
on "public"."resources"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.id = auth.uid()) AND (u.role = 'ADMIN'::role)))))
with check ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.id = auth.uid()) AND (u.role = 'ADMIN'::role)))));



