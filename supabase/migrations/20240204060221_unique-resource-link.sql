CREATE UNIQUE INDEX resources_link_key ON public.resources USING btree (link);

alter table "public"."resources" add constraint "resources_link_key" UNIQUE using index "resources_link_key";


