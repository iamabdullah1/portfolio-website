import React from "react";
import { myProjects } from "../constants";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  return (
    <section className="c-space my-20" id="projects">
      <div className="w-full">
        <h2 className="text-heading text-white">My Selected Projects</h2>
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">
          {myProjects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              title={project.title}
              description={project.description}
              subDescription={project.subDescription}
              href={project.href}
              image={project.image}
              tags={project.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;