import gql from "graphql-tag"

export const GET_FOOTER_DATA = gql`
  query getFooterData {
    footer: cmsBlocks(
      identifiers: [
        "hnak-footer-block-1"
        "hnak-footer-block-2"
        "hnak-footer-block-3"
        "hnak-footer-block-4"
        "hnak-footer-block-5"
        "hnak-footer-block-6"
      ]
    ) {
      items {
        identifier
        title
        content
      }
    }
  }
`
