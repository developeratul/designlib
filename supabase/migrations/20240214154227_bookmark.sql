create table "public"."bookmarks" (
    "created_at" timestamp with time zone not null default now(),
    "userId" uuid not null,
    "resourceId" bigint not null
);
alter table "public"."bookmarks" enable row level security;
CREATE UNIQUE INDEX bookmarks_pkey ON public.bookmarks USING btree ("userId", "resourceId");
CREATE UNIQUE INDEX "bookmarks_resourceId_key" ON public.bookmarks USING btree ("resourceId");
alter table "public"."bookmarks"
add constraint "bookmarks_pkey" PRIMARY KEY using index "bookmarks_pkey";
alter table "public"."bookmarks"
add constraint "bookmarks_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES resources(id) ON DELETE CASCADE not valid;
alter table "public"."bookmarks" validate constraint "bookmarks_resourceId_fkey";
alter table "public"."bookmarks"
add constraint "bookmarks_resourceId_key" UNIQUE using index "bookmarks_resourceId_key";
alter table "public"."bookmarks"
add constraint "bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE not valid;
alter table "public"."bookmarks" validate constraint "bookmarks_userId_fkey";
grant delete on table "public"."bookmarks" to "anon";
grant insert on table "public"."bookmarks" to "anon";
grant references on table "public"."bookmarks" to "anon";
grant select on table "public"."bookmarks" to "anon";
grant trigger on table "public"."bookmarks" to "anon";
grant truncate on table "public"."bookmarks" to "anon";
grant update on table "public"."bookmarks" to "anon";
grant delete on table "public"."bookmarks" to "authenticated";
grant insert on table "public"."bookmarks" to "authenticated";
grant references on table "public"."bookmarks" to "authenticated";
grant select on table "public"."bookmarks" to "authenticated";
grant trigger on table "public"."bookmarks" to "authenticated";
grant truncate on table "public"."bookmarks" to "authenticated";
grant update on table "public"."bookmarks" to "authenticated";
grant delete on table "public"."bookmarks" to "service_role";
grant insert on table "public"."bookmarks" to "service_role";
grant references on table "public"."bookmarks" to "service_role";
grant select on table "public"."bookmarks" to "service_role";
grant trigger on table "public"."bookmarks" to "service_role";
grant truncate on table "public"."bookmarks" to "service_role";
grant update on table "public"."bookmarks" to "service_role";
create policy "Enable insert for users based on userId" on "public"."bookmarks" as permissive for
insert to authenticated with check (auth.uid() = "userId");
