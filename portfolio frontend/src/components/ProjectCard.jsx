import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const ProjectCard = ({
  title,
  description,
  subDescription,
  href,
  images,
  tags,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Create a catchy short description (first 120 characters)
  const catchyDescription = description.length > 120 
    ? description.substring(0, 120) + "..." 
    : description;

  // Check if href is a GitHub link
  const isGitHubLink = href && (href.includes('github.com') || href.includes('githubusercontent.com'));

  return (
    <>
      <div className="relative border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 hover:-translate-y-1 duration-200 transition-transform">
        <img src={images && images.length > 0 ? images[0] : ""} alt={title} className="w-full h-48 object-cover rounded-t-2xl" />
        <div className="p-5">
          <h5 className="mb-2 text-xl font-bold text-white">{title}</h5>
          
          {/* Catchy short description */}
          <p className="mb-3 font-normal text-neutral-400 text-sm leading-relaxed">
            {catchyDescription}
          </p>
          
          {/* Technology tags as text */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 text-xs bg-white/10 text-neutral-300 rounded-full border border-white/20"
              >
                {tag.name}
              </span>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowDetails(true)}
              className="inline-flex items-center gap-1 px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-300 border border-white/20"
            >
              View More
              <img src="/assets/arrow-right.svg" className="size-4" />
            </button>
            
            {href && (
              <a 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation text-sm"
              >
                {isGitHubLink ? 'View Code' : 'Visit Website'}
                <img src="/assets/arrow-up.svg" className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {showDetails && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          images={images}
          tags={tags}
          href={href}
          closeModal={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default ProjectCard;
