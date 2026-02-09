export const getLayoutsSEO = `query layoutsSEO {
  layoutsSEO(first: 100) {
    seo {
      id
      title
      description
      keywords
    }
    name
    id
  }
}`;

export const getFirmData = `query firmData {
  firmsData {
    address
    bdo
    city
    email
    id
    name
    nip
    phone
    postalCode
    regon
    web
    workingHours {
      id
      day
      openingHour
      closingHour
      closed
    }
  }
}`;

export const getHeaderContent = `query headerContent {
  staticPages(first: 100) {
    id
    menuLink {
      display
      id
      menu
      positionInMenu
      slug
      visibleInMenu
    }
  }
  firmsData {
    email
    phone
  }
}`;

export const getStaticPagesContent = slug => `query staticPagesContent {
  staticPages(where: {menuLink: {slug: ${slug === '/' ? null : `"${slug}"`}}}) {
    ctaButtons {
      id
      text
      url
    }
    header {
      id
      picture {
        fileName
        handle
        height
        mimeType
        id
        size
        url
        width
      }
      texts {
        subtitle
        id
        text {
          html
          markdown
          raw
          text
        }
      }
      slogans
      verticalPosition
      ctaButtons {
        url
        text
        id
      }
    }
    id
    markdownTexts {
      markdownText
      id
    }
    seo {
      title
      keywords
      id
      description
    }
    texts {
      id
      subtitle
      text {
        html
        markdown
        raw
        text
      }
    }
    title
    subtitle
    bgPictures {
      id
      picture {
        fileName
        id
        height
        handle
        mimeType
        size
        url
        width
      }
      verticalPosition
    }
    cardsWithIcon {
      fontAwesomeIconName
      id
      subtitle
      texts {
        subtitle
        text {
          html
          markdown
          raw
          text
        }
      }
    }
    cardsWithPic {
      id
      subtitle
      texts {
        subtitle
        text {
          html
          markdown
          raw
          text
        }
        id
      }
      picture {
        fileName
        handle
        height
        id
        mimeType
        size
        width
        url
      }
    }
    menuLink {
      display
      id
      menu
      positionInMenu
      slug
      visibleInMenu
    }
  }
}`;

export const getPriceList = `query getPrices {
  currentPriceLists(first: 100) {
    priceList(first: 300) {
      id
      name
      price
    }
  }
}`;

export const getPagesContent = `query getPagesContent {
  pages(first: 100) {
    header {
      id
      picture {
        fileName
        handle
        height
        mimeType
        id
        size
        url
        width
      }
      texts {
        subtitle
        id
        text {
          html
          markdown
          raw
          text
        }
      }
      slogans
      verticalPosition
      ctaButtons {
        url
        text
        id
      }
    }
    id
    markdownTexts {
      markdownText
      id
    }
    seo {
      title
      keywords
      id
      description
    }
    texts {
      id
      subtitle
      text {
        html
        markdown
        raw
        text
      }
    }
    title
    subtitle
    bgPictures {
      id
      picture {
        fileName
        id
        height
        handle
        mimeType
        size
        url
        width
      }
      verticalPosition
    }
    menuLink {
      display
      id
      menu
      positionInMenu
      slug
      visibleInMenu
    }
  }
}`;

export const getDynamicPagesContent = slug => `query dynamicPagesContent {
  pages(where: {menuLink: {slug: ${slug === '/' ? null : `"${slug}"`}}}) {
    header {
      id
      picture {
        fileName
        handle
        height
        mimeType
        id
        size
        url
        width
      }
      texts {
        subtitle
        id
        text {
          html
          markdown
          raw
          text
        }
      }
      slogans
      verticalPosition
      ctaButtons {
        url
        text
        id
      }
    }
    id
    markdownTexts {
      markdownText
      id
    }
    seo {
      title
      keywords
      id
      description
    }
    texts {
      id
      subtitle
      text {
        html
        markdown
        raw
        text
      }
    }
    title
    subtitle
    bgPictures {
      id
      picture {
        fileName
        id
        height
        handle
        mimeType
        size
        url
        width
      }
      verticalPosition
    }
    menuLink {
      display
      id
      menu
      positionInMenu
      slug
      visibleInMenu
    }
  }
}`;
