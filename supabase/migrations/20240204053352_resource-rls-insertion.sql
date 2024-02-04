drop policy "Enable insert for users based on user_id" on "public"."resources";

create policy "Enable insert access to everyone"
on "public"."resources"
as permissive
for insert
to public
with check (true);



