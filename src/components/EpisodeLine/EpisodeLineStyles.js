import styled from 'styled-components';
import { Item } from 'semantic-ui-react';

export const EpisodeListStyles = styled.div`

`;

export const ResponsiveItem = styled(Item)`
  .ui.items:not(.unstackable) > .item& {
    @media only screen and (max-width: 768px) {
      .ui.image {
        padding: 1em;

        img {
          max-height: 200px !important;
        }
      }
    }

    @media only screen and (min-width: 650px) {
      flex-direction: row;
    }
  }
`;
