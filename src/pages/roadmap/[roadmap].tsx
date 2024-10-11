import React from "react";

import { FocusBoundary, Layout, Link } from "@components";
import { getAnchor } from "@utils/anchor";
import {
  loadAllMd,
  loadMdBySlug,
  loadRoadmap,
  MdPage,
  processMd,
} from "@helpers/retrieveMdPages";
import { pick } from "@helpers/object";

export default function RoadmapPage({
  html,
  title,
  description,
  headings,
  sidebar,
}: Awaited<ReturnType<typeof getStaticProps>>["props"]) {
  return (
    <Layout
      title={title}
      sidebar={sidebar}
      as={undefined}
      description={description}
    >
      {(setSidebar: any) => (
        <>
          <h1>{title}</h1>
          {sidebar ? (
            <FocusBoundary
              onChange={setSidebar}
              onEnter={undefined}
              onExit={undefined}
            >
              <nav>
                <ol>
                  {headings
                    .filter((heading) => heading.depth < 3)
                    .map(({ value, depth }) => (
                      <li key={value}>
                        <p style={{ paddingLeft: `${depth - 1}rem` }}>
                          <Link
                            href={getAnchor(value)}
                            onClick={() => {
                              setSidebar(false);
                              const heading = document.getElementById(
                                getAnchor(value).replace("#", ""),
                              );
                              heading?.querySelector("a")?.focus();
                            }}
                          >
                            {value}
                          </Link>
                        </p>
                      </li>
                    ))}
                </ol>
              </nav>
            </FocusBoundary>
          ) : null}
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </>
      )}
    </Layout>
  );
}

export const getStaticProps = async ({
  params,
}: {
  params: { ["roadmap"]: string };
}) => {
  const doc = await loadRoadmap<any>("roadmaps", params["roadmap"]);
  const { html, headings } = processMd(doc.content);

  return {
    props: {
      ...pick(["title", "sidebar", "description"], doc),
      headings,
      html,
    },
  };
};

export const getStaticPaths = async () => {};
