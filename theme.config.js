const YEAR = new Date().getFullYear();

export default {
  footer: (
    <small style={{ display: "block", marginTop: "4rem" }}>
      <abbr title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.">
        CC BY-NC 4.0</abbr> <time>{YEAR}</time> © Harsha Lakamsani.
      <a href="/feed.xml">RSS</a>
      <style jsx>{`
        a {
          float: right;
        }
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: -2rem;
          }
        }
      `}</style>
    </small>
  ),
  unstable_faviconGlyph: "👋",
};
