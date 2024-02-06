"use client";
import { Resource } from "@/types";
import ResourceCard from "./Card";

export default function ResourcesGrid(props: { resources: Resource[] }) {
  const { resources } = props;
  return (
    <div className="grid grid-cols-4 gap-4">
      {resources.map((resource) => (
        <ResourceCard resource={resource} key={resource.id} />
      ))}
    </div>
  );
}
