interface Cms {
  id: string;
  title: string;
  publishedAt: string;
  hero: {
    type: string;
    richText: [
      {
        children: [
          {
            text: string;
          },
        ];
      },
    ];
    links: [];
    media: {
      id: string;
      alt: string;
      filename: string;
      mimeType: string;
      filesize: number;
      width: number;
      height: number;
      createdAt: string;
      updatedAt: string;
      url: string;
    };
  };
  slug: string;
  meta: {
    title: string;
    description: string;
    image: {
      id: string;
      alt: string;
      filename: string;
      mimeType: string;
      filesize: number;
      width: number;
      height: number;
      createdAt: string;
      updatedAt: string;
      url: string;
    };
  };
  _status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CmsWithColumns extends Cms {
  layout: [
    {
      columns: {
        size: string;
        richText: [
          {
            children: [
              {
                text: string;
              },
            ];
            type?: string;
          },
        ];
        link: {
          type: string;
          appearance: string;
        };
        id: string;
      }[];
      id: string;
      blockName: string;
      blockType: string;
    },
  ];
}

export interface CmsWithRichTextAndColumns extends Cms {
  layout: [
    {
      richText: [
        {
          children: [
            {
              text: string;
            },
          ];
        },
      ];
      links: [];
      id: string;
      blockName: string;
      blockType: string;
    },
    {
      columns: {
        size: string;
        richText: [
          {
            children: [
              {
                text: string;
              },
            ];
            type?: string;
          },
        ];
        link: {
          type: string;
          appearance: string;
        };
        id: string;
      }[];
      id: string;
      blockName: string;
      blockType: string;
    },
  ];
}

export interface Listing {
  _id: string;
  active: boolean;
  address: string;
  address_formatted: string;
  animal: boolean;
  area: number;
  balcony: boolean;
  city: string;
  city_formatted: string;
  crawledAt: string;
  description: string | null;
  elevator: boolean;
  email: string | null;
  expiredAt: string | null;
  furnished: boolean;
  images: string[];
  lat: number;
  likes: string[];
  lng: number;
  origin: string;
  parking: boolean;
  price: number;
  refId: string;
  room: number;
  type: string;
  type_formatted: string;
  url: string;
  zip: string;
}
