create policy "allow all 1qa5lwm_0" on "storage"."objects" as permissive for
select to public using ((bucket_id = 'resource-thumbnails'::text));
create policy "allow all 1qa5lwm_1" on "storage"."objects" as permissive for
insert to public with check ((bucket_id = 'resource-thumbnails'::text));
create policy "allow all 1qa5lwm_2" on "storage"."objects" as permissive for
update to public using ((bucket_id = 'resource-thumbnails'::text));
create policy "allow all 1qa5lwm_3" on "storage"."objects" as permissive for delete to public using ((bucket_id = 'resource-thumbnails'::text));
INSERT INTO storage.buckets (id, name, public, created_at)
VALUES (
    'resource-thumbnails',
    'resource-thumbnails',
    TRUE,
    NOW()
  )
