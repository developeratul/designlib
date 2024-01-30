create policy "Enable read access for all users"
on "public"."categories"
as permissive
for select
to public
using (true);


create policy "Only admins can delete"
on "public"."categories"
as permissive
for delete
to public
using (((auth.jwt() ->> 'role'::text) = 'ADMIN'::text));


create policy "Only admins can edit"
on "public"."categories"
as permissive
for update
to public
using (((auth.jwt() ->> 'role'::text) = 'ADMIN'::text))
with check (((auth.jwt() ->> 'role'::text) = 'ADMIN'::text));


create policy "Only admins can insert"
on "public"."categories"
as permissive
for insert
to public
with check (((auth.jwt() ->> 'role'::text) = 'ADMIN'::text));


create policy "Enable insert for users based on user_id"
on "public"."resources"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Enable read access for all users"
on "public"."resources"
as permissive
for select
to public
using (true);


create policy "Only admin can delete"
on "public"."resources"
as permissive
for delete
to public
using (((auth.jwt() ->> 'role'::text) = 'ADMIN'::text));


create policy "Only admin can update"
on "public"."resources"
as permissive
for update
to public
using (((auth.jwt() ->> 'role'::text) = 'ADMIN'::text))
with check (((auth.jwt() ->> 'role'::text) = 'ADMIN'::text));


create policy "Enable delete for users based on id"
on "public"."users"
as permissive
for delete
to public
using ((auth.uid() = id));


create policy "Enable insert for authenticated users only"
on "public"."users"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."users"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on email"
on "public"."users"
as permissive
for update
to public
using (((auth.jwt() ->> 'email'::text) = email))
with check (((auth.jwt() ->> 'email'::text) = email));



