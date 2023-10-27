import gql from "graphql-tag"

export const GET_HEADER_TOP = gql`
  query headerTop {
    cmsBlocks(identifiers: "hnak-top-header") {
      items {
        identifier
        title
        content
      }
    }
  }
`

export const GET_NAVIGATION = gql`
  query getHeaderData(
    $mobileMenuBlock: String!
    $mobileMenuBottomCMSBlock: String!
  ) {
    navMenu: getPrimaryMegaMenu {
      menu {
        menu_id
        menu_name
        menu_type
        menu_items {
          item_id
          item_name
          item_type
          object_id
          item_link
          is_landing_page
          item_columns {
            showtitle
            type
            value
          }
          category_columns {
            showtitle
            type
            value
          }
          childrens {
            item_id
            item_name
            item_type
            object_id
            item_link
            is_landing_page
            childrens {
              item_id
              item_name
              item_type
              object_id
              item_link
              is_landing_page
            }
          }
        }
      }
    }
    mobileMenuCMSBlock: cmsBlocks(
      identifiers: [$mobileMenuBlock, $mobileMenuBottomCMSBlock]
    ) {
      items {
        identifier
        title
        content
      }
    }
  }
`

export const GET_ALL_CATEGORY = gql`
  query {
    allCategories: categories(currentPage: 1, pageSize: 20) {
      page_info {
        current_page
        page_size
        total_pages
      }
      items {
        id
        uid
        name
        image
        include_in_menu
        description
        cms_block {
          content
          title
          identifier
        }
        url_key
        url_path
        children {
          id
          uid
          name
          image
          is_landing_page
          include_in_menu
          description
          cms_block {
            content
            title
            identifier
          }
          url_key
          url_path
          children {
            id
            uid
            name
            image
            is_landing_page
            include_in_menu
            description
            cms_block {
              content
              title
              identifier
            }
            url_key
            url_path
            children {
              id
              uid
              name
              image
              is_landing_page
              include_in_menu
              cms_block {
                content
                title
                identifier
              }
              url_key
              url_path
            }
          }
        }
      }
    }
  }
`
