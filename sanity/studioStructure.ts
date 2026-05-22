import type { StructureResolver } from "sanity/structure";

export const studioStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Upcoming Webinar")
        .id("upcomingWebinar")
        .child(
          S.document()
            .schemaType("upcomingWebinar")
            .documentId("upcomingWebinar")
        ),
      S.documentTypeListItem("pastWebinar").title("Past Webinars"),
      S.divider(),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
    ]);
